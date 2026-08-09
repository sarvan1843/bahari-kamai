# Kama-Rupee Backend

Yeh backend Kama-Rupee earning app ke liye hai — login/signup, task list, wallet,
aur survey-partner postback (CPX Research jaisi companies se) handle karta hai.

## 1. Setup (pehli baar)

1. [Node.js](https://nodejs.org) install karo (version 18 ya usse upar) agar
   pehle se nahi hai.
2. Terminal mein is folder ke andar jao:
   ```
   cd kamai-backend
   npm install
   ```
3. `.env.example` ko copy karke `.env` naam ki file banao:
   ```
   cp .env.example .env
   ```
   Phir `.env` file kholo aur `JWT_SECRET` aur `POSTBACK_SECRET` ko kisi
   lambe, random string se replace karo (koi bhi 20-30 random characters
   chalenge).

## 2. Chalao

```
npm run dev
```

Agar sab sahi hua to terminal mein dikhega:
```
Kama-Rupee backend http://localhost:4000 par chal raha hai
```

Browser mein `http://localhost:4000` khol ke check karo — `{"status":"ok",...}`
dikhna chahiye.

## 3. Endpoints — kya karta hai kaunsa

| Method | Path | Kaam |
|---|---|---|
| POST | `/api/auth/signup` | Naya account banata hai |
| POST | `/api/auth/login` | Login karke token deta hai |
| GET | `/api/auth/me` | Logged-in user ki profile + balance |
| GET | `/api/tasks` | Available tasks ki list |
| GET | `/api/postback` | Survey partner (CPX jaisa) yahan call karta hai jab task complete ho |
| GET | `/api/wallet` | Current wallet balance |
| GET | `/api/wallet/ledger` | Sabhi earnings/withdrawals ki list |
| POST | `/api/wallet/withdraw` | Withdrawal request banata hai (paisa turant nahi jaata, pending mein jaata hai) |

### Test karne ke liye (curl se)

Sign up karo:
```
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Rahul Verma","phone":"9876543210","password":"test1234"}'
```
Response mein ek `token` milega — usse copy kar lo, aage sabme chahiye hoga.

Wallet dekho (token wali jagah apna copy kiya token daalo):
```
curl http://localhost:4000/api/wallet \
  -H "Authorization: Bearer <TOKEN_YAHAN_PASTE_KARO>"
```

Ek postback simulate karo (yeh replicate karta hai ki CPX Research jaisa
partner kya bhejega jab koi survey complete ho) — `user_id` wahi daalo jo
signup response mein `user.id` tha, aur `secret` wahi jo `.env` mein
`POSTBACK_SECRET` set kiya:
```
curl "http://localhost:4000/api/postback?user_id=<USER_ID>&external_id=test-txn-1&amount=50&status=1&secret=<POSTBACK_SECRET>"
```
Ab dobara wallet check karo — balance badh chuka hoga (agar `USER_SHARE_PERCENT=70`
hai to ₹50 ka 70% yaani ₹35 credit hoga).

## 4. Yeh kaise real survey partner (jaise CPX Research) se connect hoga

1. CPX Research par publisher account banao (pichhli baatchit mein bataya
   process follow karo).
2. Unke dashboard mein "Postback URL" / "S2S Callback" setting dhundo.
3. Wahan apna postback URL daalo:
   ```
   https://aapka-deployed-backend.com/api/postback?user_id={user_id}&external_id={trans_id}&amount={amount}&status={status}&secret=AAPKA_POSTBACK_SECRET
   ```
   (Exact parameter names — `{user_id}`, `{trans_id}` waghera — CPX ke docs
   mein diye honge, wahi placeholder istemal karo.)
4. Is backend ko internet par deploy karna hoga (localhost kaam nahi karega
   kyunki CPX ka server aapke computer tak nahi pahunch sakta). Beginner ke
   liye Railway.app ya Render.com jaise free/cheap hosting options
   sabse aasan hain.

## 5. Ab tak jo REAL nahi hai, aur aage kya karna hai

- **Task list abhi hardcoded hai** (`src/routes/tasks.js` mein) — real mein
  yeh CPX Research/TheoremReach ke API se live fetch hogi.
- **Withdrawal sirf "pending" record banata hai, paisa nahi bhejta** — real
  payout ke liye Razorpay Payouts ya Cashfree Payouts ka API integrate
  karna hoga (KYC/business verification ke baad).
- **Database abhi ek JSON file hai** (`data/db.json`) — chhoti scale ke
  liye theek hai, lekin jaise users badhein, PostgreSQL jaisi real
  database par shift karna chahiye.
- **Rate limiting nahi hai** — production mein login/signup endpoints par
  rate limiting (jaise `express-rate-limit` package) zaroor lagao, taaki
  koi bot bar-bar try na kar sake.

## 6. Frontend se kaise jode

Abhi jo website design (React artifact) bana hai, woh standalone demo hai
— usme login/wallet/task sab client-side mein hi simulate hota hai. Isse
is backend se jodne ke liye:

1. Backend ko deploy karo (upar dekho).
2. Frontend ke `handleSignup`/`handleLogin`/task-complete functions mein,
   demo wale `setUser(...)` ki jagah asli `fetch()` calls daalo jo upar
   diye API endpoints ko hit karein, aur response mein mila `token` save
   karke aage har request ke saath `Authorization: Bearer <token>` header
   bhejo.
