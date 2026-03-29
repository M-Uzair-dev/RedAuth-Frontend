"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const FEATURES = [
  {
    icon: "🔑",
    title: "Token Management",
    desc: "JWT access & refresh tokens with automatic rotation, blacklisting, and secure storage.",
    color: "var(--pink)",
  },
  {
    icon: "⚡",
    title: "Rate Limiting",
    desc: "Per-route, per-user rate limiting with Redis backing. Protect your API from abuse.",
    color: "var(--sky)",
  },
  {
    icon: "🗄️",
    title: "Smart Caching",
    desc: "Multi-layer caching strategy with cache invalidation, TTL management, and cache warming.",
    color: "var(--cream)",
  },
  {
    icon: "⏰",
    title: "Cron Jobs",
    desc: "Scheduled tasks for automatic token cleanup, email retries, and database maintenance.",
    color: "var(--pink)",
  },
  {
    icon: "📨",
    title: "Message Queues",
    desc: "Background email sending with retry logic, dead letter queues, and job prioritization.",
    color: "var(--sky)",
  },
  {
    icon: "📧",
    title: "Email Service",
    desc: "Transactional emails — verification, password reset, welcome messages — all queued.",
    color: "var(--cream)",
  },
  {
    icon: "🛡️",
    title: "Zod Validation",
    desc: "Runtime type safety at every endpoint. Schema-first validation with detailed error messages.",
    color: "var(--pink)",
  },
  {
    icon: "🐘",
    title: "Prisma ORM",
    desc: "Type-safe database queries with PostgreSQL. Migrations, relations, and transactions built-in.",
    color: "var(--sky)",
  },
  {
    icon: "🔐",
    title: "Session Management",
    desc: "Multi-device session tracking with revocation, device fingerprinting, and active session lists.",
    color: "var(--cream)",
  },
  {
    icon: "🚦",
    title: "Middleware Stack",
    desc: "Auth middleware, CORS, helmet, compression, and request logging — all pre-configured.",
    color: "var(--pink)",
  },
];

const TECH_TAGS = [
  "Node.js", "Express", "TypeScript", "PostgreSQL", "Prisma", "Redis",
  "BullMQ", "Nodemailer", "Zod", "JWT", "bcrypt", "Helmet", "CORS",
  "Node.js", "Express", "TypeScript", "PostgreSQL", "Prisma", "Redis",
  "BullMQ", "Nodemailer", "Zod", "JWT", "bcrypt", "Helmet", "CORS",
];

const WORDS = ["Production", "Scalable", "Secure", "Reliable", "Fast"];

function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex, words]);

  return displayed;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "white",
        borderBottom: scrolled ? "2px solid var(--black)" : "2px solid transparent",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: scrolled ? "0 4px 0 var(--black)" : "none",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36,
              background: "var(--blue)",
              border: "2px solid var(--black)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Space Grotesk", fontWeight: 800, fontSize: 18, color: "white",
              boxShadow: "3px 3px 0 var(--black)",
            }}>N</div>
            <span style={{ fontFamily: "Space Grotesk", fontWeight: 800, fontSize: 20, color: "var(--black)", letterSpacing: "-0.02em" }}>
              NodeStack
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="hidden-mobile">
          <a href="#features" className="nav-link">Features</a>
          <a href="#stack" className="nav-link">Stack</a>
          <a href="#cta" className="nav-link">Get Started</a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/login">
            <button className="btn btn-white btn-sm">Login</button>
          </Link>
          <Link href="/signup">
            <button className="btn btn-blue btn-sm">Sign Up</button>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </nav>
  );
}

