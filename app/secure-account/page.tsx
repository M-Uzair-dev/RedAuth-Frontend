"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function SecureAccountPage() {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "confirm" | "revoking" | "done">("idle");
  const [progress, setProgress] = useState(0);

  function handleRevoke() {
    setState("revoking");
    setProgress(0);
    const start = Date.now();
    const duration = 2200;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setState("done");
      }
    };
    requestAnimationFrame(tick);
  }

  /* ── DONE STATE ── */
  if (state === "done") {
    return (
      <div style={{ minHeight: "100vh", background: "white", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", position: "relative", overflow: "hidden" }}>
        {/* Blobs */}
        <div style={{ position: "absolute", top: "-80px", left: "-100px", width: "480px", height: "480px", background: "var(--sky)", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", opacity: 0.38, filter: "blur(9px)", animation: "blob 10s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-60px", right: "-80px", width: "400px", height: "400px", background: "var(--cream)", borderRadius: "40% 60% 70% 30% / 50% 40% 60% 50%", opacity: 0.40, filter: "blur(9px)", animation: "blob 13s ease-in-out infinite reverse" }} />

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "480px", background: "white", border: "2px solid #0a0a0a", boxShadow: "8px 8px 0 #0a0a0a", padding: "56px 48px", textAlign: "center" }}>
          {/* Check icon */}
          <div style={{ width: "72px", height: "72px", background: "var(--sky)", border: "2px solid #0a0a0a", boxShadow: "4px 4px 0 #0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: "32px" }}>
            ✓
          </div>

          <h1 className="font-grotesk" style={{ fontSize: "30px", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.03em", marginBottom: "12px" }}>
            Account Secured
          </h1>
          <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.7, marginBottom: "36px" }}>
            All active sessions have been revoked. Any device that was logged in — including the suspicious one — has been signed out.
          </p>

          {/* What happened */}
          <div style={{ background: "#f5f5f5", border: "2px solid #0a0a0a", padding: "20px 24px", textAlign: "left", marginBottom: "32px" }}>
            <p className="font-grotesk" style={{ fontSize: "10px", fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px" }}>// What we did</p>
            {[
              "Revoked all active sessions",
              "Signed out all devices",
              "Invalidated all refresh tokens",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: i < 2 ? "10px" : 0 }}>
                <div style={{ width: "20px", height: "20px", minWidth: "20px", background: "var(--sky)", border: "2px solid #0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, fontFamily: "Space Grotesk, sans-serif" }}>✓</div>
                <p style={{ fontSize: "13px", color: "#444", margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button className="btn btn-black btn-lg" style={{ width: "100%" }} onClick={() => router.push("/login")}>
              Sign In Again →
            </button>
            <p style={{ fontSize: "12px", color: "#888" }}>
              Make sure to use a strong, unique password.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── REVOKING STATE ── */
  if (state === "revoking") {
    return (
      <div style={{ minHeight: "100vh", background: "white", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <div style={{ width: "56px", height: "56px", background: "var(--pink)", border: "2px solid #0a0a0a", boxShadow: "4px 4px 0 #0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: "22px" }}>
            🔒
          </div>
          <h2 className="font-grotesk" style={{ fontSize: "22px", fontWeight: 800, color: "#0a0a0a", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            Revoking Sessions
          </h2>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "32px" }}>Signing out all devices…</p>

          {/* Progress bar */}
          <div style={{ width: "100%", height: "8px", background: "#f0f0f0", border: "2px solid #0a0a0a", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "var(--pink)", transition: "width 0.05s linear" }} />
          </div>
          <p className="font-grotesk" style={{ fontSize: "12px", color: "#888", marginTop: "10px" }}>{Math.round(progress)}%</p>
        </div>
      </div>
    );
  }

  /* ── MAIN STATE (idle / confirm) ── */
  return (
    <div style={{ minHeight: "100vh", background: "white", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      {/* Blobs */}
      <div style={{ position: "absolute", top: "-100px", right: "-120px", width: "520px", height: "520px", background: "var(--pink)", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", opacity: 0.35, filter: "blur(9px)", animation: "blob 10s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "-80px", left: "-100px", width: "440px", height: "440px", background: "var(--cream)", borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%", opacity: 0.40, filter: "blur(9px)", animation: "blob 13s ease-in-out infinite reverse" }} />
      <div style={{ position: "absolute", top: "40%", left: "10%", width: "260px", height: "260px", background: "var(--sky)", borderRadius: "50% 60% 30% 60% / 40% 70% 60% 30%", opacity: 0.22, filter: "blur(9px)", animation: "blob 16s ease-in-out infinite" }} />

      {/* Nav */}
      <nav style={{ position: "relative", zIndex: 10, padding: "20px 40px", borderBottom: "2px solid #0a0a0a", background: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" className="font-grotesk" style={{ fontSize: "20px", fontWeight: 800, color: "#0a0a0a", textDecoration: "none", letterSpacing: "-0.02em" }}>
          NodeStack
        </Link>
        <Link href="/login" style={{ fontSize: "13px", color: "#666", textDecoration: "none", fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>
          Sign In →
        </Link>
      </nav>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 20px", position: "relative", zIndex: 1 }}>
        <div style={{ width: "100%", maxWidth: "560px" }}>

          {/* Alert header */}
          <div style={{ background: "var(--pink)", border: "2px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a", padding: "28px 32px", marginBottom: "-2px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div style={{ width: "40px", height: "40px", minWidth: "40px", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 800, color: "var(--pink)", fontFamily: "Space Grotesk, sans-serif" }}>!</div>
              <div>
                <p className="font-grotesk" style={{ fontSize: "11px", fontWeight: 700, color: "#0a0a0a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Security Alert</p>
                <h1 className="font-grotesk" style={{ fontSize: "26px", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.03em", lineHeight: 1.15, margin: 0 }}>
                  Suspicious Login Detected
                </h1>
              </div>
            </div>
          </div>

          {/* Main card */}
          <div style={{ background: "white", border: "2px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a", padding: "36px 32px" }}>
            <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.75, marginBottom: "28px" }}>
              We detected a new login to your account from an unrecognized device. If this wasn't you, use the button below to immediately revoke <strong>all active sessions</strong> and sign out every device.
            </p>

            {/* What happens section */}
            <div style={{ background: "#f5f5f5", border: "2px solid #0a0a0a", padding: "20px 24px", marginBottom: "28px" }}>
              <p className="font-grotesk" style={{ fontSize: "10px", fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px" }}>// What "Secure Account" Does</p>
              {[
                { color: "var(--pink)", text: "Revokes every active session immediately" },
                { color: "var(--sky)", text: "Signs out all devices including your own" },
                { color: "var(--cream)", text: "Invalidates all refresh tokens" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: i < 2 ? "10px" : 0 }}>
                  <div style={{ width: "20px", height: "20px", minWidth: "20px", background: item.color, border: "2px solid #0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, fontFamily: "Space Grotesk, sans-serif", marginTop: "1px" }}>{i + 1}</div>
                  <p style={{ fontSize: "13px", color: "#444", margin: 0, lineHeight: 1.6 }}>{item.text}</p>
                </div>
              ))}
            </div>

            {/* Confirm state or CTA */}
            {state === "confirm" ? (
              <div style={{ border: "2px solid #0a0a0a", padding: "20px 24px", background: "var(--cream)" }}>
                <p className="font-grotesk" style={{ fontSize: "13px", fontWeight: 700, color: "#0a0a0a", marginBottom: "6px" }}>Are you sure?</p>
                <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.6, marginBottom: "18px" }}>
                  This will sign you out of <strong>all devices</strong>, including your current session. You'll need to log in again.
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="btn btn-pink" style={{ flex: 1 }} onClick={handleRevoke}>
                    Yes, Revoke All Sessions
                  </button>
                  <button className="btn btn-white" onClick={() => setState("idle")}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <button className="btn btn-pink btn-lg" style={{ width: "100%", justifyContent: "center" }} onClick={() => setState("confirm")}>
                  🔒 Secure My Account
                </button>
                <p style={{ fontSize: "12px", color: "#888", textAlign: "center" }}>
                  If this was you,{" "}
                  <Link href="/login" style={{ color: "#0a0a0a", fontWeight: 600 }}>
                    sign in normally →
                  </Link>
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
