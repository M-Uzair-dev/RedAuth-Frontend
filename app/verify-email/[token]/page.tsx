"use client";

import { useState } from "react";
import Link from "next/link";

type State = "idle" | "verifying" | "success" | "error";

export default function VerifyEmailPage() {
  const [state, setState] = useState<State>("idle");

  function handleVerify() {
    setState("verifying");
    setTimeout(() => {
      // Simulate: valid token -> success
      setState("success");
    }, 2200);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "white",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background blobs */}
      <div style={{
        position: "fixed", top: "-8%", left: "-6%",
        width: 340, height: 340,
        background: "var(--sky)", opacity: 0.38,
        filter: "blur(9px)",
        pointerEvents: "none", zIndex: 0,
      }} className="anim-blob" />
      <div style={{
        position: "fixed", bottom: "-10%", right: "-5%",
        width: 300, height: 300,
        background: "var(--pink)", opacity: 0.35,
        filter: "blur(9px)",
        pointerEvents: "none", zIndex: 0,
        animationDelay: "2s",
      }} className="anim-blob" />
      <div style={{
        position: "fixed", top: "45%", right: "10%",
        width: 180, height: 180,
        background: "var(--cream)", opacity: 0.4,
        filter: "blur(8px)",
        pointerEvents: "none", zIndex: 0,
        animationDelay: "4s",
      }} className="anim-blob" />

      {/* Dot grid */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Top bar */}
      <div style={{
        borderBottom: "2px solid var(--black)",
        padding: "16px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "white",
        position: "relative",
        zIndex: 10,
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: "var(--blue)",
            border: "2px solid var(--black)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Space Grotesk", fontWeight: 800, fontSize: 16, color: "white",
            boxShadow: "2px 2px 0 var(--black)",
          }}>N</div>
          <span style={{ fontFamily: "Space Grotesk", fontWeight: 800, fontSize: 18, color: "var(--black)" }}>
            NodeStack
          </span>
        </Link>
        <Link href="/login">
          <button className="btn btn-white btn-sm">Sign In</button>
        </Link>
      </div>

      {/* Main */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
        zIndex: 1,
      }}>
        <div className="anim-hidden anim-pop-in" style={{ width: "100%", maxWidth: 460 }}>

          {/* Idle state */}
          {state === "idle" && (
            <div className="b-card" style={{ padding: "48px 36px", textAlign: "center", boxShadow: "8px 8px 0 var(--black)" }}>
              <div style={{
                width: 80, height: 80,
                background: "var(--sky)",
                border: "2px solid var(--black)",
                boxShadow: "5px 5px 0 var(--black)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36,
                margin: "0 auto 28px",
              }} className="anim-float">
                ✉️
              </div>

              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "var(--sky)",
                border: "2px solid var(--black)",
                padding: "4px 12px",
                marginBottom: 20,
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                boxShadow: "3px 3px 0 var(--black)",
              }}>
                Email Verification
              </div>

              <h1 style={{
                fontFamily: "Space Grotesk",
                fontWeight: 800,
                fontSize: "1.9rem",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 12,
              }}>
                Verify your email
              </h1>

              <p style={{ color: "#555", fontSize: 15, lineHeight: 1.65, marginBottom: 16 }}>
                You clicked the link in your verification email. Press the button below to confirm and activate your account.
              </p>

              <button
                onClick={handleVerify}
                className="btn btn-blue"
                style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "14px 24px" }}
              >
                Verify My Email →
              </button>

              <p style={{ marginTop: 16, fontSize: 13, color: "#888", fontFamily: "Space Grotesk" }}>
                Didn&apos;t request this?{" "}
                <Link href="/" style={{ color: "var(--black)", fontWeight: 700, textDecoration: "underline" }}>
                  Ignore this link
                </Link>
              </p>
            </div>
          )}

          {/* Verifying state */}
          {state === "verifying" && (
            <div className="b-card" style={{ padding: "60px 36px", textAlign: "center", boxShadow: "8px 8px 0 var(--black)" }}>
              <div style={{
                width: 80, height: 80,
                background: "var(--cream)",
                border: "2px solid var(--black)",
                boxShadow: "5px 5px 0 var(--black)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 32px",
              }}>
                <div style={{
                  width: 36, height: 36,
                  border: "4px solid var(--black)",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }} />
              </div>

              <h2 style={{
                fontFamily: "Space Grotesk",
                fontWeight: 800,
                fontSize: "1.7rem",
                letterSpacing: "-0.02em",
                marginBottom: 10,
              }}>
                Verifying...
              </h2>
              <p style={{ color: "#666", fontSize: 15 }}>
                Checking your token with the server.
              </p>

              {/* Progress bar */}
              <div style={{
                marginTop: 32,
                height: 6,
                background: "#eee",
                border: "2px solid var(--black)",
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  background: "var(--blue)",
                  animation: "progress 2.2s ease-out forwards",
                }} />
              </div>
            </div>
          )}

          {/* Success state */}
          {state === "success" && (
            <div className="b-card anim-pop-in" style={{ padding: "48px 36px", textAlign: "center", boxShadow: "8px 8px 0 var(--black)" }}>
              <div style={{
                width: 90, height: 90,
                background: "var(--sky)",
                border: "2px solid var(--black)",
                boxShadow: "5px 5px 0 var(--black)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 40,
                margin: "0 auto 28px",
              }} className="anim-float">
                🎉
              </div>

              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#dcfce7",
                border: "2px solid #16a34a",
                padding: "4px 12px",
                marginBottom: 20,
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                boxShadow: "3px 3px 0 #16a34a",
                color: "#16a34a",
              }}>
                ✓ Email Verified!
              </div>

              <h2 style={{
                fontFamily: "Space Grotesk",
                fontWeight: 800,
                fontSize: "1.9rem",
                letterSpacing: "-0.03em",
                marginBottom: 12,
              }}>
                You&apos;re all set!
              </h2>
              <p style={{ color: "#555", fontSize: 15, lineHeight: 1.65, marginBottom: 28 }}>
                Your email has been verified. You now have full access to your NodeStack account.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Link href="/dashboard">
                  <button className="btn btn-blue" style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "14px 24px" }}>
                    Go to Dashboard →
                  </button>
                </Link>
                <Link href="/">
                  <button className="btn btn-white" style={{ width: "100%", justifyContent: "center" }}>
                    Back to Home
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Error state */}
          {state === "error" && (
            <div className="b-card" style={{ padding: "48px 36px", textAlign: "center", boxShadow: "8px 8px 0 #cc0000", borderColor: "#cc0000" }}>
              <div style={{
                width: 80, height: 80,
                background: "#fff1f1",
                border: "2px solid #cc0000",
                boxShadow: "5px 5px 0 #cc0000",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36,
                margin: "0 auto 28px",
              }}>
                ❌
              </div>

              <h2 style={{ fontFamily: "Space Grotesk", fontWeight: 800, fontSize: "1.7rem", letterSpacing: "-0.02em", marginBottom: 12, color: "#cc0000" }}>
                Invalid Token
              </h2>
              <p style={{ color: "#555", fontSize: 15, lineHeight: 1.65, marginBottom: 28 }}>
                This verification link is invalid or has expired. Request a new one from your dashboard.
              </p>

              <Link href="/login">
                <button className="btn btn-black" style={{ width: "100%", justifyContent: "center" }}>
                  Back to Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
