import md5 from 'md5';
import { auth, db } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  serverTimestamp,
  runTransaction
} from "firebase/firestore";

export const api = {
  // --- Auth ---
  signup: async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      // Save user profile
      await setDoc(doc(db, "users", user.uid), {
        name: data.name,
        email: data.email,
        phone: data.phone,
        createdAt: serverTimestamp()
      });

      // Initialize Wallet
      await setDoc(doc(db, "wallets", user.uid), {
        balance: 0
      });

      // Immediately sign out to force manual login
      await signOut(auth);
      
      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  login: async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      localStorage.setItem('kamai_token', userCredential.user.uid);
      return { user: userCredential.user };
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  },

  logout: async () => {
    await signOut(auth);
    localStorage.removeItem('kamai_token');
  },

  getMe: async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not logged in");
    
    const userDoc = await getDoc(doc(db, "users", user.uid));
    return { user: { id: user.uid, ...userDoc.data() } };
  },

  // --- Wallet ---
  getWallet: async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not logged in");

    const walletDoc = await getDoc(doc(db, "wallets", user.uid));
    if (walletDoc.exists()) {
      return walletDoc.data();
    }
    return { balance: 0 };
  },

  getLedger: async () => {
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(collection(db, "transactions"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const ledger = [];
    querySnapshot.forEach((doc) => {
      ledger.push({ id: doc.id, ...doc.data() });
    });
    // Sort descending by date locally
    return ledger.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
  },

  requestWithdraw: async (data) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not logged in");

    const amount = Number(data.amount);
    if (amount <= 0) throw new Error("Invalid amount");

    try {
      await runTransaction(db, async (transaction) => {
        const walletRef = doc(db, "wallets", user.uid);
        const walletDoc = await transaction.get(walletRef);
        
        if (!walletDoc.exists()) throw new Error("Wallet not found");
        
        const currentBalance = walletDoc.data().balance;
        if (currentBalance < amount) throw new Error("Insufficient balance");

        // Deduct balance
        transaction.update(walletRef, { balance: currentBalance - amount });

        // Add withdrawal record
        const withdrawRef = doc(collection(db, "withdrawals"));
        transaction.set(withdrawRef, {
          userId: user.uid,
          amount: amount,
          upiId: data.upiId,
          status: "pending",
          createdAt: serverTimestamp()
        });

        // Add ledger record
        const txRef = doc(collection(db, "transactions"));
        transaction.set(txRef, {
          userId: user.uid,
          title: "UPI Withdrawal",
          amount: amount,
          type: "debit",
          status: "completed",
          createdAt: serverTimestamp()
        });
      });
      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // --- External APIs (Vercel Serverless) ---
  getCPXUrl: async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not logged in");
    
    // GENERATING IN FRONTEND FOR LOCAL TESTING ONLY
    // We will move this to Vercel backend later to protect the secret
    const ext_user_id = user.uid;
    const appId = "35215";
    const hashSecret = "5mL3nuvwnkTX16CJzym49H43fjrUctLe";
    const secureHash = md5(ext_user_id + "-" + hashSecret);
    
    const url = `https://offers.cpx-research.com/index.php?app_id=${appId}&ext_user_id=${ext_user_id}&secure_hash=${secureHash}`;
    return { url };
  },

  getTasks: async () => {
    // Legacy support for dummy tasks
    return [];
  },

  // --- Daily Rewards ---
  getDailyRewardStatus: async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not logged in");

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const data = userDoc.data() || {};
    const lastClaimedStr = data.lastDailyRewardDate || ""; // "YYYY-MM-DD"
    const streak = data.dailyRewardStreak || 0;

    const todayStr = new Date().toISOString().split('T')[0];
    
    // If last claimed was yesterday, keep streak. If older, reset to 0.
    let currentStreak = streak;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastClaimedStr !== todayStr && lastClaimedStr !== yesterdayStr) {
      currentStreak = 0;
    }
    // Max streak logic (loops back to 0 after 7 days)
    if (currentStreak >= 7) {
        currentStreak = 0;
    }

    const canClaim = lastClaimedStr !== todayStr;
    
    return {
      streak: currentStreak,
      lastClaimedDate: lastClaimedStr,
      canClaim
    };
  },

  claimDailyReward: async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not logged in");

    const DAILY_REWARDS = [10, 20, 50, 80, 120, 200, 500];

    try {
      return await runTransaction(db, async (transaction) => {
        const userRef = doc(db, "users", user.uid);
        const walletRef = doc(db, "wallets", user.uid);
        
        const userDoc = await transaction.get(userRef);
        const walletDoc = await transaction.get(walletRef);

        const userData = userDoc.exists() ? userDoc.data() : {};
        const walletData = walletDoc.exists() ? walletDoc.data() : { balance: 0 };

        const lastClaimedStr = userData.lastDailyRewardDate || "";
        const streak = userData.dailyRewardStreak || 0;
        const todayStr = new Date().toISOString().split('T')[0];

        if (lastClaimedStr === todayStr) {
          throw new Error("Already claimed today!");
        }

        let currentStreak = streak;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastClaimedStr !== yesterdayStr && lastClaimedStr !== "") {
          currentStreak = 0; // Reset streak if missed a day
        }
        if (currentStreak >= 7) {
            currentStreak = 0;
        }

        const rewardAmount = DAILY_REWARDS[currentStreak];

        // Update User Doc
        transaction.update(userRef, {
          lastDailyRewardDate: todayStr,
          dailyRewardStreak: currentStreak + 1
        });

        // Update Wallet Doc
        transaction.update(walletRef, {
          balance: walletData.balance + rewardAmount
        });

        // Add Transaction Ledger
        const txRef = doc(collection(db, "transactions"));
        transaction.set(txRef, {
          userId: user.uid,
          title: `Daily Reward (Day ${currentStreak + 1})`,
          amount: rewardAmount,
          type: "credit",
          status: "completed",
          createdAt: serverTimestamp()
        });

        return { success: true, rewardAmount, newStreak: currentStreak + 1 };
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // --- Admin ---
  adminGetStats: async () => { return {}; },
  adminGetWithdrawals: async () => { return []; }
};
