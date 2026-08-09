const express = require("express");
const crypto = require("crypto");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
router.use(requireAuth);

// GET /api/tasks/cpx
// Generates the CPX Research webview URL with Secure Hash
router.get("/cpx", (req, res) => {
  const appId = process.env.CPX_APP_ID || "12345"; // fallback for testing
  const secret = process.env.CPX_HASH_SECRET || "fallback_secret";
  const extUserId = req.userId;

  // CPX Secure Hash: md5(ext_user_id + "-" + secure_hash_secret)
  const hashString = `${extUserId}-${secret}`;
  const secureHash = crypto.createHash('md5').update(hashString).digest('hex');

  const cpxUrl = `https://offers.cpx-research.com/index.php?app_id=${appId}&ext_user_id=${extUserId}&secure_hash=${secureHash}`;
  
  res.json({ url: cpxUrl });
});

module.exports = router;
