const express = require("express");
const crypto = require("crypto");
const { db } = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
router.use(requireAuth);

// GET /api/wallet — current balance
router.get("/", (req, res) => {
  const wallet = db.prepare("SELECT balance FROM wallets WHERE userId = ?").get(req.userId);
  res.json({ balance: wallet ? wallet.balance : 0 });
});

// GET /api/wallet/ledger — list of earnings + withdrawals for this user
router.get("/ledger", (req, res) => {
  const entries = db.prepare("SELECT * FROM transactions WHERE userId = ? ORDER BY createdAt DESC").all(req.userId);
  res.json({ entries });
});

// POST /api/wallet/withdraw
router.post("/withdraw", (req, res) => {
  const { amount, upiId } = req.body;
  const minWithdraw = Number(process.env.MIN_WITHDRAW || 100);

  if (!amount || !upiId) {
    return res.status(400).json({ error: "Amount and UPI ID are required." });
  }
  if (amount < minWithdraw) {
    return res.status(400).json({ error: `Minimum withdrawal is ₹${minWithdraw}.` });
  }

  const wallet = db.prepare("SELECT balance FROM wallets WHERE userId = ?").get(req.userId);
  const balance = wallet ? wallet.balance : 0;

  if (amount > balance) {
    return res.status(400).json({ error: "Insufficient balance." });
  }

  const withdrawalId = crypto.randomUUID();
  const txId = crypto.randomUUID();

  const updateWallet = db.prepare("UPDATE wallets SET balance = balance - ? WHERE userId = ?");
  const insertWithdrawal = db.prepare("INSERT INTO withdrawals (id, userId, amount, upiId, status) VALUES (?, ?, ?, ?, ?)");
  const insertTransaction = db.prepare("INSERT INTO transactions (id, userId, title, amount, type, status, externalId) VALUES (?, ?, ?, ?, ?, ?, ?)");

  const processWithdrawal = db.transaction(() => {
    updateWallet.run(amount, req.userId);
    insertWithdrawal.run(withdrawalId, req.userId, amount, upiId, "pending");
    insertTransaction.run(txId, req.userId, "Withdrawal Request", -amount, "withdrawal", "pending", withdrawalId);
  });

  try {
    processWithdrawal();
    const newWallet = db.prepare("SELECT balance FROM wallets WHERE userId = ?").get(req.userId);
    res.status(201).json({ withdrawalId, status: "pending", newBalance: newWallet.balance });
  } catch (err) {
    console.error("Withdrawal error:", err);
    res.status(500).json({ error: "Failed to process withdrawal." });
  }
});

module.exports = router;
