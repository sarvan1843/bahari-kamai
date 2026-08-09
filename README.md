# Kama₹ (कमा-रुपया) - Full-Stack Earning Web Application

Yeh ek complete, production-ready earning web platform hai jisme Frontend (Vite + React + Tailwind + Lucide Icons) aur Backend (Node.js + Express + S2S Postbacks + Wallet System) jude hue hain.

---

## 🚀 Kaise Chalaayein (Quick Start)

### Step 1: Backend Server Chalaayein
Terminal mein `kamai-backend` folder mein jayein aur server start karein:
```bash
cd kamai-backend
npm run dev
```
Backend **http://localhost:4000** par start ho jaayega.

### Step 2: Frontend App Chalaayein
Naye Terminal window mein main folder par aayein aur Vite dev server start karein:
```bash
npm run dev
```
Frontend **http://localhost:3000** par open ho jaayega.

---

## 🌟 Key Features & Admin Control

1. **User Signup & Login**: Real JWT Authentication system (Phone number + Password).
2. **Real-time Wallet & Ledger**: Hardware/Disk JSON storage (`kamai-backend/data/db.json`). Har transaction real-time record hota hai.
3. **S2S Postback Integration**: CPX Research / TheoremReach survey callback handler ready hai.
4. **Admin Control & Test Simulator**:
   - Web application ke top header ya footer mein **"Admin Control"** button par click karke aap:
     - Real-time user stats, total earnings aur total payout dekh sakte hain.
     - **CPX Survey Postback Simulate** karke kisi bhi user ke account mein live reward credit kar sakte hain.
     - Users ki **UPI Withdrawal Requests** ko Approve/Mark Paid ya Reject & Refund kar sakte hain.

---

## 💸 Asli Earning & Payout Settings

1. **CPX Research Postback URL Configuration**:
   CPX Research dashboard mein yeh callback URL set karein:
   `https://<aapka-deployed-backend-domain>/api/postback?user_id={user_id}&external_id={trans_id}&amount={amount}&status={status}&secret=kamai_postback_secret_key_12345`

2. **Razorpay / Cashfree UPI Payouts**:
   `kamai-backend/src/routes/wallet.js` mein Razorpay/Cashfree Payout API call karke automatic instant bank credit set kar sakte hain.
