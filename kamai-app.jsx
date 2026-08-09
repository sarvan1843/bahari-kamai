import { useState, useEffect, useRef } from "react";
import {
  Wallet, TrendingUp, CheckCircle2, Users, ShieldCheck, Smartphone,
  PlayCircle, ArrowRight, X, Clock, Menu, ClipboardCheck, Video,
  Share2, Store, ChevronRight, ChevronDown, Star, BadgeCheck, Lock,
  User, LogOut, Phone, KeyRound,
} from "lucide-react";

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
};

const TASKS = [
  { id: 1, title: "Shopping Habits Survey", type: "Survey", reward: 35, time: "8 min", done: "3,140", desc: "Roz-marra ki shopping ki pasand ke baare mein kuch sawal.", Icon: ClipboardCheck },
  { id: 2, title: "Naya Fitness App Try Karo", type: "App Install", reward: 60, time: "5 min", done: "1,802", desc: "App install karo, 2 din use karo, paisa pao.", Icon: Smartphone },
  { id: 3, title: "Product Video Dekho", type: "Video", reward: 15, time: "2 min", done: "6,410", desc: "30-second ka ek video dekho aur rate karo.", Icon: Video },
  { id: 4, title: "Dost ko Refer Karo", type: "Referral", reward: 100, time: "1 min", done: "982", desc: "Apna link share karo, dost signup kare to dono kamao.", Icon: Share2 },
  { id: 5, title: "Mobile Recharge Habits", type: "Survey", reward: 45, time: "10 min", done: "2,275", desc: "Recharge aur data plan ki pasand ke baare mein.", Icon: ClipboardCheck },
  { id: 6, title: "Local Business Review", type: "Task", reward: 50, time: "6 min", done: "1,116", desc: "Nearby shop ka Google review likho, screenshot bhejo.", Icon: Store },
];

const STEPS = [
  { n: "01", title: "Sign Up Karo", desc: "Sirf naam aur phone number se, 2 minute mein account ban jaata hai." },
  { n: "02", title: "Task Chuno", desc: "Survey, video, app install ya referral — jo pasand aaye woh chuno." },
  { n: "03", title: "Poora Karo", desc: "Task complete karo, hamara system verify karta hai ki sab sahi hua." },
  { n: "04", title: "Paisa Pao", desc: "Turant wallet mein credit, jab chaho seedha UPI ya bank mein withdraw karo." },
];

const TRUST = [
  { Icon: ShieldCheck, title: "Verified Partners", desc: "CPX Research, TheoremReach jaisi verified survey companies ke saath kaam." },
  { Icon: Lock, title: "Surakshit Payment", desc: "RBI-licensed payment gateway ke zariye seedha bank account/UPI mein withdrawal." },
  { Icon: TrendingUp, title: "Poora Hisaab Dikhta Hai", desc: "Har ek kamai ki entry wallet ledger mein saaf-saaf, real-time dikhti hai." },
];

const TESTIMONIALS = [
  { name: "Rahul Verma", city: "Indore", quote: "College ke baad free time mein surveys karta hoon, mahine ka thoda pocket money nikal aata hai.", rating: 5, tag: "Survey user" },
  { name: "Priya Nair", city: "Kochi", quote: "Referral wala part sabse accha laga — dost logon ko bataya, dono ko fayda hua.", rating: 5, tag: "Referral user" },
  { name: "Aman Sheikh", city: "Lucknow", quote: "Pehle withdrawal mein thoda darr tha, par UPI mein sahi time par paisa aa gaya.", rating: 4, tag: "App-install user" },
];

const FAQS = [
  { q: "Paisa kab wallet mein aata hai?", a: "Task verify hote hi, usually kuch second mein, reward automatically aapke wallet mein credit ho jaata hai." },
  { q: "Minimum withdrawal kitna hai?", a: "₹100 se withdraw start hota hai, seedha aapke UPI ID ya bank account mein." },
  { q: "Kya yeh safe hai?", a: "Sabhi survey/task partner verified companies hain, aur payment RBI-licensed payment gateway (Razorpay/Cashfree) ke through hota hai." },
  { q: "Kya KYC dena padega?", a: "Chhote withdrawal ke liye nahi, lekin ek limit (jaise ₹5,000/month) ke upar PAN-based KYC maanga jaata hai, jaisा RBI guidelines mein zaroori hai." },
];

