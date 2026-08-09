import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import md5 from 'md5';

// Lazy initialize db
let db = null;

export default async function handler(req, res) {
  // CPX sends a GET request for postbacks
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    if (!db) {
      if (!getApps().length) {
        // Strip out literal quotes if Vercel added them during paste, accounting for whitespace
        let pk = (process.env.FIREBASE_PRIVATE_KEY || '').trim();
        if (pk.startsWith('"') && pk.endsWith('"')) {
          pk = pk.substring(1, pk.length - 1);
        } else if (pk.startsWith("'") && pk.endsWith("'")) {
          pk = pk.substring(1, pk.length - 1);
        }
        
        // Sometimes Vercel parses \n literally, sometimes it doesn't. 
        // We ensure all literal \n are converted to real newlines.
        pk = pk.replace(/\\n/g, '\n');
        initializeApp({
          credential: cert({
            projectId: (process.env.FIREBASE_PROJECT_ID || '').trim(),
            clientEmail: (process.env.FIREBASE_CLIENT_EMAIL || '').trim(),
            privateKey: pk
          })
      }
      db = getFirestore();
    }

    const { 
      trans_id, 
      ext_user_id, 
      amount_local, 
      secure_hash 
    } = req.query;

    if (!trans_id || !ext_user_id || !amount_local || !secure_hash) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const hashSecret = process.env.CPX_HASH_SECRET;
    
    // CPX documentation: md5(trans_id + "-" + secure_hash_secret)
    const expectedHash = md5(`${trans_id}-${hashSecret}`);

    if (secure_hash !== expectedHash) {
      console.error('Invalid secure hash', { expectedHash, receivedHash: secure_hash });
      return res.status(403).json({ error: 'Invalid secure hash' });
    }

    const amount = parseFloat(amount_local);
    // Note: CPX test uses amount_local=0.0000, so we allow 0 for tests to succeed
    if (isNaN(amount) || amount < 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // 1. Credit the user's wallet using Firestore Admin
    const walletRef = db.collection('wallets').doc(ext_user_id);
    
    // We use a transaction or FieldValue.increment to safely add the money
    await walletRef.set({
      balance: FieldValue.increment(amount)
    }, { merge: true });

    // 2. Add a record to the user's ledger/history
    const ledgerRef = db.collection('ledger').doc();
    await ledgerRef.set({
      userId: ext_user_id,
      amount: amount,
      type: 'CREDIT',
      source: 'CPX_RESEARCH_SURVEY',
      transactionId: trans_id,
      timestamp: FieldValue.serverTimestamp(),
      description: `Survey Completion (ID: ${trans_id})`
    });

    // CPX expects a 200 OK response on successful processing
    return res.status(200).json({ success: true, message: 'Postback processed successfully' });

  } catch (error) {
    console.error('Postback processing error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message,
      stack: error.stack
    });
  }
}
