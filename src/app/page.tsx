"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Dumbbell, Users, CreditCard, Package,
  BarChart3, Bell, ArrowRight, CheckCircle2,
  TrendingUp, Star, ChevronRight, Menu, X, Zap, Sun, Moon,
} from "lucide-react";

/* ── animated counter ── */
function useCounter(end: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

/* ── intersection observer ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── stat card ── */
function StatCard({ value, suffix, label, start }: {
  value: number; suffix: string; label: string; start: boolean;
}) {
  const count = useCounter(value, 1800, start);
  return (
    <div style={{ textAlign: "center", padding: "32px 16px" }}>
      <div style={{ fontSize: 44, fontWeight: 900, color: "var(--primary)", lineHeight: 1 }}>
        {count.toLocaleString("en-IN")}{suffix}
      </div>
      <div style={{ color: "var(--muted-foreground)", marginTop: 8, fontSize: 15 }}>{label}</div>
    </div>
  );
}

/* ── feature card ── */
function FeatureCard({ icon: Icon, title, desc, delay }: {
  icon: React.ElementType; title: string; desc: string; delay: number;
}) {
  const { ref, inView } = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "var(--card)",
        border: `1px solid ${hov ? "var(--primary)" : "var(--border)"}`,
        borderRadius: 16,
        padding: "28px 24px",
        transition: "all 0.25s ease",
        transform: inView ? (hov ? "translateY(-4px)" : "translateY(0)") : "translateY(20px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}ms`,
        boxShadow: hov ? "0 8px 24px rgba(34,197,94,0.10)" : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: hov ? "var(--primary)" : "var(--accent)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 18, transition: "background 0.25s",
      }}>
        <Icon size={22} color={hov ? "#fff" : "var(--accent-foreground)"} />
      </div>
      <h3 style={{ fontWeight: 700, fontSize: 17, color: "var(--card-foreground)", marginBottom: 8 }}>{title}</h3>
      <p style={{ color: "var(--muted-foreground)", lineHeight: 1.65, fontSize: 14 }}>{desc}</p>
    </div>
  );
}

