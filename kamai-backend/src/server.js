require("dotenv").config();
const express = require("express");
const cors = require("cors");

if (!process.env.JWT_SECRET) process.env.JWT_SECRET = "kamai_secret_jwt_key_2026_safe_default";
if (!process.env.POSTBACK_SECRET) process.env.POSTBACK_SECRET = "kamai_postback_secret_key_12345";

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const walletRoutes = require("./routes/wallet");
const postbackRoutes = require("./routes/postback");
const adminRoutes = require("./routes/admin");

const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Kama-Rupee backend chal raha hai." });
});


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/postback", postbackRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Kama-Rupee backend http://localhost:${PORT} par chal raha hai`);
});

