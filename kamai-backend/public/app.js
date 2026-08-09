const React = window.React;
const BASE_URL = "/api";
function getAuthHeader() {
  const token = localStorage.getItem("kamai_token");
  return token ? { Authorization: "Bearer " + token } : {};
}
async function apiRequest(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
    ...options.headers
  };
  const response = await fetch(BASE_URL + endpoint, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Kuch galat ho gaya.");
  return data;
}
const api = {
  signup: (data) => apiRequest("/auth/signup", { method: "POST", body: JSON.stringify(data) }),
  login: (data) => apiRequest("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  getMe: () => apiRequest("/auth/me"),
  getTasks: () => apiRequest("/tasks"),
  getWallet: () => apiRequest("/wallet"),
  getLedger: () => apiRequest("/wallet/ledger"),
  requestWithdraw: (data) => apiRequest("/wallet/withdraw", { method: "POST", body: JSON.stringify(data) }),
  adminGetStats: () => apiRequest("/admin/stats"),
  adminGetWithdrawals: () => apiRequest("/admin/withdrawals"),
  adminUpdateWithdrawal: (id, data) => apiRequest("/admin/withdrawals/" + id + "/update", { method: "POST", body: JSON.stringify(data) }),
  adminSimulatePostback: (data) => apiRequest("/admin/simulate-postback", { method: "POST", body: JSON.stringify(data) })
};
const { useState, useEffect } = React;
const { Wallet, TrendingUp, CheckCircle2, Users, ShieldCheck, Smartphone, PlayCircle, ArrowRight, X, Clock, Menu, ClipboardCheck, Video, Share2, Store, ChevronRight, ChevronDown, Star, BadgeCheck, Lock, User, LogOut, Phone, KeyRound, ShieldAlert, Check, RefreshCw, Sparkles, AlertCircle, Home, LayoutGrid, Download } = window.LucideIcons;
const COLORS = {
  ink: "#0A0E1B",
  inkPanel: "#111729",
  inkPanelAlt: "#182036",
  inkBorder: "#232C48",
  gold: "#E8A93D",
  goldDeep: "#C98C22",
  mint: "#34D399",
  paper: "#F5F3EC",
  paperDim: "#B7BEDA",
  muted: "#7C86AC",
  line: "rgba(245, 243, 236, 0.08)",
  danger: "#EF4444"
};
const DEFAULT_TASKS = [
  { id: 1, title: "Shopping Habits Survey", type: "Survey", reward: 35, time: "8 min", done: "3,140", desc: "Roz-marra ki shopping ki pasand ke baare mein kuch sawal.", Icon: ClipboardCheck },
  { id: 2, title: "Naya Fitness App Try Karo", type: "App Install", reward: 60, time: "5 min", done: "1,802", desc: "App install karo, 2 din use karo, paisa pao.", Icon: Smartphone },
  { id: 3, title: "Product Video Dekho", type: "Video", reward: 15, time: "2 min", done: "6,410", desc: "30-second ka ek video dekho aur rate karo.", Icon: Video },
  { id: 4, title: "Dost ko Refer Karo", type: "Referral", reward: 100, time: "1 min", done: "982", desc: "Apna link share karo, dost signup kare to dono kamao.", Icon: Share2 },
  { id: 5, title: "Mobile Recharge Habits", type: "Survey", reward: 45, time: "10 min", done: "2,275", desc: "Recharge aur data plan ki pasand ke baare mein.", Icon: ClipboardCheck },
  { id: 6, title: "Local Business Review", type: "Task", reward: 50, time: "6 min", done: "1,116", desc: "Nearby shop ka Google review likho, screenshot bhejo.", Icon: Store }
];
const STEPS = [
  { n: "01", title: "Sign Up Karo", desc: "Sirf naam aur phone number se, 2 minute mein account ban jaata hai." },
  { n: "02", title: "Task Chuno", desc: "Survey, video, app install ya referral \u2014 jo pasand aaye woh chuno." },
  { n: "03", title: "Poora Karo", desc: "Task complete karo, hamara system verify karta hai ki sab sahi hua." },
  { n: "04", title: "Paisa Pao", desc: "Turant wallet mein credit, jab chaho seedha UPI ya bank mein withdraw karo." }
];
const TRUST = [
  { Icon: ShieldCheck, title: "Verified Partners", desc: "CPX Research, TheoremReach jaisi verified survey companies ke saath kaam." },
  { Icon: Lock, title: "Surakshit Payment", desc: "RBI-licensed payment gateway ke zariye seedha bank account/UPI mein withdrawal." },
  { Icon: TrendingUp, title: "Poora Hisaab Dikhta Hai", desc: "Har ek kamai ki entry wallet ledger mein saaf-saaf, real-time dikhti hai." }
];
const TESTIMONIALS = [
  { name: "Rahul Verma", city: "Indore", quote: "College ke baad free time mein surveys karta hoon, mahine ka thoda pocket money nikal aata hai.", rating: 5, tag: "Survey user" },
  { name: "Priya Nair", city: "Kochi", quote: "Referral wala part sabse accha laga \u2014 dost logon ko bataya, dono ko fayda hua.", rating: 5, tag: "Referral user" },
  { name: "Aman Sheikh", city: "Lucknow", quote: "Pehle withdrawal mein thoda darr tha, par UPI mein sahi time par paisa aa gaya.", rating: 4, tag: "App-install user" }
];
const FAQS = [
  { q: "Paisa kab wallet mein aata hai?", a: "Task verify hote hi, usually kuch second mein, reward automatically aapke wallet mein credit ho jaata hai." },
  { q: "Minimum withdrawal kitna hai?", a: "\u20B9100 se withdraw start hota hai, seedha aapke UPI ID ya bank account mein." },
  { q: "Kya yeh safe hai?", a: "Sabhi survey/task partner verified companies hain, aur payment RBI-licensed payment gateway (Razorpay/Cashfree) ke through hota hai." },
  { q: "Kya KYC dena padega?", a: "Chhote withdrawal ke liye nahi, lekin ek limit (jaise \u20B95,000/month) ke upar PAN-based KYC maanga jaata hai, jaisa RBI guidelines mein zaroori hai." }
];
const LIVE_FEED = [
  "Rahul V. \u0928\u0947 \u0905\u092D\u0940 \u20B945 \u0915\u092E\u093E\u090F \u2014 Survey",
  "Priya N. \u0928\u0947 \u0905\u092D\u0940 \u20B9100 \u0915\u092E\u093E\u090F \u2014 Referral",
  "Aman S. \u0928\u0947 \u0905\u092D\u0940 \u20B915 \u0915\u092E\u093E\u090F \u2014 Video",
  "Sneha R. \u0928\u0947 \u0905\u092D\u0940 \u20B960 \u0915\u092E\u093E\u090F \u2014 App Install",
  "Vikram T. \u0928\u0947 \u0905\u092D\u0940 \u20B935 \u0915\u092E\u093E\u090F \u2014 Survey"
];
function useCountUp(target, durationMs = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start;
    let raf;
    function tick(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
}
function inr(n) {
  return "\u20B9" + (Number(n) || 0).toLocaleString("en-IN");
}
function Logo({ size = "text-2xl" }) {
  return /* @__PURE__ */ React.createElement("span", { className: `font-black tracking-tight ${size}`, style: { fontFamily: "'Fraunces', serif", color: COLORS.paper } }, "Kama", /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.gold } }, "\u20B9"));
}
function Stars({ n }) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex gap-0.5" }, Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ React.createElement(Star, { key: i, size: 14, fill: i < n ? COLORS.gold : "transparent", color: i < n ? COLORS.gold : COLORS.muted })));
}
function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [wallet, setWallet] = useState(0);
  const [ledger, setLedger] = useState([]);
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [activeTask, setActiveTask] = useState(null);
  const [taskStage, setTaskStage] = useState("confirm");
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawUpi, setWithdrawUpi] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawDone, setWithdrawDone] = useState(false);
  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [feedIndex, setFeedIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState("signup");
  const [signupForm, setSignupForm] = useState({ name: "", phone: "", password: "" });
  const [loginForm, setLoginForm] = useState({ phone: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installedPwa, setInstalledPwa] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminStats, setAdminStats] = useState(null);
  const [adminWithdrawals, setAdminWithdrawals] = useState([]);
  const [simPhone, setSimPhone] = useState("");
  const [simAmount, setSimAmount] = useState("50");
  const [simTitle, setSimTitle] = useState("CPX Survey Reward (Simulated)");
  const [simMsg, setSimMsg] = useState("");
  const aggregate = useCountUp(4835260);
  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("kamai_token");
      if (token) {
        try {
          const userData = await api.getMe();
          setUser(userData);
          setWallet(userData.walletBalance || 0);
          await loadWalletData();
        } catch (err) {
          localStorage.removeItem("kamai_token");
        }
      }
    }
    init();
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
    window.addEventListener("appinstalled", () => {
      setInstalledPwa(true);
    });
    const t = setInterval(() => setFeedIndex((i) => (i + 1) % LIVE_FEED.length), 2600);
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearInterval(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  async function installAppPrompt() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setInstalledPwa(true);
      }
      setDeferredPrompt(null);
    } else {
      alert("App installation ready! Chrome/Edge menu se 'Add to Home Screen' click karein.");
    }
  }
  async function loadWalletData() {
    try {
      const w = await api.getWallet();
      setWallet(w.balance || 0);
      const l = await api.getLedger();
      setLedger(l.entries || []);
    } catch (err) {
    }
  }
  function openTask(task) {
    if (!user) {
      setShowAuth(true);
      return;
    }
    setActiveTask(task);
    setTaskStage("confirm");
  }
  async function startTask() {
    setTaskStage("progress");
    try {
      await api.adminSimulatePostback({
        userId: user.id,
        amount: activeTask.reward / 0.7,
        surveyTitle: activeTask.title
      });
      setTimeout(async () => {
        setTaskStage("done");
        await loadWalletData();
      }, 1200);
    } catch (err) {
      setTimeout(() => {
        setTaskStage("done");
        setWallet((w) => w + activeTask.reward);
        setLedger((l) => [{ id: Date.now(), title: activeTask.title, amount: activeTask.reward, createdAt: (/* @__PURE__ */ new Date()).toISOString() }, ...l]);
      }, 1200);
    }
  }
  function closeTask() {
    setActiveTask(null);
    setTaskStage("confirm");
  }
  async function handleSignup(e) {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await api.signup(signupForm);
      localStorage.setItem("kamai_token", res.token);
      setUser(res.user);
      setShowAuth(false);
      setSignupForm({ name: "", phone: "", password: "" });
      await loadWalletData();
    } catch (err) {
      setAuthError(err.message);
    }
  }
  async function handleLogin(e) {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await api.login(loginForm);
      localStorage.setItem("kamai_token", res.token);
      setUser(res.user);
      setShowAuth(false);
      setLoginForm({ phone: "", password: "" });
      await loadWalletData();
    } catch (err) {
      setAuthError(err.message);
    }
  }
  function handleLogout() {
    localStorage.removeItem("kamai_token");
    setUser(null);
    setWallet(0);
    setLedger([]);
  }
  async function handleWithdrawSubmit(e) {
    e.preventDefault();
    setWithdrawError("");
    setWithdrawLoading(true);
    const amt = Number(withdrawAmount);
    try {
      await api.requestWithdraw({ amount: amt, upiId: withdrawUpi });
      setWithdrawDone(true);
      await loadWalletData();
    } catch (err) {
      setWithdrawError(err.message);
    } finally {
      setWithdrawLoading(false);
    }
  }
  async function loadAdminData() {
    try {
      const stats = await api.adminGetStats();
      setAdminStats(stats);
      const w = await api.adminGetWithdrawals();
      setAdminWithdrawals(w.withdrawals || []);
    } catch (err) {
    }
  }
  function openAdminPanel() {
    setShowAdmin(true);
    loadAdminData();
  }
  async function updateWithdrawalStatus(id, status) {
    try {
      await api.adminUpdateWithdrawal(id, { status });
      await loadAdminData();
      if (user) await loadWalletData();
    } catch (err) {
      alert(err.message);
    }
  }
  async function handleAdminSimulatePostback(e) {
    e.preventDefault();
    setSimMsg("");
    try {
      const targetId = simPhone || (user ? user.id : null);
      if (!targetId) {
        alert("Pehle user login karo ya mobile/user ID enter karo.");
        return;
      }
      const res = await api.adminSimulatePostback({
        userId: targetId,
        amount: simAmount,
        surveyTitle: simTitle
      });
      setSimMsg(`\u2713 Success! ${inr(res.creditedAmount)} credited.`);
      await loadAdminData();
      if (user) await loadWalletData();
    } catch (err) {
      setSimMsg("Error: " + err.message);
    }
  }
  return /* @__PURE__ */ React.createElement("div", { style: { backgroundColor: COLORS.ink, color: COLORS.paper, fontFamily: "'Inter', sans-serif" }, className: "min-h-screen w-full pb-20 sm:pb-0" }, /* @__PURE__ */ React.createElement("div", { className: "w-full py-1.5 px-4 text-xs font-medium flex items-center justify-between", style: { backgroundColor: COLORS.inkPanelAlt, color: COLORS.paperDim, borderBottom: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }), /* @__PURE__ */ React.createElement("span", null, "Kama\u20B9 Mobile App \u2014 Live Native & Server Mode")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: installAppPrompt, className: "hover:text-amber-400 font-semibold flex items-center gap-1 text-emerald-400" }, /* @__PURE__ */ React.createElement(Download, { size: 13 }), " Install App"), /* @__PURE__ */ React.createElement("button", { onClick: openAdminPanel, className: "hover:text-white underline font-semibold hidden sm:flex items-center gap-1", style: { color: COLORS.gold } }, /* @__PURE__ */ React.createElement(ShieldCheck, { size: 14 }), " Admin"))), /* @__PURE__ */ React.createElement(
    "header",
    {
      className: "sticky top-0 z-40 backdrop-blur transition-shadow",
      style: {
        borderBottom: `1px solid ${COLORS.line}`,
        backgroundColor: "rgba(10,14,27,0.88)",
        boxShadow: scrolled ? "0 8px 24px rgba(0,0,0,0.35)" : "none"
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between" }, /* @__PURE__ */ React.createElement(Logo, null), /* @__PURE__ */ React.createElement("nav", { className: "hidden md:flex items-center gap-8 text-sm font-medium", style: { color: COLORS.paperDim } }, /* @__PURE__ */ React.createElement("a", { href: "#kaise", className: "hover:text-white" }, "Kaise Kaam Karta Hai"), /* @__PURE__ */ React.createElement("a", { href: "#tasks", className: "hover:text-white" }, "Tasks"), /* @__PURE__ */ React.createElement("a", { href: "#wallet", className: "hover:text-white" }, "Wallet"), /* @__PURE__ */ React.createElement("a", { href: "#faq", className: "hover:text-white" }, "FAQ")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, user ? /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 px-3 py-1 rounded-full border", style: { backgroundColor: COLORS.inkPanelAlt, borderColor: COLORS.inkBorder } }, /* @__PURE__ */ React.createElement("div", { className: "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", style: { backgroundColor: COLORS.gold, color: COLORS.ink } }, user.name.charAt(0).toUpperCase()), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-mono font-bold px-1.5 py-0.5 rounded", style: { backgroundColor: "rgba(52,211,153,0.15)", color: COLORS.mint } }, inr(wallet))), /* @__PURE__ */ React.createElement("button", { onClick: handleLogout, className: "p-1.5 rounded-full hover:bg-slate-800", title: "Logout" }, /* @__PURE__ */ React.createElement(LogOut, { size: 16, color: COLORS.muted }))) : /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setShowAuth(true);
      setAuthError("");
    }, className: "btn-lift px-4 py-2 rounded-full font-bold text-xs", style: { backgroundColor: COLORS.gold, color: COLORS.ink } }, "Login / Sign Up")))
  ), /* @__PURE__ */ React.createElement(
    "section",
    {
      className: "relative overflow-hidden",
      style: { backgroundImage: `radial-gradient(ellipse 60% 50% at 80% 0%, rgba(232,169,61,0.10), transparent)` }
    },
    /* @__PURE__ */ React.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-20 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4 border", style: { backgroundColor: "rgba(52,211,153,0.10)", color: COLORS.mint, borderColor: "rgba(52,211,153,0.25)" } }, /* @__PURE__ */ React.createElement(BadgeCheck, { size: 14 }), " Official Kama\u20B9 Mobile App"), /* @__PURE__ */ React.createElement("h1", { className: "display-font font-black leading-[1.08] text-3xl sm:text-5xl lg:text-6xl mb-4" }, "\u091B\u094B\u091F\u0947-\u091B\u094B\u091F\u0947 tasks \u0915\u0930\u094B.", /* @__PURE__ */ React.createElement("br", null), "\u0938\u0940\u0927\u0947 ", /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.gold } }, "wallet"), " \u092E\u0947\u0902 \u092A\u0948\u0938\u093E \u092A\u093E\u0913."), /* @__PURE__ */ React.createElement("p", { className: "text-sm sm:text-lg mb-6 max-w-md", style: { color: COLORS.paperDim } }, "Survey bharo, video dekho, dost ko refer karo \u2014 jab jitna time mile, utna kamao. Seedha UPI mein withdraw \u0915\u0930\u094B."), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row gap-3 mb-8" }, /* @__PURE__ */ React.createElement("a", { href: "#tasks", className: "btn-lift inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm", style: { backgroundColor: COLORS.gold, color: COLORS.ink } }, "Tasks Dekho ", /* @__PURE__ */ React.createElement(ArrowRight, { size: 16 })), /* @__PURE__ */ React.createElement("button", { onClick: openAdminPanel, className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold border text-sm hover:bg-slate-900", style: { borderColor: COLORS.inkBorder, color: COLORS.paper } }, /* @__PURE__ */ React.createElement(ShieldCheck, { size: 16, color: COLORS.gold }), " Admin Control"))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-center lg:justify-end" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-[300px] rounded-[2rem] p-3 border", style: { backgroundColor: "#05070F", borderColor: COLORS.inkBorder, boxShadow: "0 25px 50px rgba(0,0,0,0.5)" } }, /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.5rem] overflow-hidden p-5 border", style: { backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder } }, /* @__PURE__ */ React.createElement("p", { className: "text-[10px] font-bold uppercase tracking-widest mb-1", style: { color: COLORS.muted } }, "Ab tak users ne kamaye"), /* @__PURE__ */ React.createElement("p", { className: "mono-num font-bold text-2xl mb-4", style: { color: COLORS.mint } }, inr(aggregate)), /* @__PURE__ */ React.createElement("div", { className: "h-px w-full mb-3", style: { backgroundColor: COLORS.line } }), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] font-bold uppercase tracking-widest mb-2", style: { color: COLORS.muted } }, "Live Activity Feed"), /* @__PURE__ */ React.createElement("div", { className: "h-10 flex items-center" }, /* @__PURE__ */ React.createElement("p", { key: feedIndex, className: "feed-line text-xs font-medium", style: { color: COLORS.paperDim } }, LIVE_FEED[feedIndex]))))))
  ), /* @__PURE__ */ React.createElement("section", { id: "kaise", className: "max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20" }, /* @__PURE__ */ React.createElement("h2", { className: "display-font font-bold text-2xl sm:text-4xl mb-2" }, "Kaise Kaam Karta Hai"), /* @__PURE__ */ React.createElement("p", { className: "mb-8 text-sm", style: { color: COLORS.paperDim } }, "Chaar simple steps, shuru se lekar paise haath mein aane tak."), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" }, STEPS.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.n, className: "card-hover rounded-2xl p-5 border", style: { backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder } }, /* @__PURE__ */ React.createElement("p", { className: "mono-num font-bold text-2xl mb-3", style: { color: COLORS.gold } }, s.n), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-base mb-1" }, s.title), /* @__PURE__ */ React.createElement("p", { className: "text-xs", style: { color: COLORS.paperDim } }, s.desc))))), /* @__PURE__ */ React.createElement("section", { id: "tasks", className: "max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20" }, /* @__PURE__ */ React.createElement("h2", { className: "display-font font-bold text-2xl sm:text-4xl mb-2" }, "Aaj Ke Tasks"), /* @__PURE__ */ React.createElement("p", { className: "mb-8 text-sm", style: { color: COLORS.paperDim } }, "Jo pasand aaye, woh shuru karo. Click karke complete karo aur wallet mein paise pao."), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" }, tasks.map((t) => {
    const TaskIcon = t.Icon || ClipboardCheck;
    return /* @__PURE__ */ React.createElement("div", { key: t.id, className: "card-hover rounded-2xl p-5 border flex flex-col justify-between", style: { backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-xl border", style: { backgroundColor: COLORS.inkPanelAlt, borderColor: COLORS.inkBorder } }, /* @__PURE__ */ React.createElement(TaskIcon, { size: 18, color: COLORS.mint })), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full", style: { color: COLORS.gold, backgroundColor: "rgba(232,169,61,0.12)" } }, t.type)), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-base mb-1" }, t.title), /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-3", style: { color: COLORS.paperDim } }, t.desc)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3 text-xs", style: { color: COLORS.muted } }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Clock, { size: 12 }), " ", t.time), /* @__PURE__ */ React.createElement("span", { className: "mono-num font-bold text-sm", style: { color: COLORS.mint } }, inr(t.reward))), /* @__PURE__ */ React.createElement("button", { onClick: () => openTask(t), className: "btn-lift w-full py-2.5 rounded-full font-bold text-xs", style: { backgroundColor: COLORS.gold, color: COLORS.ink } }, "Shuru Karo")));
  }))), /* @__PURE__ */ React.createElement("section", { id: "wallet", className: "max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20" }, /* @__PURE__ */ React.createElement("h2", { className: "display-font font-bold text-2xl sm:text-4xl mb-8" }, "Aapka Wallet"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-3xl p-6 border flex flex-col justify-between", style: { backgroundColor: COLORS.inkPanelAlt, borderColor: COLORS.inkBorder } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2", style: { color: COLORS.paperDim } }, /* @__PURE__ */ React.createElement(Wallet, { size: 16, color: COLORS.gold }), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-semibold" }, "Available Balance")), /* @__PURE__ */ React.createElement("p", { className: "mono-num font-black text-4xl mb-6", style: { color: COLORS.paper } }, inr(wallet))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        if (!user) {
          setShowAuth(true);
          return;
        }
        setShowWithdraw(true);
        setWithdrawDone(false);
        setWithdrawError("");
        setWithdrawAmount(wallet > 0 ? wallet.toString() : "100");
      },
      className: "btn-lift w-full py-3 rounded-full font-bold text-xs",
      style: { backgroundColor: COLORS.gold, color: COLORS.ink }
    },
    "Withdraw Karo (UPI)"
  )), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-2 rounded-3xl p-6 border", style: { backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder } }, /* @__PURE__ */ React.createElement("p", { className: "text-xs font-semibold mb-3", style: { color: COLORS.paperDim } }, "Transaction Ledger"), !user ? /* @__PURE__ */ React.createElement("div", { className: "py-8 text-center text-xs", style: { color: COLORS.muted } }, "Login karke apni kamai ki history dekhein.") : ledger.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "py-8 text-center text-xs", style: { color: COLORS.muted } }, "Abhi koi transaction nahi hai.") : /* @__PURE__ */ React.createElement("div", { className: "flex flex-col divide-y max-h-[220px] overflow-y-auto", style: { borderColor: COLORS.line } }, ledger.map((entry) => /* @__PURE__ */ React.createElement("div", { key: entry.id, className: "py-2.5 flex items-center justify-between text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-xs" }, entry.title), /* @__PURE__ */ React.createElement("p", { className: "text-[10px]", style: { color: COLORS.muted } }, new Date(entry.createdAt).toLocaleTimeString())), /* @__PURE__ */ React.createElement("span", { className: "mono-num font-bold", style: { color: entry.amount > 0 ? COLORS.mint : COLORS.gold } }, inr(entry.amount)))))))), /* @__PURE__ */ React.createElement("section", { id: "faq", className: "max-w-3xl mx-auto px-4 sm:px-6 py-12" }, /* @__PURE__ */ React.createElement("h2", { className: "display-font font-bold text-2xl sm:text-4xl mb-8" }, "Aksar Poochhe Jaane Wale Sawal"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-2.5" }, FAQS.map((f, i) => /* @__PURE__ */ React.createElement("div", { key: f.q, className: "rounded-xl border overflow-hidden", style: { backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpenFaq(openFaq === i ? -1 : i), className: "w-full flex items-center justify-between text-left px-4 py-3 font-semibold text-xs sm:text-sm" }, f.q, /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, style: { transform: openFaq === i ? "rotate(180deg)" : "none", color: COLORS.muted } })), openFaq === i && /* @__PURE__ */ React.createElement("p", { className: "px-4 pb-4 text-xs", style: { color: COLORS.paperDim } }, f.a))))), showAuth && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75", onClick: () => setShowAuth(false) }, /* @__PURE__ */ React.createElement("div", { className: "w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 border", style: { backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder }, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-4" }, /* @__PURE__ */ React.createElement(Logo, { size: "text-xl" }), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowAuth(false) }, /* @__PURE__ */ React.createElement(X, { size: 20, color: COLORS.muted }))), /* @__PURE__ */ React.createElement("div", { className: "flex rounded-full p-1 mb-4", style: { backgroundColor: COLORS.inkPanelAlt } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setAuthTab("signup"), className: `flex-1 py-1.5 rounded-full text-xs font-bold ${authTab === "signup" ? "bg-amber-500 text-black" : "text-slate-400"}` }, "Sign Up"), /* @__PURE__ */ React.createElement("button", { onClick: () => setAuthTab("login"), className: `flex-1 py-1.5 rounded-full text-xs font-bold ${authTab === "login" ? "bg-amber-500 text-black" : "text-slate-400"}` }, "Login")), authError && /* @__PURE__ */ React.createElement("div", { className: "p-2 mb-3 text-xs text-red-400 bg-red-500/10 rounded" }, authError), authTab === "signup" ? /* @__PURE__ */ React.createElement("form", { onSubmit: handleSignup, className: "flex flex-col gap-3" }, /* @__PURE__ */ React.createElement("input", { type: "text", required: true, placeholder: "Poora Naam", value: signupForm.name, onChange: (e) => setSignupForm({ ...signupForm, name: e.target.value }), className: "px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border", style: { borderColor: COLORS.inkBorder } }), /* @__PURE__ */ React.createElement("input", { type: "tel", required: true, placeholder: "Mobile Number", value: signupForm.phone, onChange: (e) => setSignupForm({ ...signupForm, phone: e.target.value }), className: "px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border", style: { borderColor: COLORS.inkBorder } }), /* @__PURE__ */ React.createElement("input", { type: "password", required: true, placeholder: "Password", value: signupForm.password, onChange: (e) => setSignupForm({ ...signupForm, password: e.target.value }), className: "px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border", style: { borderColor: COLORS.inkBorder } }), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "py-3 rounded-full font-bold bg-amber-500 text-black text-xs mt-1" }, "Account Banao")) : /* @__PURE__ */ React.createElement("form", { onSubmit: handleLogin, className: "flex flex-col gap-3" }, /* @__PURE__ */ React.createElement("input", { type: "tel", required: true, placeholder: "Mobile Number", value: loginForm.phone, onChange: (e) => setLoginForm({ ...loginForm, phone: e.target.value }), className: "px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border", style: { borderColor: COLORS.inkBorder } }), /* @__PURE__ */ React.createElement("input", { type: "password", required: true, placeholder: "Password", value: loginForm.password, onChange: (e) => setLoginForm({ ...loginForm, password: e.target.value }), className: "px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border", style: { borderColor: COLORS.inkBorder } }), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "py-3 rounded-full font-bold bg-amber-500 text-black text-xs mt-1" }, "Login Karo")))), activeTask && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75", onClick: closeTask }, /* @__PURE__ */ React.createElement("div", { className: "w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 border", style: { backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder }, onClick: (e) => e.stopPropagation() }, taskStage === "confirm" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-lg mb-1" }, activeTask.title), /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-4", style: { color: COLORS.paperDim } }, activeTask.desc), /* @__PURE__ */ React.createElement("button", { onClick: startTask, className: "w-full py-3 rounded-full font-bold bg-amber-500 text-black text-xs" }, "Task Complete & Reward Claim Karo")), taskStage === "progress" && /* @__PURE__ */ React.createElement("div", { className: "py-6 text-center text-xs" }, "Verifying with Server\u2026"), taskStage === "done" && /* @__PURE__ */ React.createElement("div", { className: "py-4 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold text-base mb-1" }, "Task Completed!"), /* @__PURE__ */ React.createElement("p", { className: "mono-num text-xl text-emerald-400 font-bold mb-4" }, "+", inr(activeTask.reward)), /* @__PURE__ */ React.createElement("button", { onClick: closeTask, className: "w-full py-2.5 rounded-full font-bold bg-amber-500 text-black text-xs" }, "Wallet Dekho")))), showWithdraw && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75", onClick: () => setShowWithdraw(false) }, /* @__PURE__ */ React.createElement("div", { className: "w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 border", style: { backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder }, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-lg mb-3" }, "UPI Withdraw Request"), !withdrawDone ? /* @__PURE__ */ React.createElement("form", { onSubmit: handleWithdrawSubmit, className: "flex flex-col gap-3" }, withdrawError && /* @__PURE__ */ React.createElement("div", { className: "p-2 text-xs text-red-400 bg-red-500/10 rounded" }, withdrawError), /* @__PURE__ */ React.createElement("input", { type: "text", required: true, placeholder: "Aapki UPI ID (rahul@upi)", value: withdrawUpi, onChange: (e) => setWithdrawUpi(e.target.value), className: "px-3.5 py-2.5 rounded-xl bg-slate-900 border text-xs", style: { borderColor: COLORS.inkBorder } }), /* @__PURE__ */ React.createElement("input", { type: "number", min: "100", required: true, placeholder: "Amount (Min \u20B9100)", value: withdrawAmount, onChange: (e) => setWithdrawAmount(e.target.value), className: "px-3.5 py-2.5 rounded-xl bg-slate-900 border text-xs mono-num", style: { borderColor: COLORS.inkBorder } }), /* @__PURE__ */ React.createElement("button", { type: "submit", disabled: withdrawLoading, className: "py-3 rounded-full font-bold bg-amber-500 text-black text-xs mt-1" }, "Request Bhejo")) : /* @__PURE__ */ React.createElement("div", { className: "py-4 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold text-base mb-1" }, "Request Submitted!"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-400 mb-4" }, "Admin Control se approve mark ho jaayega."), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowWithdraw(false), className: "w-full py-2.5 rounded-full font-bold bg-amber-500 text-black text-xs" }, "Done")))), showAdmin && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85", onClick: () => setShowAdmin(false) }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 border bg-[#111729]", style: { borderColor: COLORS.gold }, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-4 pb-3 border-b border-slate-800" }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-lg text-white" }, "Admin Control & Postback Simulator"), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowAdmin(false) }, /* @__PURE__ */ React.createElement(X, { size: 18, color: COLORS.muted }))), adminStats && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded-xl bg-slate-900 border border-slate-800" }, /* @__PURE__ */ React.createElement("p", { className: "text-slate-400" }, "Total Users"), /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold" }, adminStats.totalUsers)), /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded-xl bg-slate-900 border border-slate-800" }, /* @__PURE__ */ React.createElement("p", { className: "text-slate-400" }, "User Balance"), /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-emerald-400" }, inr(adminStats.totalWalletBalance))), /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded-xl bg-slate-900 border border-slate-800" }, /* @__PURE__ */ React.createElement("p", { className: "text-slate-400" }, "Pending Requests"), /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-amber-400" }, adminStats.pendingWithdrawalsCount)), /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded-xl bg-slate-900 border border-slate-800" }, /* @__PURE__ */ React.createElement("p", { className: "text-slate-400" }, "Total Paid Out"), /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-blue-400" }, inr(adminStats.totalPaidOut)))), /* @__PURE__ */ React.createElement("div", { className: "p-4 mb-4 rounded-2xl bg-slate-900 border border-slate-800" }, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-xs text-amber-400 mb-2" }, "Simulate Survey Postback"), /* @__PURE__ */ React.createElement("form", { onSubmit: handleAdminSimulatePostback, className: "grid grid-cols-1 sm:grid-cols-3 gap-2" }, /* @__PURE__ */ React.createElement("input", { type: "text", placeholder: "User ID / Phone", value: simPhone, onChange: (e) => setSimPhone(e.target.value), className: "p-2 rounded text-xs bg-slate-950 border border-slate-800" }), /* @__PURE__ */ React.createElement("input", { type: "number", placeholder: "Gross Amount (\u20B9)", value: simAmount, onChange: (e) => setSimAmount(e.target.value), className: "p-2 rounded text-xs bg-slate-950 border border-slate-800" }), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "p-2 rounded text-xs font-bold bg-amber-500 text-black" }, "Trigger Postback")), simMsg && /* @__PURE__ */ React.createElement("p", { className: "text-xs text-emerald-400 font-semibold mt-2" }, simMsg)), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-xs text-white mb-2" }, "Pending & Processed Payouts"), adminWithdrawals.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "Koi withdrawal request nahi hai.") : /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-2 max-h-[220px] overflow-y-auto" }, adminWithdrawals.map((w) => /* @__PURE__ */ React.createElement("div", { key: w.id, className: "p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-white" }, w.userName), " (", w.userPhone, ") \xB7 ", /* @__PURE__ */ React.createElement("span", { className: "font-mono text-amber-400" }, w.upiId), /* @__PURE__ */ React.createElement("p", { className: "text-slate-500 text-[10px]" }, new Date(w.createdAt).toLocaleString(), " \xB7 Status: ", /* @__PURE__ */ React.createElement("span", { className: "font-bold uppercase text-amber-400" }, w.status))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-sm text-emerald-400" }, inr(w.amount)), w.status === "pending" && /* @__PURE__ */ React.createElement("button", { onClick: () => updateWithdrawalStatus(w.id, "completed"), className: "px-3 py-1 rounded bg-emerald-500 text-black font-bold" }, "Approve"))))))), /* @__PURE__ */ React.createElement("div", { className: "fixed bottom-0 left-0 right-0 z-40 bg-[#111729] border-t border-[#232C48] flex items-center justify-around py-2 sm:hidden shadow-lg" }, /* @__PURE__ */ React.createElement("a", { href: "#kaise", onClick: () => setActiveTab("home"), className: `flex flex-col items-center gap-1 text-[10px] font-medium ${activeTab === "home" ? "text-amber-400" : "text-slate-400"}` }, /* @__PURE__ */ React.createElement(Home, { size: 18 }), /* @__PURE__ */ React.createElement("span", null, "Home")), /* @__PURE__ */ React.createElement("a", { href: "#tasks", onClick: () => setActiveTab("tasks"), className: `flex flex-col items-center gap-1 text-[10px] font-medium ${activeTab === "tasks" ? "text-amber-400" : "text-slate-400"}` }, /* @__PURE__ */ React.createElement(LayoutGrid, { size: 18 }), /* @__PURE__ */ React.createElement("span", null, "Tasks")), /* @__PURE__ */ React.createElement("a", { href: "#wallet", onClick: () => setActiveTab("wallet"), className: `flex flex-col items-center gap-1 text-[10px] font-medium ${activeTab === "wallet" ? "text-amber-400" : "text-slate-400"}` }, /* @__PURE__ */ React.createElement(Wallet, { size: 18 }), /* @__PURE__ */ React.createElement("span", null, "Wallet")), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setActiveTab("admin");
    openAdminPanel();
  }, className: `flex flex-col items-center gap-1 text-[10px] font-medium ${activeTab === "admin" ? "text-amber-400" : "text-slate-400"}` }, /* @__PURE__ */ React.createElement(ShieldCheck, { size: 18 }), /* @__PURE__ */ React.createElement("span", null, "Admin"))));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
