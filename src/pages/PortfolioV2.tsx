import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_ITEMS = ["About", "Experience", "Projects", "Education", "Contact"];

const ROLES = ["ComfyUI Engineer", "LLM Systems Builder", "Full-Stack Developer", "GenAI Researcher"];

const SKILLS_ROW1 = ["Python", "TypeScript", "React", "ComfyUI", "LLMs", "GenAI", "Python", "TypeScript", "React", "ComfyUI", "LLMs", "GenAI"];
const SKILLS_ROW2 = ["Next.js", "FastAPI", "Gemini", "Node.js", "WAN 2.1", "LoRA", "Next.js", "FastAPI", "Gemini", "Node.js", "WAN 2.1", "LoRA"];

const EXPERIENCE = [
  { role: "Workflow Engineer", org: "ShopOS", type: "Self-employed", period: "Jun 2025 – Present", desc: "Building AI workflow systems for creative and e-commerce use cases.", tag: "AI ENGINEERING", color: "#7c3aed" },
  { role: "Summer Research Intern", org: "Zhejiang University", type: "Internship", period: "May – Jun 2025", desc: "Applied research in control systems and intelligent engineering workflows.", tag: "RESEARCH", color: "#ef4444" },
  { role: "Technical Head", org: "Graphic Cafe – NIT Andhra", type: "Full-time", period: "Oct 2024 – May 2025", desc: "Led technical execution and event systems for campus media initiatives.", tag: "LEADERSHIP", color: "#f59e0b" },
  { role: "Sponsorship Lead", org: "TEDx NIT Andhra Pradesh", type: "Full-time", period: "May – Nov 2024", desc: "Drove sponsor outreach and partnership execution for flagship TEDx events.", tag: "PARTNERSHIPS", color: "#06b6d4" },
  { role: "Summer Intern", org: "IIT (BHU), Varanasi", type: "Internship", period: "May – Jul 2024", desc: "Catalyst characterization via X-ray diffraction and TPR analysis.", tag: "CHEM + DATA", color: "#7c3aed" },
];

const PROJECTS = [
  { title: "AI Avatar Explainer Video", desc: "Fully automated AI avatar explainer pipeline using ComfyUI. Voice, avatar, and visuals generated from just a script.", tags: ["ComfyUI", "AI Avatar", "Video"], color: "#7c3aed", featured: true },
  { title: "India Demographic Insights", desc: "Interactive geospatial analytics dashboard visualizing Aadhaar demographic trends across Indian states.", tags: ["Next.js", "TypeScript", "Geospatial"], href: "https://github.com/sanjaymalladi/aadhaar-data-analysis", demo: "https://aadhaar-data-analysis.vercel.app/", color: "#06b6d4", featured: true },
  { title: "AI Ramp Walk", desc: "Generative video pipeline using WAN 2.1 and LoRA for fashion runway clips.", tags: ["Generative Video", "LoRA", "WAN 2.1"], href: "#", color: "#ef4444" },
  { title: "InfluencerFlow", desc: "AI-powered influencer discovery and outreach platform. Hackathon finalist.", tags: ["JavaScript", "AI", "Platform"], href: "https://github.com/sanjaymalladi/influencerflow", demo: "https://influencerflow.vercel.app/", color: "#f59e0b" },
  { title: "Cluely for Brands", desc: "Transform product images into stunning brand-specific marketing content with GenAI.", tags: ["TypeScript", "GenAI", "Marketing"], demo: "https://cluely-for-brands.vercel.app/", color: "#7c3aed" },
  { title: "AskAlgo", desc: "Socratic method AI tutor for data structures and algorithms powered by Gemini.", tags: ["JavaScript", "FastAPI", "Gemini"], demo: "https://askalgo.vercel.app/", color: "#06b6d4" },
  { title: "Echosphere", desc: "Social audio platform for real-time audio chat rooms. Hackathon finalist.", tags: ["TypeScript", "Social", "Audio"], demo: "https://echo-sphere-plan.vercel.app/", color: "#ef4444" },
  { title: "Career AI", desc: "AI-powered career platform with resume analysis and intelligent job matching.", tags: ["TypeScript", "Next.js", "AI"], demo: "https://portfolio-ai-gamma.vercel.app", color: "#f59e0b" },
  { title: "SanjayAI", desc: "Fetches and summarizes research papers from arXiv using NLP pipelines.", tags: ["Python", "NLP", "Research"], demo: "https://sanjayai.streamlit.app/", color: "#7c3aed" },
  { title: "Heat GPT", desc: "NDA — LLM-assisted heat exchanger analysis workflow. Research x Zhejiang University.", tags: ["NDA", "Research", "LLM"], color: "#555" },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const step = target / 60;
    let cur = 0;
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setV(target); clearInterval(id); } else setV(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{v}{suffix}</span>;
}

