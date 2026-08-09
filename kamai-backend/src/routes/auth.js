const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { db } = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { name, email, phone, referralCode, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ error: "Name, phone number, and password are required." });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }

  // Check if phone or email exists
  const existing = db.prepare("SELECT * FROM users WHERE phone = ? OR (email = ? AND email IS NOT NULL AND email != '')").get(phone, email);
  if (existing) {
    return res.status(409).json({ error: "Account already exists with this phone or email." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = crypto.randomUUID();

  const insertUser = db.prepare("INSERT INTO users (id, name, email, phone, passwordHash, referralCode) VALUES (?, ?, ?, ?, ?, ?)");
  const insertWallet = db.prepare("INSERT INTO wallets (userId, balance) VALUES (?, ?)");

  // Run in transaction
  const signupTransaction = db.transaction(() => {
    insertUser.run(userId, name, email || null, phone, passwordHash, referralCode || null);
    insertWallet.run(userId, 0);
  });

  try {
    signupTransaction();
    const token = signToken(userId);
    res.status(201).json({ token, user: { id: userId, name, email, phone } });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to create account." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, phone, password } = req.body;
  // allow either email or phone depending on what client sent
  const identifier = email || phone; 

  if (!identifier || !password) {
    return res.status(400).json({ error: "Email/Phone and password are required." });
  }

  const user = db.prepare("SELECT * FROM users WHERE phone = ? OR email = ?").get(identifier, identifier);
  if (!user) {
    return res.status(401).json({ error: "Account not found." });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Incorrect password." });
  }

  const token = signToken(user.id);
  res.json({ token, user: { id: user.id, name: user.name, phone: user.phone, email: user.email } });
});

// GET /api/auth/me
router.get("/me", requireAuth, (req, res) => {
  const user = db.prepare("SELECT id, name, email, phone FROM users WHERE id = ?").get(req.userId);
  if (!user) return res.status(404).json({ error: "User not found." });

  const wallet = db.prepare("SELECT balance FROM wallets WHERE userId = ?").get(req.userId);

  res.json({
    ...user,
    walletBalance: wallet ? wallet.balance : 0,
  });
});

module.exports = router;
