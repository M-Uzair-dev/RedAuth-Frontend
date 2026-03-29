"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiFetch, ApiError } from "../../../lib/api";

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "", color: "#eee" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { score: 1, label: "Weak", color: "#e00" };
  if (score === 2) return { score: 2, label: "Fair", color: "#f90" };
  if (score === 3) return { score: 3, label: "Good", color: "var(--blue)" };
  return { score: 4, label: "Strong", color: "#22c55e" };
}

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params.token;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [generalError, setGeneralError] = useState("");

  const strength = getPasswordStrength(newPassword);

  function validate() {
    const e = {};
    if (!newPassword) e.new = "New password is required.";
    else if (newPassword.length < 8) e.new = "Must be at least 8 characters.";
    if (!confirmPassword) e.confirm = "Please confirm your password.";
    else if (newPassword !== confirmPassword) e.confirm = "Passwords do not match.";
    return e;
  }

  function handleBlur(field) {
    setTouched((t) => ({ ...t, [field]: true }));
    const errs = validate();
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setTouched({ new: true, confirm: true });
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setGeneralError("");
    setLoading(true);
    try {
      await apiFetch("/auth/resetPassword", {
        method: "POST",
        body: JSON.stringify({ token, newPassword }),
      });
      setSuccess(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setGeneralError(err.message);
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100dvh",
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
        background: "var(--pink)", opacity: 0.35,
        filter: "blur(9px)",
        pointerEvents: "none", zIndex: 0,
      }} className="anim-blob" />
      <div style={{
        position: "fixed", bottom: "-8%", left: "-5%",
        width: 300, height: 300,
        background: "var(--cream)", opacity: 0.4,
        filter: "blur(9px)",
        pointerEvents: "none", zIndex: 0,
        animationDelay: "2.5s",
      }} className="anim-blob" />
      <div style={{
        position: "fixed", top: "40%", left: "8%",
        width: 180, height: 180,
        background: "var(--sky)", opacity: 0.38,
        filter: "blur(8px)",
        pointerEvents: "none", zIndex: 0,
        animationDelay: "1.5s",
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
          }}>R</div>
          <span style={{ fontFamily: "Space Grotesk", fontWeight: 800, fontSize: 18, color: "var(--black)" }}>
            RedAuth
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

          {!success ? (
            <div className="b-card" style={{ padding: "40px 36px", boxShadow: "8px 8px 0 var(--black)" }}>
              <div style={{
                width: 64, height: 64,
                background: "var(--pink)",
                border: "2px solid var(--black)",
                boxShadow: "4px 4px 0 var(--black)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28,
                marginBottom: 24,
              }} className="anim-float">
                🔐
              </div>

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
                Reset Password
              </div>

              <h1 style={{
                fontFamily: "Space Grotesk",
                fontWeight: 800,
                fontSize: "1.9rem",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 10,
              }}>
                Set a new password.
              </h1>
              <p style={{ color: "#666", fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
                Choose a strong password to secure your account. It must be at least 8 characters.
              </p>

              {/* General error */}
              {generalError && (
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
                  {generalError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* New password */}
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
                    New Password <span style={{ color: "#e00" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onBlur={() => handleBlur("new")}
                      placeholder="Min. 8 characters"
                      className="b-input"
                      style={{
                        paddingRight: 48,
                        borderColor: touched.new && errors.new ? "#cc0000" : "var(--black)",
                        boxShadow: touched.new && errors.new ? "4px 4px 0 #cc0000" : undefined,
                      }}
                      autoComplete="new-password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#666", padding: 4 }}
                      aria-label={showNew ? "Hide password" : "Show password"}
                    >
                      {showNew ? "🙈" : "👁️"}
                    </button>
                  </div>

                  {newPassword && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                        {[1, 2, 3, 4].map((level) => (
                          <div key={level} style={{
                            flex: 1, height: 4,
                            border: "1px solid var(--black)",
                            background: strength.score >= level ? strength.color : "#eee",
                            transition: "background 0.3s",
                          }} />
                        ))}
                      </div>
                      <p style={{ fontSize: 12, fontFamily: "Space Grotesk", fontWeight: 600, color: strength.color }}>
                        Strength: {strength.label}
                      </p>
                    </div>
                  )}

                  {touched.new && errors.new && (
                    <p style={{ color: "#cc0000", fontSize: 13, marginTop: 4, fontWeight: 500 }}>↳ {errors.new}</p>
                  )}
                </div>

                {/* Confirm password */}
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
                    Confirm Password <span style={{ color: "#e00" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => handleBlur("confirm")}
                      placeholder="Re-enter new password"
                      className="b-input"
                      style={{
                        paddingRight: 48,
                        borderColor: touched.confirm && errors.confirm ? "#cc0000" : "var(--black)",
                        boxShadow: touched.confirm && errors.confirm ? "4px 4px 0 #cc0000" : undefined,
                      }}
                      autoComplete="new-password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#666", padding: 4 }}
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? "🙈" : "👁️"}
                    </button>
                  </div>

                  {confirmPassword && (
                    <p style={{
                      fontSize: 12, marginTop: 6, fontWeight: 600, fontFamily: "Space Grotesk",
                      color: newPassword === confirmPassword ? "#22c55e" : "#cc0000",
                    }}>
                      {newPassword === confirmPassword ? "✓ Passwords match" : "✗ Passwords don't match"}
                    </p>
                  )}
                  {touched.confirm && errors.confirm && (
                    <p style={{ color: "#cc0000", fontSize: 13, marginTop: 4, fontWeight: 500 }}>↳ {errors.confirm}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-pink"
                  disabled={loading}
                  style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "14px 24px" }}
                >
                  {loading ? (
                    <>
                      <span className="spinner" style={{ marginRight: 8 }} />
                      Resetting password...
                    </>
                  ) : (
                    "Reset Password →"
                  )}
                </button>
              </form>

              <p style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: "#888", fontFamily: "Space Grotesk" }}>
                Remember your password?{" "}
                <Link href="/login" style={{ color: "var(--black)", fontWeight: 700, textDecoration: "underline" }}>
                  Back to login
                </Link>
              </p>
            </div>

          ) : (
            /* Success state */
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
                ✓ Password Reset!
              </div>

              <h2 style={{
                fontFamily: "Space Grotesk",
                fontWeight: 800,
                fontSize: "1.9rem",
                letterSpacing: "-0.03em",
                marginBottom: 12,
              }}>
                All done!
              </h2>
              <p style={{ color: "#555", fontSize: 15, lineHeight: 1.65, marginBottom: 32 }}>
                Your password has been successfully reset. You can now sign in with your new password.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Link href="/login">
                  <button className="btn btn-blue" style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "14px 24px" }}>
                    Sign In Now →
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
        </div>
      </div>
    </div>
  );
}
