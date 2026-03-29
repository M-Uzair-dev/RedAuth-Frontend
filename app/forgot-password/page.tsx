"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  function validate() {
    if (!email) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
    return "";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 2000);
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
        position: "fixed", top: "-10%", right: "-5%",
        width: 320, height: 320,
        background: "var(--cream)", opacity: 0.42,
        filter: "blur(9px)",
        pointerEvents: "none", zIndex: 0,
      }} className="anim-blob" />
      <div style={{
        position: "fixed", bottom: "-8%", left: "-4%",
        width: 280, height: 280,
        background: "var(--sky)", opacity: 0.38,
        filter: "blur(9px)",
        pointerEvents: "none", zIndex: 0,
        animationDelay: "3s",
      }} className="anim-blob" />

      {/* Top bar */}
      <div style={{
        borderBottom: "2px solid var(--black)",
        padding: "16px 28px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "white",
        position: "relative",
        zIndex: 10,
      }}>
        <Link href="/login" style={{
          textDecoration: "none",
          fontFamily: "Space Grotesk",
          fontWeight: 700,
          fontSize: 14,
          color: "var(--black)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          border: "2px solid var(--black)",
          boxShadow: "2px 2px 0 var(--black)",
          transition: "transform 0.08s, box-shadow 0.08s",
        }}
          className="btn btn-white btn-sm"
        >
          ← Back to Login
        </Link>
        <span style={{ fontFamily: "Space Grotesk", fontWeight: 800, fontSize: 18, color: "var(--black)" }}>
          NodeStack
        </span>
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
        <div className="anim-hidden anim-pop-in" style={{ width: "100%", maxWidth: 440 }}>
          {!sent ? (
            <div className="b-card" style={{ padding: "40px 36px", boxShadow: "8px 8px 0 var(--black)" }}>
              {/* Lock icon */}
              <div style={{
                width: 64, height: 64,
                background: "var(--cream)",
                border: "2px solid var(--black)",
                boxShadow: "4px 4px 0 var(--black)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28,
                marginBottom: 24,
              }} className="anim-float">
                🔑
              </div>

              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "var(--sky)",
                border: "2px solid var(--black)",
                padding: "4px 12px",
                marginBottom: 16,
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                boxShadow: "3px 3px 0 var(--black)",
              }}>
                Password Reset
              </div>

              <h1 style={{
                fontFamily: "Space Grotesk",
                fontWeight: 800,
                fontSize: "1.9rem",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 10,
              }}>
                Forgot your password?
              </h1>
              <p style={{ color: "#666", fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
                No worries — enter your email below and we&apos;ll send you a reset link right away.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 24 }}>
                  <label style={{
                    display: "block",
                    fontFamily: "Space Grotesk",
                    fontWeight: 700,
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 6,
                  }}>
                    Email Address <span style={{ color: "#e00" }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (touched) setError(validate());
                    }}
                    onBlur={() => {
                      setTouched(true);
                      setError(validate());
                    }}
                    placeholder="you@example.com"
                    className="b-input"
                    style={{
                      borderColor: touched && error ? "#cc0000" : "var(--black)",
                      boxShadow: touched && error ? "4px 4px 0 #cc0000" : undefined,
                    }}
                    autoComplete="email"
                    disabled={loading}
                  />
                  {touched && error && (
                    <p style={{ color: "#cc0000", fontSize: 13, marginTop: 4, fontWeight: 500 }}>
                      ↳ {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-cream"
                  disabled={loading}
                  style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "14px 24px" }}
                >
                  {loading ? (
                    <>
                      <span className="spinner" style={{ marginRight: 8 }} />
                      Sending reset link...
                    </>
                  ) : (
                    "Send Reset Link →"
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Success state */
            <div className="b-card anim-pop-in" style={{ padding: "48px 36px", textAlign: "center", boxShadow: "8px 8px 0 var(--black)" }}>
              {/* Success icon */}
              <div style={{
                width: 80, height: 80,
                background: "var(--sky)",
                border: "2px solid var(--black)",
                boxShadow: "5px 5px 0 var(--black)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36,
                margin: "0 auto 24px",
              }} className="anim-float">
                📨
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
                ✓ Email Sent!
              </div>

              <h2 style={{
                fontFamily: "Space Grotesk",
                fontWeight: 800,
                fontSize: "1.8rem",
                letterSpacing: "-0.02em",
                marginBottom: 12,
              }}>
                Check your inbox.
              </h2>

              <p style={{ color: "#555", fontSize: 15, lineHeight: 1.65, marginBottom: 8 }}>
                We sent a reset link to
              </p>
              <p style={{
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 24,
                background: "var(--cream)",
                border: "2px solid var(--black)",
                padding: "8px 16px",
                display: "inline-block",
                boxShadow: "3px 3px 0 var(--black)",
              }}>
                {email}
              </p>

              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
                Didn&apos;t receive it? Check your spam folder or{" "}
                <button
                  onClick={() => { setSent(false); }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--black)", fontWeight: 700, textDecoration: "underline",
                    fontSize: 14, fontFamily: "Space Grotesk",
                  }}
                >
                  try again
                </button>.
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
