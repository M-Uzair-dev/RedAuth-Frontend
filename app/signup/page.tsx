"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: "", color: "#eee" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "#e00" };
  if (score === 2) return { score: 2, label: "Fair", color: "#f90" };
  if (score === 3) return { score: 3, label: "Good", color: "#44ACFF" };
  return { score: 4, label: "Strong", color: "#22c55e" };
}

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; password?: boolean }>({});

  const strength = getPasswordStrength(password);

  function validate() {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Name is required.";
    else if (name.trim().length < 2) e.name = "Name must be at least 2 characters.";
    if (!email) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 8) e.password = "Password must be at least 8 characters.";
    return e;
  }

  function handleBlur(field: "name" | "email" | "password") {
    setTouched((t) => ({ ...t, [field]: true }));
    const errs = validate();
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setTouched({ name: true, email: true, password: true });
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
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
        position: "fixed", top: "-12%", left: "-5%",
        width: 360, height: 360,
        background: "var(--pink)", opacity: 0.35,
        filter: "blur(9px)",
        pointerEvents: "none", zIndex: 0,
      }} className="anim-blob" />
      <div style={{
        position: "fixed", bottom: "-10%", right: "-4%",
        width: 300, height: 300,
        background: "var(--cream)", opacity: 0.4,
        filter: "blur(9px)",
        pointerEvents: "none", zIndex: 0,
        animationDelay: "2.5s",
      }} className="anim-blob" />
      <div style={{
        position: "fixed", top: "40%", right: "5%",
        width: 200, height: 200,
        background: "var(--sky)", opacity: 0.38,
        filter: "blur(8px)",
        pointerEvents: "none", zIndex: 0,
        animationDelay: "1.5s",
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
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--black)", fontWeight: 700, textDecoration: "underline" }}>
            Sign in
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
          style={{ width: "100%", maxWidth: 480 }}
        >
          <div className="b-card" style={{ padding: "40px 36px", boxShadow: "8px 8px 0 var(--black)" }}>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "var(--pink)",
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
                ✨ New Account
              </div>
              <h1 style={{
                fontFamily: "Space Grotesk",
                fontWeight: 800,
                fontSize: "2rem",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 6,
              }}>
                Join NodeStack.
              </h1>
              <p style={{ color: "#666", fontSize: 15 }}>
                Create your account and explore the demo.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
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
                  Full Name <span style={{ color: "#e00" }}>*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => handleBlur("name")}
                  placeholder="John Smith"
                  className="b-input"
                  style={{
                    borderColor: touched.name && errors.name ? "#cc0000" : "var(--black)",
                    boxShadow: touched.name && errors.name ? "4px 4px 0 #cc0000" : undefined,
                  }}
                  autoComplete="name"
                  disabled={loading}
                />
                {touched.name && errors.name && (
                  <p style={{ color: "#cc0000", fontSize: 13, marginTop: 4, fontWeight: 500 }}>
                    ↳ {errors.name}
                  </p>
                )}
              </div>

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
              <div style={{ marginBottom: 28 }}>
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
                    placeholder="Min. 8 characters"
                    className="b-input"
                    style={{
                      paddingRight: 48,
                      borderColor: touched.password && errors.password ? "#cc0000" : "var(--black)",
                      boxShadow: touched.password && errors.password ? "4px 4px 0 #cc0000" : undefined,
                    }}
                    autoComplete="new-password"
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

                {/* Password strength */}
                {password && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                      {[1, 2, 3, 4].map((level) => (
                        <div key={level} style={{
                          flex: 1,
                          height: 4,
                          border: "1px solid var(--black)",
                          background: strength.score >= level ? strength.color : "#eee",
                          transition: "background 0.3s",
                        }} />
                      ))}
                    </div>
                    <p style={{
                      fontSize: 12,
                      fontFamily: "Space Grotesk",
                      fontWeight: 600,
                      color: strength.color,
                    }}>
                      Password strength: {strength.label}
                    </p>
                  </div>
                )}

                {touched.password && errors.password && (
                  <p style={{ color: "#cc0000", fontSize: 13, marginTop: 4, fontWeight: 500 }}>
                    ↳ {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-pink"
                disabled={loading}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: 16,
                  padding: "14px 24px",
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner" style={{ marginRight: 8 }} />
                    Creating account...
                  </>
                ) : (
                  "Create Account →"
                )}
              </button>
            </form>

            <div style={{
              margin: "24px 0",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ flex: 1, height: 2, background: "var(--black)" }} />
              <span style={{ fontFamily: "Space Grotesk", fontWeight: 600, fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em" }}>or</span>
              <div style={{ flex: 1, height: 2, background: "var(--black)" }} />
            </div>

            <p style={{ textAlign: "center", fontFamily: "Space Grotesk", fontWeight: 600, fontSize: 14, color: "#555" }}>
              Have an account?{" "}
              <Link href="/login" style={{ color: "var(--black)", textDecoration: "underline", fontWeight: 700 }}>
                Sign in
              </Link>
            </p>
          </div>

          <p style={{ textAlign: "center", fontSize: 12, color: "#999", marginTop: 16, fontFamily: "Space Grotesk" }}>
            By signing up, you agree to the (demo) Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
