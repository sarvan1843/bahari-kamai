const jwt = require("jsonwebtoken");

// Protects routes that need a logged-in user.
// Expects header: Authorization: Bearer <token>
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Login zaroori hai. Token nahi mila." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid ya expire ho gaya hai. Dobara login karo." });
  }
}

module.exports = { requireAuth };