function HeroSection() {
  const word = useTypewriter(WORDS);

  return (
    <section
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        paddingTop: 68,
        paddingBottom: 48,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated blobs */}
      <div style={{
        position: "absolute", top: "8%", right: "5%",
        width: 320, height: 320,
        background: "var(--pink)", opacity: 0.42,
        filter: "blur(9px)",
      }} className="anim-blob anim-float" />
      <div style={{
        position: "absolute", bottom: "10%", left: "2%",
        width: 250, height: 250,
        background: "var(--sky)", opacity: 0.4,
        filter: "blur(9px)",
        animationDelay: "2s",
      }} className="anim-blob anim-float2" />
      <div style={{
        position: "absolute", top: "45%", right: "25%",
        width: 165, height: 165,
        background: "var(--cream)", opacity: 0.45,
        filter: "blur(8px)",
        animationDelay: "1s",
      }} className="anim-blob anim-float" />
      <div style={{
        position: "absolute", top: "20%", left: "15%",
        width: 115, height: 115,
        background: "var(--blue)", opacity: 0.22,
        filter: "blur(9px)",
        animationDelay: "3s",
      }} className="anim-blob anim-float2" />

      {/* Decorative grid dots */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        pointerEvents: "none",
      }} />

      {/* Content — two-column grid on desktop, single column on mobile */}
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 16px",
        position: "relative", zIndex: 1, width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 36,
        alignItems: "center",
      }}>
        {/* Left: text */}
        <div style={{ minWidth: 0 }}>
          {/* Badge */}
          <div className="anim-hidden anim-slide-down" style={{ marginBottom: 18 }}>
            <span className="b-tag" style={{ background: "var(--cream)" }}>
              <span style={{ color: "var(--blue)" }}>◆</span>
              Backend Template v1.0
            </span>
          </div>

          {/* Headline */}
          <h1
            className="anim-hidden anim-slide-up delay-100"
            style={{
              fontFamily: "Space Grotesk",
              fontWeight: 800,
              fontSize: "clamp(1.7rem, 3.8vw, 3.2rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 8,
              color: "var(--black)",
            }}
          >
            Build{" "}
            <span style={{
              background: "var(--blue)",
              padding: "0 8px",
              border: "2px solid var(--black)",
              display: "inline-block",
              lineHeight: 1.2,
              minWidth: "6ch",
              boxShadow: "4px 4px 0 var(--black)",
            }}>
              {word}<span className="anim-blink" style={{ marginLeft: 1 }}>|</span>
            </span>
            {" "}APIs
          </h1>
          <h1
            className="anim-hidden anim-slide-up delay-200"
            style={{
              fontFamily: "Space Grotesk",
              fontWeight: 800,
              fontSize: "clamp(1.7rem, 3.8vw, 3.2rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 20,
              color: "var(--black)",
            }}
          >
            Without the Boilerplate.
          </h1>

          {/* Subtitle */}
          <p
            className="anim-hidden anim-slide-up delay-300"
            style={{
              fontSize: "clamp(0.88rem, 1.7vw, 1rem)",
              lineHeight: 1.7,
              color: "#333",
              maxWidth: 520,
              marginBottom: 32,
              fontWeight: 400,
            }}
          >
            A production-grade Node.js backend with JWT auth, rate limiting, caching,
            cron jobs, message queues, email service, Zod validation, and Prisma ORM.
            Ship faster, scale confidently.
          </p>

          {/* CTAs */}
          <div className="anim-hidden anim-slide-up delay-400" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 36 }}>
            <Link href="/signup">
              <button className="btn btn-blue btn-lg">
                Start Building →
              </button>
            </Link>
            <a href="#features">
              <button className="btn btn-cream btn-lg">
                Explore Features
              </button>
            </a>
          </div>

          {/* Stats row */}
          <div
            className="anim-hidden anim-slide-up delay-500"
            style={{ display: "flex", gap: 24, flexWrap: "wrap" }}
          >
            {[
              { num: "10+", label: "Core Features" },
              { num: "100%", label: "TypeScript" },
              { num: "0", label: "Config Hell" },
            ].map(({ num, label }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontFamily: "Space Grotesk", fontWeight: 800, fontSize: "1.65rem", lineHeight: 1, color: "var(--black)" }}>
                  {num}
                </span>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#666", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: code snippet */}
        <div
          className="code-snippet-float anim-hidden anim-slide-left delay-600"
          style={{ position: "relative", width: "clamp(220px, 27vw, 310px)", flexShrink: 0 }}
        >
          <div className="b-card" style={{ padding: 0, overflow: "hidden", boxShadow: "6px 6px 0 var(--black)" }}>
            {/* Window chrome */}
            <div style={{
              background: "var(--black)",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
              ))}
              <span style={{ marginLeft: 8, color: "#888", fontSize: 12, fontFamily: "monospace" }}>
                server.ts
              </span>
            </div>
            <pre style={{
              padding: "16px",
              fontSize: 11,
              lineHeight: 1.7,
              fontFamily: "monospace",
              background: "#0d1117",
              color: "#e6edf3",
              overflowX: "auto",
              margin: 0,
            }}
              dangerouslySetInnerHTML={{ __html: `<span style="color:#ff7b72">import</span> <span style="color:#79c0ff">express</span> from <span style="color:#a5d6ff">"express"</span>;
<span style="color:#ff7b72">import</span> { <span style="color:#79c0ff">authRouter</span> } from <span style="color:#a5d6ff">"./routes"</span>;
<span style="color:#ff7b72">import</span> { <span style="color:#79c0ff">rateLimiter</span> } from <span style="color:#a5d6ff">"./middleware"</span>;
<span style="color:#ff7b72">import</span> { <span style="color:#79c0ff">startCronJobs</span> } from <span style="color:#a5d6ff">"./cron"</span>;

<span style="color:#ff7b72">const</span> app = <span style="color:#79c0ff">express</span>();

app.<span style="color:#d2a8ff">use</span>(rateLimiter);
app.<span style="color:#d2a8ff">use</span>(<span style="color:#a5d6ff">"/auth"</span>, authRouter);

<span style="color:#79c0ff">startCronJobs</span>();

app.<span style="color:#d2a8ff">listen</span>(<span style="color:#79c0ff">PORT</span>);
<span style="color:#8b949e">// ✓ Ready for production</span>` }}
            />
          </div>

          {/* Floating badges */}
          <div
            className="anim-float"
            style={{
              position: "absolute", top: -16, right: -16,
              background: "var(--pink)",
              border: "2px solid var(--black)",
              boxShadow: "3px 3px 0 var(--black)",
              padding: "5px 10px",
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            🚀 Production Ready
          </div>
          <div
            className="anim-float2"
            style={{
              position: "absolute", bottom: -12, left: -16,
              background: "var(--cream)",
              border: "2px solid var(--black)",
              boxShadow: "3px 3px 0 var(--black)",
              padding: "5px 10px",
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            ✅ Type Safe
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        color: "#999", fontSize: 12, fontFamily: "Space Grotesk", fontWeight: 600,
        letterSpacing: "0.08em", textTransform: "uppercase",
      }}>
        <span>Scroll</span>
        <div style={{ width: 2, height: 28, background: "#bbb" }} />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .code-snippet-float { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function FeaturesSection() {
  const { ref, inView } = useInView();

  return (
    <section id="features" style={{ padding: "100px 24px", background: "var(--black)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div ref={ref} style={{ marginBottom: 60, textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "Space Grotesk",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              letterSpacing: "-0.03em",
              color: "white",
              marginBottom: 16,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            Everything You Need.{" "}
            <span style={{
              background: "var(--blue)",
              padding: "0 8px",
              border: "2px solid white",
              boxShadow: "4px 4px 0 var(--pink)",
            }}>
              Nothing You Don&apos;t.
            </span>
          </h2>
          <p
            style={{
              color: "#aaa",
              fontSize: 18,
              maxWidth: 540,
              margin: "0 auto",
              opacity: inView ? 1 : 0,
              transition: "opacity 0.6s ease 0.2s",
            }}
          >
            Stop wiring up the same infrastructure. Start shipping features.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, delay }: { feature: typeof FEATURES[0]; delay: number }) {
  const { ref, inView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className="feature-card"
      style={{
        background: "white",
        border: "2px solid white",
        boxShadow: "6px 6px 0 rgba(255,255,255,0.2)",
        padding: "28px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, box-shadow 0.12s ease, transform 0.12s ease`,
      }}
    >
      <div
        style={{
          width: 52, height: 52,
          background: feature.color,
          border: "2px solid var(--black)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, marginBottom: 16,
          boxShadow: "3px 3px 0 var(--black)",
        }}
      >
        {feature.icon}
      </div>
      <h3 style={{
        fontFamily: "Space Grotesk",
        fontWeight: 700,
        fontSize: 18,
        marginBottom: 8,
        color: "var(--black)",
      }}>
        {feature.title}
      </h3>
      <p style={{ color: "#555", fontSize: 14, lineHeight: 1.65 }}>
        {feature.desc}
      </p>
    </div>
  );
}

function TechStackSection() {
  const { ref, inView } = useInView();

  return (
    <section id="stack" style={{ padding: "80px 0", background: "var(--cream)", borderTop: "2px solid var(--black)", borderBottom: "2px solid var(--black)" }}>
      <div ref={ref} style={{ textAlign: "center", marginBottom: 40, padding: "0 24px" }}>
        <h2
          style={{
            fontFamily: "Space Grotesk",
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            letterSpacing: "-0.03em",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          Powered by Battle-Tested Tech
        </h2>
      </div>

      {/* Marquee */}
      <div className="marquee-wrapper" style={{ borderTop: "2px solid var(--black)", borderBottom: "2px solid var(--black)", padding: "16px 0", background: "white" }}>
        <div className="marquee-inner">
          {TECH_TAGS.map((tag, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginRight: 16,
                padding: "8px 20px",
                border: "2px solid var(--black)",
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: 14,
                background: i % 3 === 0 ? "var(--pink)" : i % 3 === 1 ? "var(--sky)" : "var(--cream)",
                boxShadow: "3px 3px 0 var(--black)",
                whiteSpace: "nowrap",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { ref, inView } = useInView();

  const steps = [
    { num: "01", title: "Clone & Configure", desc: "Clone the repo, copy .env.example, fill in your database URL and secrets.", color: "var(--pink)" },
    { num: "02", title: "Run Migrations", desc: "Run `prisma migrate dev` to set up your PostgreSQL schema in seconds.", color: "var(--sky)" },
    { num: "03", title: "Start Building", desc: "All auth, queues, and cron jobs are pre-wired. Just write your business logic.", color: "var(--cream)" },
  ];

  return (
    <section style={{ padding: "100px 24px", background: "white" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref} style={{ marginBottom: 60, textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "Space Grotesk",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              letterSpacing: "-0.03em",
              marginBottom: 12,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            Up & Running in Minutes
          </h2>
          <p style={{
            color: "#555",
            fontSize: 17,
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.15s",
          }}>
            No week-long setup. No rabbit holes. Just plug and ship.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                background: step.color,
                border: "2px solid var(--black)",
                boxShadow: "6px 6px 0 var(--black)",
                padding: "36px 28px",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.5s ease ${i * 120}ms, transform 0.5s ease ${i * 120}ms`,
              }}
            >
              <div style={{
                fontFamily: "Space Grotesk",
                fontWeight: 800,
                fontSize: "4rem",
                lineHeight: 1,
                color: "rgba(0,0,0,0.45)",
                marginBottom: 16,
              }}>
                {step.num}
              </div>
              <h3 style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 20, marginBottom: 10 }}>
                {step.title}
              </h3>
              <p style={{ color: "#333", fontSize: 15, lineHeight: 1.65 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, inView } = useInView();

  return (
    <section id="cta" style={{ padding: "100px 24px", background: "var(--blue)", borderTop: "2px solid var(--black)", position: "relative", overflow: "hidden" }}>
      {/* Clouds */}
      {[
        { top: "12%", left: "4%",  scale: 1,    opacity: 0.18 },
        { top: "8%",  left: "22%", scale: 0.65, opacity: 0.13 },
        { top: "18%", left: "55%", scale: 0.8,  opacity: 0.15 },
        { top: "6%",  left: "74%", scale: 1.1,  opacity: 0.14 },
        { top: "60%", left: "8%",  scale: 0.7,  opacity: 0.12 },
        { top: "65%", left: "42%", scale: 0.55, opacity: 0.11 },
        { top: "58%", left: "78%", scale: 0.9,  opacity: 0.13 },
      ].map((c, i) => (
        <div key={i} style={{
          position: "absolute",
          top: c.top,
          left: c.left,
          transform: `scale(${c.scale})`,
          transformOrigin: "left top",
          opacity: c.opacity,
          pointerEvents: "none",
        }}>
          <div style={{ position: "relative", width: 160, height: 60 }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 44, background: "white", borderRadius: 44 }} />
            <div style={{ position: "absolute", bottom: 20, left: 24, width: 72, height: 72, background: "white", borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 62, width: 54, height: 54, background: "white", borderRadius: "50%" }} />
          </div>
        </div>
      ))}
      <div ref={ref} style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontFamily: "Space Grotesk",
            fontWeight: 800,
            fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
            letterSpacing: "-0.03em",
            color: "white",
            marginBottom: 20,
            opacity: inView ? 1 : 0,
            transform: inView ? "scale(1)" : "scale(0.92)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          Ready to Skip the Setup?
        </h2>
        <p style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: 18,
          marginBottom: 48,
          lineHeight: 1.65,
          opacity: inView ? 1 : 0,
          transition: "opacity 0.6s ease 0.15s",
        }}>
          Try the live demo — see token management, sessions, email verification,
          and rate limiting all in one place.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/signup">
            <button className="btn btn-white btn-lg">
              Create Demo Account →
            </button>
          </Link>
          <Link href="/login">
            <button className="btn btn-pink btn-lg">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "var(--black)",
      borderTop: "2px solid white",
      padding: "40px 24px",
      color: "white",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30,
            background: "var(--blue)",
            border: "2px solid white",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Space Grotesk", fontWeight: 800, fontSize: 16, color: "white",
          }}>N</div>
          <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 16 }}>NodeStack</span>
        </div>
        <p style={{ color: "#666", fontSize: 14, fontFamily: "Space Grotesk" }}>
          Built for developers who ship.
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {["GitHub", "Docs", "Issues"].map((link) => (
            <a key={link} href="#" style={{ color: "#888", fontSize: 14, fontFamily: "Space Grotesk", fontWeight: 600, textDecoration: "none" }}>
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TechStackSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </main>
  );
}