const LIVE_FEED = [
  "Rahul V. ने अभी ₹45 कमाए — Survey",
  "Priya N. ने अभी ₹100 कमाए — Referral",
  "Aman S. ने अभी ₹15 कमाए — Video",
  "Sneha R. ने अभी ₹60 कमाए — App Install",
  "Vikram T. ने अभी ₹35 कमाए — Survey",
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
  return "₹" + n.toLocaleString("en-IN");
}

function Logo({ size = "text-2xl" }) {
  return (
    <span className={`font-black tracking-tight ${size}`} style={{ fontFamily: "'Fraunces', serif", color: COLORS.paper }}>
      Kama
      <span style={{ color: COLORS.gold }}>₹</span>
    </span>
  );
}

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill={i < n ? COLORS.gold : "transparent"} color={i < n ? COLORS.gold : COLORS.muted} />
      ))}
    </div>
  );
}

export default function KamaiApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [wallet, setWallet] = useState(0);
  const [ledger, setLedger] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [taskStage, setTaskStage] = useState("confirm");
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawDone, setWithdrawDone] = useState(false);
  const [feedIndex, setFeedIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState("signup");
  const [signupForm, setSignupForm] = useState({ name: "", phone: "", password: "" });
  const [loginForm, setLoginForm] = useState({ phone: "", password: "" });
  const aggregate = useCountUp(4835260);

  useEffect(() => {
    const t = setInterval(() => setFeedIndex((i) => (i + 1) % LIVE_FEED.length), 2600);
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => { clearInterval(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  function openTask(task) {
    setActiveTask(task);
    setTaskStage("confirm");
  }

  function startTask() {
    setTaskStage("progress");
    setTimeout(() => {
      setTaskStage("done");
      setWallet((w) => w + activeTask.reward);
      setLedger((l) => [{ id: Date.now(), title: activeTask.title, amount: activeTask.reward, time: "abhi" }, ...l]);
    }, 1400);
  }

  function closeTask() {
    setActiveTask(null);
    setTaskStage("confirm");
  }

  function handleSignup(e) {
    e.preventDefault();
    if (!signupForm.name || !signupForm.phone || !signupForm.password) return;
    setUser({ name: signupForm.name, phone: signupForm.phone });
    setShowAuth(false);
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!loginForm.phone || !loginForm.password) return;
    setUser({ name: loginForm.phone, phone: loginForm.phone });
    setShowAuth(false);
  }

  return (
    <div style={{ backgroundColor: COLORS.ink, color: COLORS.paper, fontFamily: "'Inter', sans-serif" }} className="min-h-screen w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .mono-num { font-family: 'IBM Plex Mono', monospace; }
        .display-font { font-family: 'Fraunces', serif; }
        @keyframes fadeSlide { 0% { opacity: 0; transform: translateY(6px); } 10% { opacity: 1; transform: translateY(0); } 90% { opacity: 1; } 100% { opacity: 0; transform: translateY(-6px); } }
        .feed-line { animation: fadeSlide 2.6s ease-in-out; }
        .card-hover { transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover { transform: translateY(-3px); border-color: rgba(232,169,61,0.4); box-shadow: 0 12px 32px rgba(0,0,0,0.35); }
        .btn-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .btn-lift:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(232,169,61,0.28); }
        @media (prefers-reduced-motion: reduce) {
          .feed-line { animation: none; }
          .card-hover, .btn-lift { transition: none; }
        }
      `}</style>

      {/* Demo banner */}
      <div className="w-full text-center py-1.5 px-4 text-xs font-medium" style={{ backgroundColor: COLORS.inkPanelAlt, color: COLORS.paperDim, borderBottom: `1px solid ${COLORS.line}` }}>
        Design prototype — payment aur survey-partner backend abhi live nahi hai
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-40 backdrop-blur transition-shadow"
        style={{
          borderBottom: `1px solid ${COLORS.line}`,
          backgroundColor: "rgba(10,14,27,0.88)",
          boxShadow: scrolled ? "0 8px 24px rgba(0,0,0,0.35)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: COLORS.paperDim }}>
            <a href="#kaise" className="hover:text-white transition-colors">Kaise Kaam Karta Hai</a>
            <a href="#tasks" className="hover:text-white transition-colors">Tasks</a>
            <a href="#wallet" className="hover:text-white transition-colors">Wallet</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: COLORS.inkPanelAlt }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: COLORS.gold, color: COLORS.ink }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium" style={{ color: COLORS.paper }}>{user.name}</span>
                </div>
                <button onClick={() => setUser(null)} className="p-2 rounded-full" style={{ color: COLORS.muted }} aria-label="Logout" title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button onClick={() => setShowAuth(true)} className="btn-lift px-5 py-2.5 rounded-full font-semibold text-sm" style={{ backgroundColor: COLORS.gold, color: COLORS.ink }}>
                Login / Sign Up
              </button>
            )}
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            <Menu size={24} color={COLORS.paper} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm font-medium" style={{ color: COLORS.paperDim }}>
            <a href="#kaise" onClick={() => setMenuOpen(false)}>Kaise Kaam Karta Hai</a>
            <a href="#tasks" onClick={() => setMenuOpen(false)}>Tasks</a>
            <a href="#wallet" onClick={() => setMenuOpen(false)}>Wallet</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
            {user ? (
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: COLORS.gold, color: COLORS.ink }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ color: COLORS.paper }}>{user.name}</span>
                </div>
                <button onClick={() => { setUser(null); setMenuOpen(false); }} className="text-xs font-semibold" style={{ color: COLORS.muted }}>Logout</button>
              </div>
            ) : (
              <button onClick={() => { setShowAuth(true); setMenuOpen(false); }} className="mt-1 px-5 py-2.5 rounded-full font-semibold" style={{ backgroundColor: COLORS.gold, color: COLORS.ink }}>
                Login / Sign Up
              </button>
            )}
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundImage: `radial-gradient(ellipse 60% 50% at 80% 0%, rgba(232,169,61,0.10), transparent)` }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5" style={{ backgroundColor: "rgba(52,211,153,0.10)", color: COLORS.mint }}>
              <BadgeCheck size={14} /> RBI-licensed payment partner
            </div>
            <h1 className="display-font font-black leading-[1.05] text-4xl sm:text-5xl lg:text-6xl mb-6">
              छोटे-छोटे tasks करो.
              <br />
              सीधे <span style={{ color: COLORS.gold }}>wallet</span> में पैसा पाओ.
            </h1>
            <p className="text-base sm:text-lg mb-8 max-w-md" style={{ color: COLORS.paperDim }}>
              Survey bharo, video dekho, dost ko refer karo — jab jitna time mile, utna kamao. Paisa seedha UPI mein withdraw karo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="#tasks" className="btn-lift inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold" style={{ backgroundColor: COLORS.gold, color: COLORS.ink }}>
                Tasks Dekho <ArrowRight size={18} />
              </a>
              <a href="#kaise" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold border" style={{ borderColor: COLORS.inkBorder, color: COLORS.paper }}>
                <PlayCircle size={18} /> Kaise Kaam Karta Hai
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm" style={{ color: COLORS.muted }}>
              <span className="flex items-center gap-1.5"><Users size={15} /> 52,400+ users</span>
              <span className="flex items-center gap-1.5"><Wallet size={15} /> ₹48L+ paid out</span>
              <span className="flex items-center gap-1.5"><Star size={15} fill={COLORS.gold} color={COLORS.gold} /> 4.6 average rating</span>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[300px] rounded-[2.2rem] p-3" style={{ backgroundColor: "#05070F", border: `1px solid ${COLORS.inkBorder}`, boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}>
              <div className="rounded-[1.6rem] overflow-hidden" style={{ backgroundColor: COLORS.inkPanel }}>
                <div className="flex justify-center pt-2.5 pb-1">
                  <div className="w-16 h-1.5 rounded-full" style={{ backgroundColor: COLORS.inkBorder }} />
                </div>
                <div className="px-5 pb-6 pt-2">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: COLORS.muted }}>
                    Ab tak users ne kamaye
                  </p>
                  <p className="mono-num font-bold text-3xl mb-5" style={{ color: COLORS.mint }}>
                    {inr(aggregate)}
                  </p>
                  <div className="h-px w-full mb-4" style={{ backgroundColor: COLORS.line }} />
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COLORS.muted }}>
                    Live Activity
                  </p>
                  <div className="h-12 flex items-center mb-4">
                    <p key={feedIndex} className="feed-line text-sm font-medium" style={{ color: COLORS.paperDim }}>
                      {LIVE_FEED[feedIndex]}
                    </p>
                  </div>
                  <div className="rounded-2xl p-4" style={{ backgroundColor: COLORS.inkPanelAlt }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold" style={{ color: COLORS.paperDim }}>Shopping Survey</span>
                      <span className="mono-num text-sm font-bold" style={{ color: COLORS.gold }}>{inr(35)}</span>
                    </div>
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: COLORS.inkBorder }}>
                      <div className="h-2 rounded-full" style={{ width: "70%", backgroundColor: COLORS.mint }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner strip */}
      <section className="border-y" style={{ borderColor: COLORS.line }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: COLORS.muted }}>Task partners:</span>
          {["CPX Research", "TheoremReach", "Razorpay", "Cashfree"].map((p) => (
            <span key={p} className="text-sm font-semibold" style={{ color: COLORS.paperDim }}>{p}</span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="kaise" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="display-font font-bold text-3xl sm:text-4xl mb-2">Kaise Kaam Karta Hai</h2>
        <p className="mb-10" style={{ color: COLORS.paperDim }}>Chaar simple steps, shuru se lekar paise haath mein aane tak.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="card-hover rounded-2xl p-6 border" style={{ backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder }}>
              <p className="mono-num font-bold text-3xl mb-4" style={{ color: COLORS.gold }}>{s.n}</p>
              <h3 className="font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-sm" style={{ color: COLORS.paperDim }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tasks */}
      <section id="tasks" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="display-font font-bold text-3xl sm:text-4xl mb-2">Aaj Ke Tasks</h2>
            <p style={{ color: COLORS.paperDim }}>Jo pasand aaye, woh shuru karo. Click karke dekho kaise kaam karta hai.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TASKS.map((t) => (
            <div key={t.id} className="card-hover rounded-2xl p-6 border flex flex-col justify-between" style={{ backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder }}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl" style={{ backgroundColor: COLORS.inkPanelAlt }}>
                    <t.Icon size={20} color={COLORS.mint} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ color: COLORS.gold, backgroundColor: "rgba(232,169,61,0.12)" }}>
                    {t.type}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1.5">{t.title}</h3>
                <p className="text-sm mb-3" style={{ color: COLORS.paperDim }}>{t.desc}</p>
                <p className="text-xs mb-4 flex items-center gap-1.5" style={{ color: COLORS.muted }}>
                  <Users size={13} /> {t.done} logon ne complete kiya
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4 text-sm" style={{ color: COLORS.muted }}>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {t.time}</span>
                  <span className="mono-num font-bold text-base" style={{ color: COLORS.mint }}>{inr(t.reward)}</span>
                </div>
                <button onClick={() => openTask(t)} className="btn-lift w-full py-3 rounded-full font-bold text-sm" style={{ backgroundColor: COLORS.gold, color: COLORS.ink }}>
                  Shuru Karo
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wallet */}
      <section id="wallet" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="display-font font-bold text-3xl sm:text-4xl mb-10">Aapka Wallet</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 rounded-3xl p-7 border flex flex-col justify-between" style={{ backgroundColor: COLORS.inkPanelAlt, borderColor: COLORS.inkBorder }}>
            <div>
              <div className="flex items-center gap-2 mb-3" style={{ color: COLORS.paperDim }}>
                <Wallet size={18} />
                <span className="text-sm font-semibold">Available Balance</span>
              </div>
              <p className="mono-num font-black text-4xl sm:text-5xl mb-6" style={{ color: COLORS.paper }}>{inr(wallet)}</p>
            </div>
            <button
              onClick={() => { setShowWithdraw(true); setWithdrawDone(false); }}
              disabled={wallet === 0}
              className="btn-lift w-full py-3.5 rounded-full font-bold text-sm disabled:opacity-40"
              style={{ backgroundColor: COLORS.gold, color: COLORS.ink }}
            >
              Withdraw Karo
            </button>
            {wallet === 0 && <p className="text-xs mt-3" style={{ color: COLORS.muted }}>Pehle koi task poora karo, phir withdraw karne layak balance banega.</p>}
          </div>

          <div className="lg:col-span-2 rounded-3xl p-7 border" style={{ backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder }}>
            <p className="text-sm font-semibold mb-4" style={{ color: COLORS.paperDim }}>Ledger</p>
            {ledger.length === 0 ? (
              <p className="text-sm py-8 text-center" style={{ color: COLORS.muted }}>Abhi koi kamai nahi hui. Ek task shuru karke dekho.</p>
            ) : (
              <div className="flex flex-col divide-y" style={{ borderColor: COLORS.line }}>
                {ledger.map((entry) => (
                  <div key={entry.id} className="py-3.5 flex items-center justify-between" style={{ borderColor: COLORS.line }}>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={18} color={COLORS.mint} />
                      <div>
                        <p className="font-medium text-sm">{entry.title}</p>
                        <p className="text-xs" style={{ color: COLORS.muted }}>{entry.time}</p>
                      </div>
                    </div>
                    <span className="mono-num font-bold" style={{ color: COLORS.mint }}>{entry.amount > 0 ? "+" + inr(entry.amount) : "—"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TRUST.map((t) => (
            <div key={t.title} className="card-hover rounded-2xl p-6 border" style={{ backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder }}>
              <t.Icon size={22} color={COLORS.gold} className="mb-3" />
              <h3 className="font-bold mb-1.5">{t.title}</h3>
              <p className="text-sm" style={{ color: COLORS.paperDim }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="display-font font-bold text-3xl sm:text-4xl mb-10">Users Kya Kehte Hain</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card-hover rounded-2xl p-6 border" style={{ backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder }}>
              <Stars n={t.rating} />
              <p className="text-sm my-4" style={{ color: COLORS.paperDim }}>"{t.quote}"</p>
              <div className="flex items-center justify-between text-xs" style={{ color: COLORS.muted }}>
                <span className="font-semibold" style={{ color: COLORS.paper }}>{t.name} · {t.city}</span>
                <span>{t.tag}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-4" style={{ color: COLORS.muted }}>Illustrative reviews — design demo ke liye.</p>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="display-font font-bold text-3xl sm:text-4xl mb-10">Aksar Poochhe Jaane Wale Sawal</h2>
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <div key={f.q} className="rounded-2xl border overflow-hidden" style={{ backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full flex items-center justify-between text-left px-5 py-4 font-semibold text-sm sm:text-base"
              >
                {f.q}
                <ChevronDown size={18} style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s ease", color: COLORS.muted }} />
              </button>
              {openFaq === i && (
                <p className="px-5 pb-5 text-sm" style={{ color: COLORS.paperDim }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t" style={{ borderColor: COLORS.line }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="col-span-2 sm:col-span-1">
            <Logo size="text-xl" />
            <p className="text-xs mt-3" style={{ color: COLORS.muted }}>Apne time se kamane ka sabse aasaan tareeka.</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COLORS.muted }}>Company</p>
            <div className="flex flex-col gap-2 text-sm" style={{ color: COLORS.paperDim }}>
              <a href="#" className="hover:text-white">Hamare Baare Mein</a>
              <a href="#" className="hover:text-white">Careers</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COLORS.muted }}>Support</p>
            <div className="flex flex-col gap-2 text-sm" style={{ color: COLORS.paperDim }}>
              <a href="#" className="hover:text-white">Help Center</a>
              <a href="#" className="hover:text-white">Contact Karo</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COLORS.muted }}>Legal</p>
            <div className="flex flex-col gap-2 text-sm" style={{ color: COLORS.paperDim }}>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
          <p className="text-xs" style={{ color: COLORS.muted }}>
            Yeh ek UI prototype hai. Asli app mein payment (Razorpay/Cashfree) aur survey partners (CPX Research, TheoremReach) ka backend alag se connect karna hoga.
          </p>
        </div>
      </footer>

      {/* Auth modal */}
      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} onClick={() => setShowAuth(false)}>
          <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 border" style={{ backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <Logo size="text-xl" />
              <button onClick={() => setShowAuth(false)} aria-label="Band karo">
                <X size={22} color={COLORS.muted} />
              </button>
            </div>

            <div className="flex rounded-full p-1 mb-6" style={{ backgroundColor: COLORS.inkPanelAlt }}>
              <button
                onClick={() => setAuthTab("signup")}
                className="flex-1 py-2 rounded-full text-sm font-semibold transition-colors"
                style={authTab === "signup" ? { backgroundColor: COLORS.gold, color: COLORS.ink } : { color: COLORS.paperDim }}
              >
                Sign Up
              </button>
              <button
                onClick={() => setAuthTab("login")}
                className="flex-1 py-2 rounded-full text-sm font-semibold transition-colors"
                style={authTab === "login" ? { backgroundColor: COLORS.gold, color: COLORS.ink } : { color: COLORS.paperDim }}
              >
                Login
              </button>
            </div>

            {authTab === "signup" ? (
              <form onSubmit={handleSignup} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 mb-2" style={{ color: COLORS.muted }}>
                    <User size={13} /> Poora Naam
                  </label>
                  <input
                    type="text" required placeholder="Jaise: Rahul Verma"
                    value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                    style={{ backgroundColor: COLORS.inkPanelAlt, color: COLORS.paper, border: `1px solid ${COLORS.inkBorder}` }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 mb-2" style={{ color: COLORS.muted }}>
                    <Phone size={13} /> Mobile Number
                  </label>
                  <input
                    type="tel" required placeholder="98XXXXXXXX"
                    value={signupForm.phone} onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                    style={{ backgroundColor: COLORS.inkPanelAlt, color: COLORS.paper, border: `1px solid ${COLORS.inkBorder}` }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 mb-2" style={{ color: COLORS.muted }}>
                    <KeyRound size={13} /> Password
                  </label>
                  <input
                    type="password" required placeholder="Kam se kam 6 characters"
                    value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                    style={{ backgroundColor: COLORS.inkPanelAlt, color: COLORS.paper, border: `1px solid ${COLORS.inkBorder}` }}
                  />
                </div>
                <button type="submit" className="btn-lift w-full py-3.5 rounded-full font-bold mt-2" style={{ backgroundColor: COLORS.gold, color: COLORS.ink }}>
                  Account Banao
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 mb-2" style={{ color: COLORS.muted }}>
                    <Phone size={13} /> Mobile Number
                  </label>
                  <input
                    type="tel" required placeholder="98XXXXXXXX"
                    value={loginForm.phone} onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                    style={{ backgroundColor: COLORS.inkPanelAlt, color: COLORS.paper, border: `1px solid ${COLORS.inkBorder}` }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 mb-2" style={{ color: COLORS.muted }}>
                    <KeyRound size={13} /> Password
                  </label>
                  <input
                    type="password" required placeholder="Apna password"
                    value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                    style={{ backgroundColor: COLORS.inkPanelAlt, color: COLORS.paper, border: `1px solid ${COLORS.inkBorder}` }}
                  />
                </div>
                <button type="submit" className="btn-lift w-full py-3.5 rounded-full font-bold mt-2" style={{ backgroundColor: COLORS.gold, color: COLORS.ink }}>
                  Login Karo
                </button>
              </form>
            )}
            <p className="text-xs mt-5 text-center" style={{ color: COLORS.muted }}>
              Yeh demo login hai — asli app mein yeh neeche diye backend API se connect hoga.
            </p>
          </div>
        </div>
      )}

      {/* Task modal */}
      {activeTask && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} onClick={closeTask}>
          <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 border" style={{ backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div className="p-3 rounded-xl" style={{ backgroundColor: COLORS.inkPanelAlt }}>
                <activeTask.Icon size={22} color={COLORS.mint} />
              </div>
              <button onClick={closeTask} aria-label="Band karo">
                <X size={22} color={COLORS.muted} />
              </button>
            </div>

            {taskStage === "confirm" && (
              <>
                <h3 className="font-bold text-xl mb-2">{activeTask.title}</h3>
                <p className="text-sm mb-6" style={{ color: COLORS.paperDim }}>{activeTask.desc}</p>
                <div className="flex items-center justify-between mb-6 text-sm">
                  <span className="flex items-center gap-1.5" style={{ color: COLORS.muted }}><Clock size={14} /> {activeTask.time}</span>
                  <span className="mono-num font-bold text-lg" style={{ color: COLORS.mint }}>{inr(activeTask.reward)}</span>
                </div>
                <button onClick={startTask} className="btn-lift w-full py-3.5 rounded-full font-bold" style={{ backgroundColor: COLORS.gold, color: COLORS.ink }}>
                  Task Shuru Karo
                </button>
              </>
            )}

            {taskStage === "progress" && (
              <div className="py-10 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin mb-4" style={{ borderColor: COLORS.gold, borderTopColor: "transparent" }} />
                <p className="font-medium" style={{ color: COLORS.paperDim }}>Task verify ho raha hai…</p>
              </div>
            )}

            {taskStage === "done" && (
              <div className="py-6 flex flex-col items-center text-center">
                <CheckCircle2 size={40} color={COLORS.mint} className="mb-4" />
                <p className="font-bold text-lg mb-1">Task Poora Hua!</p>
                <p className="mono-num font-black text-2xl mb-6" style={{ color: COLORS.mint }}>+{inr(activeTask.reward)}</p>
                <button onClick={closeTask} className="btn-lift w-full py-3.5 rounded-full font-bold" style={{ backgroundColor: COLORS.gold, color: COLORS.ink }}>
                  Wallet Mein Dekho <ChevronRight size={16} className="inline" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Withdraw modal */}
      {showWithdraw && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} onClick={() => setShowWithdraw(false)}>
          <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 border" style={{ backgroundColor: COLORS.inkPanel, borderColor: COLORS.inkBorder }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <h3 className="font-bold text-xl">Withdraw Karo</h3>
              <button onClick={() => setShowWithdraw(false)} aria-label="Band karo">
                <X size={22} color={COLORS.muted} />
              </button>
            </div>

            {!withdrawDone ? (
              <>
                <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: COLORS.muted }}>UPI ID</label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  className="w-full mt-2 mb-4 px-4 py-3 rounded-xl outline-none text-sm"
                  style={{ backgroundColor: COLORS.inkPanelAlt, color: COLORS.paper, border: `1px solid ${COLORS.inkBorder}` }}
                />
                <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: COLORS.muted }}>Amount</label>
                <div className="w-full mt-2 mb-6 px-4 py-3 rounded-xl text-sm mono-num" style={{ backgroundColor: COLORS.inkPanelAlt, border: `1px solid ${COLORS.inkBorder}` }}>
                  {inr(wallet)} <span style={{ color: COLORS.muted }}>(poora balance)</span>
                </div>
                <button
                  onClick={() => { setWithdrawDone(true); setWallet(0); setLedger((l) => [{ id: Date.now(), title: "Withdraw request bheja gaya", amount: 0, time: "abhi" }, ...l]); }}
                  className="btn-lift w-full py-3.5 rounded-full font-bold"
                  style={{ backgroundColor: COLORS.gold, color: COLORS.ink }}
                >
                  Request Bhejo
                </button>
              </>
            ) : (
              <div className="py-6 flex flex-col items-center text-center">
                <CheckCircle2 size={40} color={COLORS.mint} className="mb-4" />
                <p className="font-bold text-lg mb-1">Request Queue Ho Gaya</p>
                <p className="text-sm mb-6" style={{ color: COLORS.paperDim }}>Asli app mein yeh 24-48 ghante mein UPI par aa jaayega.</p>
                <button onClick={() => setShowWithdraw(false)} className="btn-lift w-full py-3.5 rounded-full font-bold" style={{ backgroundColor: COLORS.gold, color: COLORS.ink }}>
                  Theek Hai
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