/* ── testimonial card ── */
function TestiCard({ name, gym, quote, delay }: {
  name: string; gym: string; quote: string; delay: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: 16, padding: "28px 24px",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.5s ease ${delay}ms`,
    }}>
      <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
        {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="#22c55e" color="#22c55e" />)}
      </div>
      <p style={{ color: "var(--card-foreground)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>"{quote}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "var(--primary)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 700, fontSize: 15,
        }}>{name[0]}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--card-foreground)" }}>{name}</div>
          <div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{gym}</div>
        </div>
      </div>
    </div>
  );
}

/* ── dashboard mockup ── */
function DashboardMockup() {
  return (
    <div style={{
      background: "var(--card)", borderRadius: 20,
      border: "1px solid var(--border)",
      boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
      padding: 24, width: "100%", maxWidth: 380,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: "var(--card-foreground)" }}>Dashboard</span>
        <span style={{
          background: "var(--accent)", color: "var(--accent-foreground)",
          fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99,
        }}>● Live</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Members", val: "248", delta: "+12 this month" },
          { label: "Revenue", val: "₹1.2L", delta: "+8% vs last" },
          { label: "Renewals", val: "34", delta: "Due this week" },
        ].map((s) => (
          <div key={s.label} style={{
            background: "var(--muted)", borderRadius: 10,
            padding: "12px 10px", border: "1px solid var(--border)",
          }}>
            <div style={{ color: "var(--muted-foreground)", fontSize: 10, marginBottom: 4 }}>{s.label}</div>
            <div style={{ color: "var(--card-foreground)", fontWeight: 800, fontSize: 15 }}>{s.val}</div>
            <div style={{ color: "var(--primary)", fontSize: 10, marginTop: 2 }}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ color: "var(--muted-foreground)", fontSize: 11, marginBottom: 8 }}>Weekly Revenue</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 56 }}>
          {[55, 70, 48, 90, 65, 80, 58].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h}%`,
              background: i === 3 ? "var(--primary)" : "var(--accent)",
              borderRadius: "3px 3px 0 0",
            }} />
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
        {[
          { name: "Rahul Sharma", pkg: "3-Month Plan", status: "Active" },
          { name: "Priya Singh", pkg: "Annual Plan", status: "Active" },
          { name: "Arjun Mehta", pkg: "1-Month Plan", status: "Renew" },
        ].map((m) => (
          <div key={m.name} style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: 10,
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--card-foreground)" }}>{m.name}</div>
              <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{m.pkg}</div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99,
              background: m.status === "Active" ? "var(--accent)" : "#fef3c7",
              color: m.status === "Active" ? "var(--accent-foreground)" : "#d97706",
            }}>{m.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function HomePage() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsOn, setStatsOn] = useState(false);

  /* apply dark class to <html> */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @keyframes fadeUp {
        from { opacity:0; transform:translateY(24px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes float {
        0%,100% { transform:translateY(0); }
        50%      { transform:translateY(-10px); }
      }
      @keyframes spin-slow { to { transform:rotate(360deg); } }
      .anim-1 { animation: fadeUp 0.7s ease both; }
      .anim-2 { animation: fadeUp 0.7s 0.12s ease both; }
      .anim-3 { animation: fadeUp 0.7s 0.24s ease both; }
      .float-card { animation: float 5s ease-in-out infinite; }
      .theme-toggle svg { transition: transform 0.4s ease; }
      .theme-toggle:hover svg { transform: rotate(20deg); }
      @media (prefers-reduced-motion: reduce) {
        .anim-1,.anim-2,.anim-3,.float-card { animation:none !important; }
      }
    `;
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "var(--background)", fontFamily: "var(--font-sans,system-ui,sans-serif)", transition: "background 0.3s, color 0.3s" }}>

      {/* ══ NAVBAR ══ */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "color-mix(in srgb, var(--background) 90%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{
          maxWidth: 1160, margin: "0 auto", padding: "0 24px",
          height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: "var(--primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Dumbbell size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: "var(--foreground)" }}>GymSaaS</div>
              <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>Fitness Management</div>
            </div>
          </div>

          {/* desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="desk-nav">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} style={{
                padding: "8px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: "var(--foreground)", textDecoration: "none", transition: "background 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--secondary)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >{l.label}</a>
            ))}

            {/* ── THEME TOGGLE ── */}
            <button
              className="theme-toggle"
              onClick={() => setDark(!dark)}
              title={dark ? "Switch to Light" : "Switch to Dark"}
              style={{
                marginLeft: 8,
                width: 40, height: 40, borderRadius: 10,
                border: "1px solid var(--border)",
                background: "var(--secondary)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.25s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--primary)";
                (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLButtonElement).style.background = "var(--secondary)";
              }}
            >
              {dark
                ? <Sun size={17} color="var(--primary)" />
                : <Moon size={17} color="var(--foreground)" />
              }
            </button>

            <Link href="/login" style={{
              padding: "8px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600,
              color: "var(--foreground)", textDecoration: "none",
              border: "1px solid var(--border)", marginLeft: 6,
              transition: "border-color 0.2s",
            }}>Login</Link>

            <Link href="/register" style={{
              padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 700,
              background: "var(--primary)", color: "#fff", textDecoration: "none",
              marginLeft: 6, transition: "opacity 0.2s",
            }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >Start Free Trial</Link>
          </nav>

          {/* mobile right */}
          <div style={{ display: "none", alignItems: "center", gap: 8 }} className="mob-right">
            <button
              className="theme-toggle"
              onClick={() => setDark(!dark)}
              style={{
                width: 38, height: 38, borderRadius: 9,
                border: "1px solid var(--border)",
                background: "var(--secondary)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {dark ? <Sun size={16} color="var(--primary)" /> : <Moon size={16} color="var(--foreground)" />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--foreground)", display: "flex" }}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{
            background: "var(--background)", borderBottom: "1px solid var(--border)",
            padding: "12px 24px", display: "flex", flexDirection: "column", gap: 4,
          }}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
                padding: "12px 14px", borderRadius: 8, fontSize: 15,
                color: "var(--foreground)", textDecoration: "none",
              }}>{l.label}</a>
            ))}
            <Link href="/register" style={{
              marginTop: 8, padding: "13px", borderRadius: 10, background: "var(--primary)",
              color: "#fff", textDecoration: "none", fontWeight: 700, textAlign: "center",
            }}>Start Free Trial</Link>
          </div>
        )}

        <style>{`
          .desk-nav  { display:flex !important; }
          .mob-right { display:none !important; }
          @media(max-width:768px){
            .desk-nav  { display:none !important; }
            .mob-right { display:flex !important; }
          }
        `}</style>
      </header>

      {/* ══ HERO ══ */}
      <section style={{ background: "var(--muted)", paddingTop: 68, borderBottom: "1px solid var(--border)" }}>
        <div style={{
          maxWidth: 1160, margin: "0 auto", padding: "80px 24px 0",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 60, alignItems: "center",
        }} className="hero-grid">
          <div style={{ paddingBottom: 80 }}>
            <div className="anim-1" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "var(--accent)", border: "1px solid var(--ring)",
              borderRadius: 99, padding: "5px 14px", marginBottom: 24,
              opacity: 0.9,
            }}>
              <Zap size={13} color="var(--accent-foreground)" />
              <span style={{ color: "var(--accent-foreground)", fontSize: 12, fontWeight: 600 }}>
                #1 Gym Management Platform in India
              </span>
            </div>

            <h1 className="anim-2" style={{
              fontSize: 54, fontWeight: 900, lineHeight: 1.08,
              color: "var(--foreground)", letterSpacing: "-1.5px", marginBottom: 20,
            }}>
              Run Your Gym<br />
              <span style={{ color: "var(--primary)" }}>Like a Pro.</span>
            </h1>

            <p className="anim-3" style={{
              fontSize: 17, color: "var(--muted-foreground)", lineHeight: 1.65,
              maxWidth: 440, marginBottom: 36,
            }}>
              Manage members, track payments, send renewal alerts, and grow your
              fitness business — all from one simple dashboard.
            </p>

            <div className="anim-3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/register" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 26px", borderRadius: 12,
                background: "var(--primary)", color: "#fff",
                textDecoration: "none", fontWeight: 700, fontSize: 15,
                transition: "opacity 0.2s",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
              >
                Start Free Trial <ArrowRight size={16} />
              </Link>
              <Link href="/login" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 26px", borderRadius: 12,
                background: "var(--card)", color: "var(--foreground)",
                textDecoration: "none", fontWeight: 600, fontSize: 15,
                border: "1px solid var(--border)", transition: "border-color 0.2s",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--primary)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)")}
              >
                View Demo
              </Link>
            </div>

            <div style={{ display: "flex", gap: 20, marginTop: 28, flexWrap: "wrap" }}>
              {["No credit card required", "14-day free trial", "Cancel anytime"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={14} color="#22c55e" />
                  <span style={{ color: "var(--muted-foreground)", fontSize: 13 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }} className="hero-visual">
            <div className="float-card"><DashboardMockup /></div>
          </div>
        </div>
        <style>{`
          .hero-grid   { grid-template-columns:1fr 1fr !important; }
          .hero-visual { display:flex !important; }
          @media(max-width:860px){
            .hero-grid   { grid-template-columns:1fr !important; }
            .hero-visual { display:none !important; }
            h1           { font-size:40px !important; }
          }
        `}</style>
      </section>

      {/* ══ STATS ══ */}
      <section ref={statsRef} style={{ borderBottom: "1px solid var(--border)", background: "var(--background)" }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto", padding: "0 24px",
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        }} className="stats-grid">
          {[
            { value: 1200, suffix: "+", label: "Members Managed" },
            { value: 50, suffix: "+", label: "Gyms Onboarded" },
            { value: 840000, suffix: "", label: "Revenue Tracked (₹)" },
            { value: 98, suffix: "%", label: "Owner Satisfaction" },
          ].map((s, i) => (
            <div key={i} style={{ borderLeft: i > 0 ? "1px solid var(--border)" : "none" }}>
              <StatCard {...s} start={statsOn} />
            </div>
          ))}
        </div>
        <style>{`
          .stats-grid { grid-template-columns:repeat(4,1fr) !important; }
          @media(max-width:640px){ .stats-grid { grid-template-columns:repeat(2,1fr) !important; } }
        `}</style>
      </section>

      {/* ══ FEATURES ══ */}
      <section id="features" style={{ padding: "96px 24px", background: "var(--muted)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{
              display: "inline-flex", background: "var(--accent)", borderRadius: 99,
              padding: "5px 14px", marginBottom: 14,
            }}>
              <span style={{ color: "var(--accent-foreground)", fontSize: 12, fontWeight: 600 }}>Features</span>
            </div>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "var(--foreground)", letterSpacing: "-1px", marginBottom: 12 }}>
              Everything Your Gym Needs
            </h2>
            <p style={{ color: "var(--muted-foreground)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
              Built for how real gyms actually operate — not generic software with gym labels slapped on.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }} className="feat-grid">
            <FeatureCard icon={Users} title="Member Management" delay={0}
              desc="Add, edit, and track every member with photos, contact info, fitness goals, and complete payment history." />
            <FeatureCard icon={Package} title="Package Builder" delay={60}
              desc="Create monthly, quarterly, or annual plans. Set pricing, freeze periods, and trainer add-ons in minutes." />
            <FeatureCard icon={CreditCard} title="Payment Tracking" delay={120}
              desc="Record cash, UPI, and card payments. See who has paid, who has dues — never miss a collection again." />
            <FeatureCard icon={BarChart3} title="Reports & Analytics" delay={0}
              desc="Visual reports on revenue trends, peak months, and package popularity so you know what to act on." />
            <FeatureCard icon={Bell} title="Renewal Alerts" delay={60}
              desc="Auto-flag memberships expiring this week. Send WhatsApp or SMS reminders before members churn." />
            <FeatureCard icon={TrendingUp} title="Growth Insights" delay={120}
              desc="Track new vs retained members month-over-month and find your most profitable packages." />
          </div>
        </div>
        <style>{`
          .feat-grid { grid-template-columns:repeat(3,1fr) !important; }
          @media(max-width:860px){ .feat-grid { grid-template-columns:repeat(2,1fr) !important; } }
          @media(max-width:540px){ .feat-grid { grid-template-columns:1fr !important; } }
        `}</style>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="how" style={{ padding: "96px 24px", background: "var(--background)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", background: "var(--accent)", borderRadius: 99, padding: "5px 14px", marginBottom: 14 }}>
            <span style={{ color: "var(--accent-foreground)", fontSize: 12, fontWeight: 600 }}>Getting Started</span>
          </div>
          <h2 style={{ fontSize: 40, fontWeight: 900, color: "var(--foreground)", letterSpacing: "-1px", marginBottom: 48 }}>
            Up & Running in 10 Minutes
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, textAlign: "left" }} className="how-grid">
            {[
              { n: "1", title: "Create Your Gym", desc: "Sign up and set your gym name, logo, and location. No technical setup needed." },
              { n: "2", title: "Add Members & Plans", desc: "Build your membership packages and add your existing members — bulk CSV import supported." },
              { n: "3", title: "Track & Grow", desc: "Record payments, get renewal alerts, and watch your monthly reports come alive automatically." },
            ].map((s) => (
              <div key={s.n}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, background: "var(--primary)",
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 16, marginBottom: 16,
                }}>{s.n}</div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: "var(--foreground)", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: "var(--muted-foreground)", fontSize: 14, lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .how-grid { grid-template-columns:repeat(3,1fr) !important; }
          @media(max-width:600px){ .how-grid { grid-template-columns:1fr !important; } }
        `}</style>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section id="testimonials" style={{ padding: "96px 24px", background: "var(--muted)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontSize: 38, fontWeight: 900, color: "var(--foreground)", letterSpacing: "-1px", marginBottom: 10 }}>
              Gym Owners Love It
            </h2>
            <p style={{ color: "var(--muted-foreground)", fontSize: 15 }}>Real results from real gyms across India.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="testi-grid">
            <TestiCard name="Rajesh Pandey" gym="Iron Temple Gym, Mumbai" delay={0}
              quote="I used to manage everything in Excel. GymSaaS saved me 3 hours every day. My renewal rate jumped from 60% to 87% in three months." />
            <TestiCard name="Deepa Krishnan" gym="FitZone Studio, Bangalore" delay={100}
              quote="The payment tracking is incredible. I always know exactly who has paid and who hasn't. No more awkward conversations at the front desk." />
            <TestiCard name="Amandeep Singh" gym="Power Gym, Delhi" delay={200}
              quote="The reports show me which months are slow and which packages sell best. I actually understand my business now. Highly recommend." />
          </div>
        </div>
        <style>{`
          .testi-grid { grid-template-columns:repeat(3,1fr) !important; }
          @media(max-width:800px){ .testi-grid { grid-template-columns:1fr !important; } }
        `}</style>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" style={{ padding: "96px 24px", background: "var(--background)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", background: "var(--accent)", borderRadius: 99, padding: "5px 14px", marginBottom: 14 }}>
            <span style={{ color: "var(--accent-foreground)", fontSize: 12, fontWeight: 600 }}>Pricing</span>
          </div>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: "var(--foreground)", letterSpacing: "-1px", marginBottom: 10 }}>
            Simple, Honest Pricing
          </h2>
          <p style={{ color: "var(--muted-foreground)", fontSize: 15, marginBottom: 44 }}>
            One plan. Everything included. No surprises.
          </p>
          <div style={{
            background: "var(--card)", border: "2px solid var(--primary)",
            borderRadius: 20, padding: 40,
            boxShadow: "0 8px 32px rgba(34,197,94,0.10)",
          }}>
            <div style={{
              display: "inline-block", background: "var(--primary)", color: "#fff",
              fontSize: 11, fontWeight: 700, letterSpacing: 1,
              padding: "3px 12px", borderRadius: 99, marginBottom: 20,
            }}>MOST POPULAR</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--card-foreground)", marginBottom: 4 }}>GymSaaS Pro</div>
            <div style={{ color: "var(--muted-foreground)", fontSize: 14, marginBottom: 28 }}>Everything you need to run your gym.</div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 60, fontWeight: 900, color: "var(--foreground)", letterSpacing: "-2px" }}>₹999</span>
              <span style={{ color: "var(--muted-foreground)", fontSize: 15 }}> / month</span>
            </div>
            <div style={{ color: "var(--primary)", fontSize: 13, fontWeight: 600, marginBottom: 32 }}>
              Just ₹33/day — less than a protein shake 💪
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", textAlign: "left", marginBottom: 36 }}>
              {["Unlimited Members", "Unlimited Packages", "Payment Tracking", "Reports & Analytics",
                "Renewal Alerts", "WhatsApp Reminders", "CSV Import & Export", "Priority Support"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle2 size={16} color="#22c55e" />
                  <span style={{ color: "var(--card-foreground)", fontSize: 14 }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/register" style={{
              display: "block", textAlign: "center",
              padding: "15px", borderRadius: 12,
              background: "var(--primary)", color: "#fff",
              textDecoration: "none", fontWeight: 700, fontSize: 16,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >Start 14-Day Free Trial</Link>
            <p style={{ color: "var(--muted-foreground)", fontSize: 12, marginTop: 12 }}>
              No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background: "var(--primary)", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontSize: 42, fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginBottom: 14 }}>
            Ready to Modernize Your Gym?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 16, marginBottom: 36 }}>
            Join 50+ gym owners who switched and never looked back.
          </p>
          <Link href="/register" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 32px", borderRadius: 12,
            background: "#fff", color: "#16a34a",
            textDecoration: "none", fontWeight: 800, fontSize: 16,
            transition: "opacity 0.2s",
          }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.9")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            Start Free Trial Now <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "var(--background)", borderTop: "1px solid var(--border)", padding: "40px 24px 32px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 36 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Dumbbell size={18} color="#fff" />
                </div>
                <span style={{ fontWeight: 800, fontSize: 15, color: "var(--foreground)" }}>GymSaaS</span>
              </div>
              <p style={{ color: "var(--muted-foreground)", fontSize: 13, maxWidth: 220, lineHeight: 1.6 }}>
                The gym management platform built for Indian fitness businesses.
              </p>
            </div>
            <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
              {[
                { title: "Product", links: ["Features", "Pricing", "Demo"] },
                { title: "Support", links: ["Help Center", "Contact", "Privacy Policy"] },
              ].map((col) => (
                <div key={col.title}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "var(--foreground)", marginBottom: 14 }}>{col.title}</div>
                  {col.links.map((l) => (
                    <div key={l} style={{ marginBottom: 10 }}>
                      <a href="#" style={{ color: "var(--muted-foreground)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--primary)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--muted-foreground)")}
                      >{l}</a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ color: "var(--muted-foreground)", fontSize: 13 }}>© 2026 GymSaaS. All rights reserved.</span>
            <span style={{ color: "var(--muted-foreground)", fontSize: 13 }}>Made with 💚 for Indian gym owners.</span>
          </div>
        </div>
      </footer>

    </main>
  );
}