// ─── Morph Text (Vengeance UI Blur-Morph Word Rotation) ──────────────────────
function MorphText({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % words.length), 2800);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className="relative inline-block" style={{ minWidth: "22ch" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, filter: "blur(12px)", y: 12 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(12px)", y: -12 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ─── Animated Rays (Vengeance UI) ─────────────────────────────────────────────
function AnimatedRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radial conic rays */}
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(
            from 200deg at 50% 60%,
            transparent 0deg,
            rgba(124,58,237,0.07) 15deg,
            transparent 30deg,
            rgba(6,182,212,0.06) 55deg,
            transparent 70deg,
            rgba(124,58,237,0.05) 100deg,
            transparent 115deg,
            rgba(6,182,212,0.04) 140deg,
            transparent 160deg,
            rgba(245,158,11,0.04) 185deg,
            transparent 200deg,
            rgba(124,58,237,0.06) 240deg,
            transparent 260deg,
            rgba(6,182,212,0.05) 290deg,
            transparent 310deg,
            rgba(124,58,237,0.04) 340deg,
            transparent 360deg
          )`,
          animation: "rays-rotate 18s linear infinite",
        }}
      />
      {/* Aurora mesh orbs */}
      <div className="v2b-orb v2b-orb1" />
      <div className="v2b-orb v2b-orb2" />
      <div className="v2b-orb v2b-orb3" />
    </div>
  );
}

// ─── Fluid Morph Background (Vengeance UI) ────────────────────────────────────
function FluidMorphBg({ color = "#7c3aed" }: { color?: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      <div
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 20% 40%, ${color}22, transparent 60%),
                       radial-gradient(ellipse 60% 80% at 80% 60%, ${color}15, transparent 60%)`,
          animation: "morph-fluid 6s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}

// ─── Glow Border Card (Vengeance UI mouse-tracking glow) ─────────────────────
function GlowCard({ children, color = "#7c3aed", className = "", style = {} }: {
  children: React.ReactNode; color?: string; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: "50%", y: "0%" });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setGlow({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px` });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${className}`}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        ...style,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={e => {
        if (ref.current) {
          ref.current.style.borderColor = `${color}44`;
          ref.current.style.boxShadow = `0 0 40px ${color}18`;
          ref.current.style.transform = "translateY(-3px)";
        }
      }}
      onMouseLeave={e => {
        if (ref.current) {
          ref.current.style.borderColor = "rgba(255,255,255,0.07)";
          ref.current.style.boxShadow = "none";
          ref.current.style.transform = "translateY(0)";
        }
      }}
    >
      {/* Mouse-tracking radial glow */}
      <div
        className="absolute pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          inset: 0,
          background: `radial-gradient(350px circle at ${glow.x} ${glow.y}, ${color}14, transparent 70%)`,
        }}
      />
      {/* Top color strip */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}70, transparent)` }}
      />
      {children}
    </div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlowCard color={p.color} className="h-full" style={{ minHeight: 160 }}>
        <FluidMorphBg color={p.color} />
        <div className="relative z-10 p-5 flex flex-col h-full gap-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-black uppercase text-sm leading-snug text-white">{p.title}</h3>
            {(p.demo || p.href) && (
              <a
                href={p.demo || p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: p.color + "25", border: `1px solid ${p.color}50` }}
                onClick={e => e.stopPropagation()}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: p.color }}>
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            )}
          </div>
          <p className="text-xs leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.45)" }}>{p.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map(t => (
              <span key={t} className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md"
                style={{ background: p.color + "18", color: p.color, border: `1px solid ${p.color}35` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-10"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <span className="h-px w-8" style={{ background: "linear-gradient(90deg, #7c3aed, transparent)" }} />
      <span className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: "#7c3aed" }}>{children}</span>
    </motion.div>
  );
}

// ─── INLINE CSS ───────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Mono:wght@300;400;500&display=swap');

.v2b { font-family:'Syne',sans-serif; background:#07070e; color:#f0f0f8; overflow-x:hidden; }
.v2b-mono { font-family:'DM Mono',monospace; }

/* Aurora orbs */
@keyframes v2b-orb1 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(8%,6%) scale(1.1)} 70%{transform:translate(-5%,10%) scale(0.95)} }
@keyframes v2b-orb2 { 0%,100%{transform:translate(0,0) scale(1)} 35%{transform:translate(-9%,-5%) scale(1.08)} 65%{transform:translate(12%,-8%) scale(1.14)} }
@keyframes v2b-orb3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(5%,-10%) scale(1.12)} }
.v2b-orb { position:absolute; border-radius:50%; pointer-events:none; }
.v2b-orb1 { width:70vw; height:70vw; top:-25vw; left:-18vw; filter:blur(100px); background:radial-gradient(circle,rgba(124,58,237,0.28) 0%,transparent 65%); animation:v2b-orb1 16s ease-in-out infinite; }
.v2b-orb2 { width:60vw; height:60vw; top:-12vw; right:-20vw; filter:blur(90px); background:radial-gradient(circle,rgba(6,182,212,0.2) 0%,transparent 65%); animation:v2b-orb2 19s ease-in-out infinite; }
.v2b-orb3 { width:45vw; height:45vw; top:50vh; left:38vw; filter:blur(110px); background:radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 65%); animation:v2b-orb3 12s ease-in-out infinite; }

/* Animated rays */
@keyframes rays-rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

/* Fluid morph */
@keyframes morph-fluid { 0%{transform:scale(1) rotate(0deg)} 100%{transform:scale(1.15) rotate(8deg)} }

/* Dot grid */
.v2b-dots {
  background-image: radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px);
  background-size: 38px 38px;
}

/* Grain */
.v2b-grain::before {
  content:''; position:fixed; inset:0; pointer-events:none; z-index:9999; opacity:0.035;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Marquee */
@keyframes mq-fwd  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes mq-back { from{transform:translateX(-50%)} to{transform:translateX(0)} }
.mq-fwd  { animation:mq-fwd  30s linear infinite; }
.mq-back { animation:mq-back 25s linear infinite; }

/* Pulse dot */
@keyframes pls { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.75)} }
.pls { animation:pls 2s ease-in-out infinite; }

/* Scroll beam */
@keyframes beam { 0%{top:-100%;opacity:.9} 80%{top:120%;opacity:.9} 100%{top:120%;opacity:0} }
.beam { animation:beam 1.8s ease-in infinite; }

/* Nav spring */
.nav-active { background:rgba(124,58,237,0.25); border:1px solid rgba(124,58,237,0.4); border-radius:9999px; }

/* Number shimmer */
@keyframes sh { 0%{background-position:-200% center} 100%{background-position:200% center} }
.sh-num {
  background:linear-gradient(90deg,#fff 25%,#7c3aed 50%,#06b6d4 65%,#fff 80%);
  background-size:200% auto;
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  animation:sh 3s linear infinite;
}
`;

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function PortfolioV2() {
  const [active, setActive] = useState("about");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOp = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 },
    );
    NAV_ITEMS.forEach(n => { const el = document.getElementById(n.toLowerCase()); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = CSS;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  const featured = PROJECTS.filter(p => p.featured);
  const rest = PROJECTS.filter(p => !p.featured);

  return (
    <div className="v2b v2b-grain min-h-screen">

      {/* ══ Floating Glass Nav (Vengeance UI Glass Dock) ══════════════════════ */}
      <nav className="fixed top-5 left-1/2 z-50" style={{ transform: "translateX(-50%)" }}>
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-0.5 px-2 py-2 rounded-full"
          style={{
            background: "rgba(10,10,20,0.8)",
            backdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {NAV_ITEMS.map(item => {
            const isActive = active === item.toLowerCase();
            return (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="relative px-4 py-1.5 text-[13px] rounded-full font-medium transition-colors duration-200"
                style={{ color: isActive ? "white" : "rgba(255,255,255,0.4)" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-v2b"
                    className="absolute inset-0 nav-active"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            );
          })}
        </motion.div>
      </nav>

      {/* ══ HERO — Animated Rays + Aurora + Split layout ══════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden v2b-dots"
        style={{ paddingTop: 80 }}
      >
        <AnimatedRays />

        {/* Fine grid lines over rays */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} />

        <motion.div
          style={{ y: heroY, opacity: heroOp }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[80vh]">

            {/* Left: Text */}
            <div>
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full v2b-mono text-xs"
                style={{ background: "rgba(124,58,237,0.14)", border: "1px solid rgba(124,58,237,0.35)", color: "#a78bfa" }}
              >
                <span className="w-2 h-2 rounded-full bg-violet-400 pls" />
                Available · GenAI & Web Engineer
              </motion.div>

              {/* Name — Vengeance UI Animated Rays heading reveal */}
              <div className="overflow-hidden mb-4">
                <motion.h1
                  className="font-black uppercase leading-[0.9]"
                  style={{ fontSize: "clamp(56px, 9vw, 120px)", letterSpacing: "-0.025em" }}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span style={{
                    background: "linear-gradient(155deg, #ffffff 40%, rgba(255,255,255,0.5))",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>Sanjay</span>
                  <br />
                  <span style={{
                    background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>Malladi</span>
                </motion.h1>
              </div>

              {/* Morph Text role — Vengeance UI Morph Text */}
              <motion.div
                className="text-lg v2b-mono mb-10 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                <span className="text-sm">I'm a</span>
                <MorphText words={ROLES} />
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex items-center gap-4 flex-wrap mb-12"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <button
                  onClick={() => scrollTo("Contact")}
                  className="px-7 py-3 rounded-full text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    boxShadow: "0 0 28px rgba(124,58,237,0.5)",
                    transition: "box-shadow 0.3s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 50px rgba(124,58,237,0.8)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 28px rgba(124,58,237,0.5)")}
                >
                  Get in Touch ↗
                </button>
                <button
                  onClick={() => scrollTo("Projects")}
                  className="px-7 py-3 rounded-full text-sm font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.65)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                >
                  View Projects
                </button>
              </motion.div>

              {/* Stats — Vengeance UI Animated Number */}
              <motion.div
                className="flex items-center gap-10 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                {[{ n: 57, label: "Repos" }, { n: 8, label: "Hackathons" }, { n: 2, label: "Degrees" }].map(s => (
                  <div key={s.label}>
                    <div className="text-3xl font-black leading-none sh-num">
                      <Counter target={s.n} suffix="+" />
                    </div>
                    <div className="v2b-mono text-[10px] uppercase tracking-[0.22em] mt-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Photo (Vengeance UI image reveal + scatter effect) */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glow behind photo */}
              <div className="absolute -inset-8 rounded-3xl opacity-40" style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(6,182,212,0.25))",
                filter: "blur(40px)",
                transform: "translate(10px, 16px) scale(0.95)",
              }} />

              {/* Clip-path reveal container */}
              <motion.div
                className="relative rounded-2xl overflow-hidden w-full max-w-sm mx-auto"
                style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                initial={{ clipPath: "inset(0 100% 0 0 round 16px)" }}
                animate={{ clipPath: "inset(0 0% 0 0 round 16px)" }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src="/assests/main.png"
                  alt="Sanjay Malladi"
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/5" }}
                />
                {/* Gradient overlay from bottom */}
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(7,7,14,0.9) 0%, rgba(7,7,14,0.3) 40%, transparent 70%)"
                }} />
                {/* Caption */}
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-black text-xl uppercase text-white">Sanjay Malladi</p>
                  <p className="v2b-mono text-xs mt-1 opacity-60">GenAI Engineer · NIT Andhra Pradesh</p>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-2 -right-2 px-3 py-1.5 rounded-full v2b-mono text-xs font-bold text-white z-20"
                style={{ background: "rgba(124,58,237,0.95)", border: "1px solid rgba(124,58,237,0.5)", boxShadow: "0 0 20px rgba(124,58,237,0.5)" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 280 }}
              >
                🟢 Available
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2 px-3 py-1.5 rounded-full v2b-mono text-xs font-bold z-20"
                style={{ background: "rgba(6,182,212,0.18)", border: "1px solid rgba(6,182,212,0.4)", color: "#06b6d4" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1, type: "spring", stiffness: 280 }}
              >
                57+ GitHub Repos
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 z-10"
          style={{ transform: "translateX(-50%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="v2b-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.2)" }}>Scroll</span>
          <div className="w-px h-14 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div className="absolute w-full h-7 beam" style={{ background: "linear-gradient(to bottom, transparent, #7c3aed, #06b6d4)" }} />
          </div>
        </motion.div>
      </section>

      {/* ══ DUAL MARQUEE (AnimMaster Infinite Ticker) ════════════════════════ */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="overflow-hidden py-3 select-none">
          <div className="mq-fwd flex gap-10" style={{ width: "max-content" }}>
            {SKILLS_ROW1.map((s, i) => (
              <span key={i} className="v2b-mono text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 whitespace-nowrap" style={{ color: "rgba(255,255,255,0.35)" }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: ["#7c3aed", "#06b6d4", "#f59e0b"][i % 3] }} />
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden py-3 select-none" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="mq-back flex gap-10" style={{ width: "max-content" }}>
            {SKILLS_ROW2.map((s, i) => (
              <span key={i} className="v2b-mono text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 whitespace-nowrap" style={{ color: "rgba(255,255,255,0.25)" }}>
                <span className="w-1 h-1 rounded-full inline-block" style={{ background: ["#06b6d4", "#f59e0b", "#7c3aed"][i % 3] }} />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ ABOUT ════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionLabel>About</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.92] mb-7">
              Building the Future{" "}
              <span style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                With AI
              </span>
            </h2>
            <p className="mb-4 leading-relaxed text-[15px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              I'm a <strong className="text-white">ComfyUI Engineer at ShopOS</strong>, building AI-powered tools for creative workflows.
              With <strong className="text-white">57+ repositories</strong> and a passion for generative AI, I bridge complex ML systems and practical applications.
            </p>
            <p className="leading-relaxed text-[15px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              My expertise spans Python, TypeScript, React, and various AI/ML frameworks.
              I believe in building systems that are powerful, intuitive, and accessible.
            </p>
            <div className="grid grid-cols-4 gap-2 mt-8">
              {["Python", "TypeScript", "React", "ComfyUI", "LLMs", "Full-Stack", "GenAI", "APIs"].map((s, i) => (
                <motion.div key={s}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlowCard color="#7c3aed" className="px-2 py-2 text-center text-[11px] v2b-mono uppercase tracking-wider font-medium" style={{ color: "rgba(255,255,255,0.55)", borderRadius: 10 }}>
                    {s}
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <GlowCard color="#7c3aed" className="p-8">
              <FluidMorphBg color="#7c3aed" />
              <div className="relative z-10 grid grid-cols-2 gap-6">
                {[
                  { label: "GitHub Repos", value: 57, color: "#7c3aed" },
                  { label: "Projects", value: 10, color: "#06b6d4" },
                  { label: "Hackathons", value: 8, color: "#f59e0b" },
                  { label: "Degrees", value: 2, color: "#ef4444" },
                ].map(s => (
                  <div key={s.label} className="text-center py-4">
                    <div className="text-4xl font-black sh-num"><Counter target={s.value} suffix="+" /></div>
                    <div className="v2b-mono text-[10px] uppercase tracking-widest mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* ══ EXPERIENCE ═══════════════════════════════════════════════════════ */}
      <section id="experience" className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Experience</SectionLabel>
          <div className="space-y-3">
            {EXPERIENCE.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlowCard color={item.color}>
                  <div className="grid md:grid-cols-12">
                    <div className="md:col-span-3 p-5 flex flex-col gap-1.5" style={{ background: item.color + "14", borderRight: `1px solid ${item.color}22` }}>
                      <span className="v2b-mono text-[9px] uppercase tracking-[0.3em] font-medium" style={{ color: item.color }}>{item.tag}</span>
                      <h3 className="font-black text-base uppercase leading-tight text-white">{item.role}</h3>
                    </div>
                    <div className="md:col-span-9 p-5">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <p className="font-bold text-white text-sm">{item.org}</p>
                        <span className="v2b-mono text-[10px] whitespace-nowrap shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>{item.period}</span>
                      </div>
                      <p className="v2b-mono text-[10px] uppercase tracking-widest mb-2.5" style={{ color: "rgba(255,255,255,0.28)" }}>{item.type}</p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS — Vengeance UI Agent Bento Grid ════════════════════════ */}
      <section id="projects" className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <SectionLabel>Selected Work</SectionLabel>
              <p className="text-5xl font-black leading-none sh-num"><Counter target={57} />+ <span style={{ color: "rgba(255,255,255,0.15)", WebkitTextFillColor: "initial" }}>Repos</span></p>
            </div>
            <a href="https://github.com/sanjaymalladi" target="_blank" rel="noopener noreferrer"
              className="v2b-mono text-xs uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "white")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >
              GitHub ↗
            </a>
          </div>

          {/* Featured — 2 large cards */}
          <div className="grid md:grid-cols-2 gap-3 mb-3">
            {featured.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
          </div>

          {/* Rest — 3 col grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rest.map((p, i) => <ProjectCard key={p.title} p={p} i={i + 2} />)}
          </div>
        </div>
      </section>

      {/* ══ EDUCATION ════════════════════════════════════════════════════════ */}
      <section id="education" className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Education</SectionLabel>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { deg: "B.Tech Chemical Engineering", school: "NIT Andhra Pradesh", period: "2021 – 2025", color: "#ef4444" },
              { deg: "B.Sc Data Science", school: "IIT Madras", period: "2022 – 2024", color: "#7c3aed" },
              { deg: "High School", school: "Sasi Educational Institute", period: "2016 – 2020", color: "#f59e0b" },
            ].map((edu, i) => (
              <motion.div key={edu.deg} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}>
                <GlowCard color={edu.color} style={{ minHeight: 130 }}>
                  <FluidMorphBg color={edu.color} />
                  <div className="relative z-10 p-6 flex flex-col h-full gap-3">
                    <h3 className="font-black uppercase text-white text-sm leading-snug">{edu.deg}</h3>
                    <p className="text-xs flex-1" style={{ color: "rgba(255,255,255,0.4)" }}>{edu.school}</p>
                    <span className="v2b-mono text-[10px] px-2.5 py-1 rounded-full w-fit"
                      style={{ background: edu.color + "20", color: edu.color, border: `1px solid ${edu.color}40` }}>
                      {edu.period}
                    </span>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT — Vengeance UI Staggered Grid ════════════════════════════ */}
      <section id="contact" className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Contact</SectionLabel>
          <motion.h2
            className="text-5xl md:text-7xl font-black uppercase leading-[0.9] mb-14"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            Let's Work
            <br />
            <span style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Together
            </span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "GitHub", href: "https://github.com/sanjaymalladi", color: "#7c3aed", abbr: "GH" },
              { label: "LinkedIn", href: "https://linkedin.com/in/sanjaymalladi", color: "#06b6d4", abbr: "LI" },
              { label: "Email", href: "mailto:malladisanjay29@gmail.com", color: "#ef4444", abbr: "✉" },
              { label: "Instagram", href: "https://instagram.com/mrsanjaymalladi", color: "#f59e0b", abbr: "IG" },
            ].map((s, i) => (
              <motion.a
                key={s.label} href={s.href}
                target={s.href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ textDecoration: "none", display: "block" }}
              >
                <GlowCard color={s.color} className="group" style={{ minHeight: 130 }}>
                  <FluidMorphBg color={s.color} />
                  <div className="relative z-10 p-5 flex flex-col justify-between h-full gap-6">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black"
                      style={{ background: s.color + "25", color: s.color }}>
                      {s.abbr}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-black uppercase text-sm text-white">{s.label}</span>
                      <span className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: s.color }}>↗</span>
                    </div>
                  </div>
                </GlowCard>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer className="py-8 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="v2b-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2026 Sanjay Malladi · Built with intent
          </p>
          <a href="/" className="v2b-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>
            ← Back to V1
          </a>
        </div>
      </footer>

    </div>
  );
}
