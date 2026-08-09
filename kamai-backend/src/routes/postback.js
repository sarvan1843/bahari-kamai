const express = require("express");
const crypto = require("crypto");
const { db } = require("../db");

const router = express.Router();

// GET /api/postback
// CPX Research Server-to-Server Postback URL
router.get("/", (req, res) => {
  const { status, trans_id, user_id, amount_local, hash } = req.query;

  if (!status || !trans_id || !user_id || !amount_local || !hash) {
    return res.status(400).send("missing params");
  }

  // 1. Verify Secure Hash
  const secret = process.env.CPX_HASH_SECRET || "fallback_secret";
  const expectedHash = crypto.createHash('md5').update(`${trans_id}-${secret}`).digest('hex');

  if (hash !== expectedHash) {
    console.error(`Invalid hash for trans_id ${trans_id}. Expected ${expectedHash}, got ${hash}`);
    return res.status(403).send("forbidden");
  }

  // 2. Ignore Chargebacks or unsuccessful surveys
  if (status !== "1") {
    // If status=2 it's a chargeback, you might want to deduct from wallet in future.
    // For now we just acknowledge it.
    return res.status(200).send("1"); // Always return "1" to CPX to acknowledge
  }

  // 3. Verify User
  const user = db.prepare("SELECT id FROM users WHERE id = ?").get(user_id);
  if (!user) {
    console.error(`User not found: ${user_id}`);
    return res.status(404).send("unknown user_id");
  }

  // 4. Prevent Double Credit (Idempotency)
  const existingTx = db.prepare("SELECT id FROM transactions WHERE externalId = ? AND type = 'earning'").get(trans_id);
  if (existingTx) {
    return res.status(200).send("1"); // Already processed, acknowledge
  }

  const grossAmount = Number(amount_local);
  if (Number.isNaN(grossAmount) || grossAmount <= 0) {
    return res.status(400).send("invalid amount");
  }

  // Database updates
  const updateWallet = db.prepare("UPDATE wallets SET balance = balance + ? WHERE userId = ?");
  const insertTransaction = db.prepare("INSERT INTO transactions (id, userId, title, amount, type, status, externalId) VALUES (?, ?, ?, ?, ?, ?, ?)");

  const processPostback = db.transaction(() => {
    updateWallet.run(grossAmount, user_id);
    insertTransaction.run(crypto.randomUUID(), user_id, "CPX Research Survey", grossAmount, "earning", "confirmed", trans_id);
  });

  try {
    processPostback();
    // CPX REQUIRES the response to be EXACTLY the string "1" for success
    res.status(200).send("1");
  } catch (err) {
    console.error("Postback processing error:", err);
    res.status(500).send("internal error");
  }
});

module.exports = router;
