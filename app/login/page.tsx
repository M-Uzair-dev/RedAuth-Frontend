"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});

  function validate() {
    const e: typeof errors = {};
    if (!email) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setTouched({ email: true, password: true });
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 2000);
  }

  function handleBlur(field: "email" | "password") {
    setTouched((t) => ({ ...t, [field]: true }));
    const errs = validate();
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
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
        width: 340, height: 340,
        background: "var(--sky)", opacity: 0.38,
        filter: "blur(9px)",
        pointerEvents: "none", zIndex: 0,
      }} className="anim-blob" />
      <div style={{
        position: "fixed", bottom: "-8%", left: "-6%",
        width: 280, height: 280,
        background: "var(--pink)", opacity: 0.35,
        filter: "blur(9px)",
        pointerEvents: "none", zIndex: 0,
        animationDelay: "2s",
      }} className="anim-blob" />

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
        <span style={{ fontFamily: "Space Grotesk", fontWeight: 600, fontSize: 13, color: "#666" }}>
          No account?{" "}
          <Link href="/signup" style={{ color: "var(--black)", fontWeight: 700, textDecoration: "underline" }}>
            Sign up
          </Link>
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
        <div
          className="anim-hidden anim-pop-in"
          style={{
            width: "100%",
            maxWidth: 460,
          }}
        >
          {/* Card */}
          <div className="b-card" style={{ padding: "40px 36px", boxShadow: "8px 8px 0 var(--black)" }}>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "var(--cream)",
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
                🔐 Secure Login
              </div>
              <h1 style={{
                fontFamily: "Space Grotesk",
                fontWeight: 800,
                fontSize: "2rem",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 6,
              }}>
                Welcome back.
              </h1>
              <p style={{ color: "#666", fontSize: 15 }}>
                Sign in to your account to continue.
              </p>
            </div>

            {/* General error */}
            {errors.general && (
              <div style={{
                background: "#fff1f1",
                border: "2px solid #cc0000",
                padding: "12px 16px",
                marginBottom: 20,
                fontFamily: "Space Grotesk",
                fontWeight: 600,
                fontSize: 14,
                color: "#cc0000",
                boxShadow: "3px 3px 0 #cc0000",
              }}>
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div style={{ marginBottom: 20 }}>
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
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder="you@example.com"
                  className="b-input"
                  style={{
                    borderColor: touched.email && errors.email ? "#cc0000" : "var(--black)",
                    boxShadow: touched.email && errors.email ? "4px 4px 0 #cc0000" : undefined,
                  }}
                  autoComplete="email"
                  disabled={loading}
                />
                {touched.email && errors.email && (
                  <p style={{ color: "#cc0000", fontSize: 13, marginTop: 4, fontWeight: 500 }}>
                    ↳ {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div style={{ marginBottom: 8 }}>
                <label style={{
                  display: "block",
                  fontFamily: "Space Grotesk",
                  fontWeight: 700,
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 6,
                }}>
                  Password <span style={{ color: "#e00" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur("password")}
                    placeholder="••••••••"
                    className="b-input"
                    style={{
                      paddingRight: 48,
                      borderColor: touched.password && errors.password ? "#cc0000" : "var(--black)",
                      boxShadow: touched.password && errors.password ? "4px 4px 0 #cc0000" : undefined,
                    }}
                    autoComplete="current-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: 18, lineHeight: 1, color: "#666", padding: 4,
                    }}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p style={{ color: "#cc0000", fontSize: 13, marginTop: 4, fontWeight: 500 }}>
                    ↳ {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot password */}
              <div style={{ textAlign: "right", marginBottom: 28 }}>
                <Link href="/forgot-password" style={{
                  fontFamily: "Space Grotesk",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "var(--black)",
                  textDecoration: "underline",
                }}>
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-blue"
                disabled={loading}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: 16,
                  padding: "14px 24px",
                  position: "relative",
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner" style={{ marginRight: 8 }} />
                    Signing you in...
                  </>
                ) : (
                  "Sign In →"
                )}
              </button>
            </form>

            {/* Divider */}
            <div style={{
              margin: "24px 0",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ flex: 1, height: 2, background: "var(--black)" }} />
              <span style={{ fontFamily: "Space Grotesk", fontWeight: 600, fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                or
              </span>
              <div style={{ flex: 1, height: 2, background: "var(--black)" }} />
            </div>

            <p style={{ textAlign: "center", fontFamily: "Space Grotesk", fontWeight: 600, fontSize: 14, color: "#555" }}>
              New here?{" "}
              <Link href="/signup" style={{ color: "var(--black)", textDecoration: "underline", fontWeight: 700 }}>
                Create an account
              </Link>
            </p>
          </div>

          {/* Bottom note */}
          <p style={{
            textAlign: "center",
            fontSize: 12,
            color: "#999",
            marginTop: 16,
            fontFamily: "Space Grotesk",
          }}>
            This is a demo. Use any email & password.
          </p>
        </div>
      </div>
    </div>
  );
}
