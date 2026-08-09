const express = require("express");
const crypto = require("crypto");
const { db } = require("../db");

const router = express.Router();

// GET /api/admin/stats — Overall app statistics
router.get("/stats", (req, res) => {
  const totalUsers = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
  const totalWalletBalanceResult = db.prepare("SELECT SUM(balance) as total FROM wallets").get();
  const totalWalletBalance = totalWalletBalanceResult.total || 0;

  const pendingWithdrawalsCount = db.prepare("SELECT COUNT(*) as count FROM withdrawals WHERE status = 'pending'").get().count;
  const completedWithdrawalsCount = db.prepare("SELECT COUNT(*) as count FROM withdrawals WHERE status = 'completed'").get().count;
  
  const totalPaidOutResult = db.prepare("SELECT SUM(amount) as total FROM withdrawals WHERE status = 'completed'").get();
  const totalPaidOut = totalPaidOutResult.total || 0;

  const processedPostbacksCount = db.prepare("SELECT COUNT(*) as count FROM transactions WHERE type = 'earning' AND externalId IS NOT NULL").get().count;

  res.json({
    totalUsers,
    totalWalletBalance,
    pendingWithdrawalsCount,
    completedWithdrawalsCount,
    totalPaidOut,
    processedPostbacksCount,
  });
});

// GET /api/admin/withdrawals — List all withdrawal requests with user info
router.get("/withdrawals", (req, res) => {
  const list = db.prepare(`
    SELECT w.*, u.name as userName, u.phone as userPhone
    FROM withdrawals w
    LEFT JOIN users u ON w.userId = u.id
    ORDER BY w.createdAt DESC
  `).all();

  res.json({ withdrawals: list });
});

// POST /api/admin/withdrawals/:id/update — Mark withdrawal as 'completed' or 'rejected'
router.post("/withdrawals/:id/update", (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body; // status: 'completed' | 'rejected'

  if (!["completed", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Status must be 'completed' or 'rejected'." });
  }

  const withdrawal = db.prepare("SELECT * FROM withdrawals WHERE id = ?").get(id);
  if (!withdrawal) {
    return res.status(404).json({ error: "Withdrawal request not found." });
  }

  if (withdrawal.status !== "pending") {
    return res.status(400).json({ error: `Withdrawal is already '${withdrawal.status}'.` });
  }

  const updateWithdrawal = db.prepare("UPDATE withdrawals SET status = ? WHERE id = ?");
  const updateTransaction = db.prepare("UPDATE transactions SET status = ? WHERE externalId = ?");
  const updateWallet = db.prepare("UPDATE wallets SET balance = balance + ? WHERE userId = ?");
  const insertRefundTx = db.prepare("INSERT INTO transactions (id, userId, title, amount, type, status, externalId) VALUES (?, ?, ?, ?, ?, ?, ?)");

  const processUpdate = db.transaction(() => {
    updateWithdrawal.run(status, id);
    updateTransaction.run(status, id);

    if (status === "rejected") {
      updateWallet.run(withdrawal.amount, withdrawal.userId);
      insertRefundTx.run(crypto.randomUUID(), withdrawal.userId, "Withdrawal Refunded", withdrawal.amount, "earning", "confirmed", `refund-${id}`);
    }
  });

  try {
    processUpdate();
    res.json({ message: `Withdrawal marked as ${status}.` });
  } catch (err) {
    console.error("Admin update error:", err);
    res.status(500).json({ error: "Failed to update withdrawal." });
  }
});

// POST /api/admin/simulate-postback — Instantly trigger a test survey earnings postback
router.post("/simulate-postback", (req, res) => {
  const { userId, amount = 50, surveyTitle = "Demo Survey Completion" } = req.body;

  const user = db.prepare("SELECT id FROM users WHERE id = ? OR phone = ?").get(userId, userId);
  if (!user) {
    return res.status(404).json({ error: "User ID or Phone number not found." });
  }

  const externalId = `sim-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const grossAmount = Number(amount);
  const userSharePercent = Number(process.env.USER_SHARE_PERCENT || 70);
  const userAmount = Math.round(grossAmount * (userSharePercent / 100));

  const updateWallet = db.prepare("UPDATE wallets SET balance = balance + ? WHERE userId = ?");
  const insertTransaction = db.prepare("INSERT INTO transactions (id, userId, title, amount, type, status, externalId) VALUES (?, ?, ?, ?, ?, ?, ?)");

  const processSimulate = db.transaction(() => {
    updateWallet.run(userAmount, user.id);
    insertTransaction.run(crypto.randomUUID(), user.id, surveyTitle, userAmount, "earning", "confirmed", externalId);
  });

  try {
    processSimulate();
    const wallet = db.prepare("SELECT balance FROM wallets WHERE userId = ?").get(user.id);
    res.json({
      message: "Test postback complete! Wallet credited.",
      creditedAmount: userAmount,
      newBalance: wallet.balance,
    });
  } catch (err) {
    console.error("Simulate postback error:", err);
    res.status(500).json({ error: "Failed to simulate postback." });
  }
});

module.exports = router;
