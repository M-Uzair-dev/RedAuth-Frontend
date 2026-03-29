"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Session {
  id: string;
  device: string;
  os: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
  ip: string;
}

interface ModalConfig {
  title: string;
  message: string;
  confirmLabel: string;
  confirmColor: string;
  onConfirm: () => void;
}

interface Toast {
  id: number;
  message: string;
  color: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_SESSIONS: Session[] = [
  { id: "s1", device: "MacBook Pro", os: "macOS Sonoma", browser: "Chrome 123", location: "New York, US", lastActive: "Active now", isCurrent: true, ip: "203.0.113.1" },
  { id: "s2", device: "iPhone 15 Pro", os: "iOS 17.4", browser: "Safari Mobile", location: "New York, US", lastActive: "2 hours ago", isCurrent: false, ip: "203.0.113.2" },
  { id: "s3", device: "Windows PC", os: "Windows 11", browser: "Firefox 124", location: "London, UK", lastActive: "Yesterday", isCurrent: false, ip: "198.51.100.5" },
];

// ─── Components ───────────────────────────────────────────────────────────────
function ConfirmModal({ config, onClose }: { config: ModalConfig; onClose: () => void }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="anim-modal-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          border: "2px solid var(--black)",
          boxShadow: "8px 8px 0 var(--black)",
          padding: "32px 28px",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <h3 style={{ fontFamily: "Space Grotesk", fontWeight: 800, fontSize: "1.3rem", marginBottom: 10 }}>
          {config.title}
        </h3>
        <p style={{ color: "#555", fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
          {config.message}
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={onClose}
            className="btn btn-white"
            style={{ flex: 1, justifyContent: "center" }}
          >
            Cancel
          </button>
          <button
            onClick={() => { config.onConfirm(); onClose(); }}
            className="btn"
            style={{
              flex: 1,
              justifyContent: "center",
              background: config.confirmColor,
              color: config.confirmColor === "#cc0000" ? "white" : "var(--black)",
              borderColor: config.confirmColor === "#cc0000" ? "#cc0000" : "var(--black)",
              boxShadow: "4px 4px 0 var(--black)",
            }}
          >
            {config.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function ToastNotification({ toast, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 4000);
    return () => clearTimeout(t);
  }, [toast.id, onDismiss]);

  return (
    <div
      className="toast"
      style={{ background: toast.color, display: "flex", alignItems: "center", gap: 10 }}
    >
      <span>{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "auto", fontSize: 16, lineHeight: 1, color: "inherit" }}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

function SkeletonSessionCard() {
  return (
    <div style={{
      border: "2px solid #e0e0e0",
      padding: "20px 24px",
      display: "flex",
      alignItems: "flex-start",
      gap: 16,
      marginBottom: 16,
    }}>
      <div className="skeleton" style={{ width: 44, height: 44, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div className="skeleton" style={{ width: "45%", height: 16, marginBottom: 8 }} />
        <div className="skeleton" style={{ width: "60%", height: 12, marginBottom: 6 }} />
        <div className="skeleton" style={{ width: "35%", height: 12 }} />
      </div>
      <div className="skeleton" style={{ width: 80, height: 34, flexShrink: 0 }} />
    </div>
  );
}

function SkeletonProfile() {
  return (
    <div>
      <div className="skeleton" style={{ width: "30%", height: 14, marginBottom: 8 }} />
      <div className="skeleton" style={{ width: "100%", height: 44, marginBottom: 20 }} />
      <div className="skeleton" style={{ width: "30%", height: 14, marginBottom: 8 }} />
      <div className="skeleton" style={{ width: "100%", height: 44, marginBottom: 24 }} />
      <div className="skeleton" style={{ width: 140, height: 44 }} />
    </div>
  );
}

// ─── Session icon ──────────────────────────────────────────────────────────────
function DeviceIcon({ device }: { device: string }) {
  const d = device.toLowerCase();
  const isPhone = d.includes("iphone") || d.includes("android") || d.includes("mobile");
  const isTablet = d.includes("ipad") || d.includes("tablet");

  return (
    <div style={{
      width: 48, height: 48,
      background: "var(--sky)",
      border: "2px solid var(--black)",
      boxShadow: "3px 3px 0 var(--black)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 22, flexShrink: 0,
    }}>
      {isPhone ? "📱" : isTablet ? "📊" : "💻"}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"sessions" | "profile" | "security">("sessions");
  const [emailVerified] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const [modal, setModal] = useState<ModalConfig | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastId, setToastId] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sessions
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);

  // Profile
  const [profileLoading, setProfileLoading] = useState(true);
  const [name, setName] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileName, setProfileName] = useState("Alex Johnson");

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  const addToast = useCallback((message: string, color = "var(--sky)") => {
    const id = toastId + 1;
    setToastId(id);
    setToasts((t) => [...t, { id, message, color }]);
  }, [toastId]);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  // Load sessions
  useEffect(() => {
    const t = setTimeout(() => {
      setSessions(MOCK_SESSIONS);
      setSessionsLoading(false);
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  // Load profile
  useEffect(() => {
    const t = setTimeout(() => {
      setName("Alex Johnson");
      setProfileLoading(false);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  function handleResendVerification() {
    setResendLoading(true);
    setTimeout(() => {
      setResendLoading(false);
      setResendSent(true);
      addToast("✉️ Verification email sent!", "var(--sky)");
      setTimeout(() => setResendSent(false), 8000);
    }, 1800);
  }

  function handleRevokeSession(session: Session) {
    setModal({
      title: "Revoke Session",
      message: `Are you sure you want to revoke the session on "${session.device}" (${session.location})? That device will be signed out immediately.`,
      confirmLabel: "Revoke Access",
      confirmColor: "#cc0000",
      onConfirm: () => {
        setSessions((prev) => prev.filter((s) => s.id !== session.id));
        addToast(`Session on ${session.device} has been revoked.`, "var(--cream)");
      },
    });
  }

  function handleRevokeAll() {
    setModal({
      title: "Revoke All Other Sessions",
      message: "This will sign out all devices except your current one. This action cannot be undone.",
      confirmLabel: "Revoke All",
      confirmColor: "#cc0000",
      onConfirm: () => {
        setSessions((prev) => prev.filter((s) => s.isCurrent));
        addToast("All other sessions have been revoked.", "var(--cream)");
      },
    });
  }

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { addToast("Name cannot be empty.", "#fff1f1"); return; }
    setModal({
      title: "Save Profile Changes",
      message: `Update your display name to "${name.trim()}"?`,
      confirmLabel: "Save Changes",
      confirmColor: "var(--blue)",
      onConfirm: () => {
        setProfileSaving(true);
        setTimeout(() => {
          setProfileName(name.trim());
          setProfileSaving(false);
          addToast("✅ Profile updated successfully!", "var(--sky)");
        }, 1200);
      },
    });
  }

  function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!currentPassword) errs.current = "Current password is required.";
    if (!newPassword) errs.new = "New password is required.";
    else if (newPassword.length < 8) errs.new = "Must be at least 8 characters.";
    if (!confirmPassword) errs.confirm = "Please confirm your password.";
    else if (newPassword !== confirmPassword) errs.confirm = "Passwords do not match.";
    if (newPassword === currentPassword && currentPassword) errs.new = "New password must differ from current.";
    setPasswordErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setModal({
      title: "Change Password",
      message: "Are you sure you want to update your password? You will remain signed in.",
      confirmLabel: "Update Password",
      confirmColor: "var(--blue)",
      onConfirm: () => {
        setPasswordSaving(true);
        setTimeout(() => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setPasswordErrors({});
          setPasswordSaving(false);
          addToast("🔒 Password changed successfully!", "var(--sky)");
        }, 1500);
      },
    });
  }

  function handleLogout() {
    setModal({
      title: "Sign Out",
      message: "Are you sure you want to sign out of your current session?",
      confirmLabel: "Sign Out",
      confirmColor: "#cc0000",
      onConfirm: () => router.push("/login"),
    });
  }

  const tabs = [
    { key: "sessions", label: "Active Sessions", icon: "🖥️" },
    { key: "profile", label: "Profile", icon: "👤" },
    { key: "security", label: "Security", icon: "🔒" },
  ] as const;

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f8", display: "flex", flexDirection: "column" }}>

      {/* ── Email not verified banner ────────────────────────────────────── */}
      {!emailVerified && (
        <div className="banner" style={{ background: "var(--cream)", borderBottom: "2px solid var(--black)" }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <span style={{ color: "var(--black)", flex: 1 }}>
            Your email address is not verified. Verify it to access all features.
          </span>
          {resendSent ? (
            <span style={{ background: "#dcfce7", border: "2px solid #16a34a", padding: "4px 12px", color: "#16a34a", fontSize: 13 }}>
              ✓ Email sent!
            </span>
          ) : (
            <button
              onClick={handleResendVerification}
              className="btn btn-black btn-sm"
              disabled={resendLoading}
              style={{ flexShrink: 0 }}
            >
              {resendLoading ? <><span className="spinner" style={{ marginRight: 6, width: 14, height: 14 }} />Sending...</> : "Resend Email"}
            </button>
          )}
        </div>
      )}

      {/* ── Top Navbar ──────────────────────────────────────────────────── */}
      <header style={{
        background: "white",
        borderBottom: "2px solid var(--black)",
        padding: "14px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34,
            background: "var(--blue)",
            border: "2px solid var(--black)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Space Grotesk", fontWeight: 800, fontSize: 17, color: "white",
            boxShadow: "2px 2px 0 var(--black)",
          }}>N</div>
          <span style={{ fontFamily: "Space Grotesk", fontWeight: 800, fontSize: 18, color: "var(--black)" }}>
            NodeStack
          </span>
        </Link>

        {/* Desktop: user info + logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "6px 14px",
            border: "2px solid var(--black)",
            boxShadow: "3px 3px 0 var(--black)",
            background: "var(--cream)",
          }}>
            <div style={{
              width: 28, height: 28,
              background: "var(--pink)",
              border: "2px solid var(--black)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Space Grotesk", fontWeight: 800, fontSize: 13,
            }}>
              {profileName.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 14, color: "var(--black)" }}>
              {profileName}
            </span>
          </div>
          <button onClick={handleLogout} className="btn btn-white btn-sm">
            Sign Out
          </button>
        </div>
      </header>

      {/* ── Main layout ──────────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        maxWidth: 1000,
        margin: "0 auto",
        padding: "32px 24px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}>
        {/* Page title */}
        <div className="anim-hidden anim-slide-up">
          <h1 style={{
            fontFamily: "Space Grotesk",
            fontWeight: 800,
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            letterSpacing: "-0.03em",
            marginBottom: 4,
          }}>
            Dashboard
          </h1>
          <p style={{ color: "#666", fontSize: 14, fontFamily: "Space Grotesk", fontWeight: 500 }}>
            Manage your sessions, profile, and security settings.
          </p>
        </div>

        {/* Tab bar */}
        <div
          className="anim-hidden anim-slide-up delay-100"
          style={{
            background: "white",
            border: "2px solid var(--black)",
            boxShadow: "4px 4px 0 var(--black)",
            display: "flex",
            overflow: "auto",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`tab-btn ${tab === t.key ? "active" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* ── Sessions tab ──────────────────────────────────────────────── */}
        {tab === "sessions" && (
          <div className="anim-hidden anim-slide-up delay-200">
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
              flexWrap: "wrap",
              gap: 12,
            }}>
              <div>
                <h2 style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: "1.2rem", marginBottom: 2 }}>
                  Active Sessions
                </h2>
                <p style={{ color: "#666", fontSize: 13 }}>
                  Devices currently signed in to your account.
                </p>
              </div>
              {!sessionsLoading && sessions.filter((s) => !s.isCurrent).length > 0 && (
                <button onClick={handleRevokeAll} className="btn btn-white btn-sm">
                  Revoke All Others
                </button>
              )}
            </div>

            {sessionsLoading ? (
              <div style={{ background: "white", border: "2px solid var(--black)", boxShadow: "4px 4px 0 var(--black)", padding: "8px 0" }}>
                <SkeletonSessionCard />
                <SkeletonSessionCard />
                <SkeletonSessionCard />
              </div>
            ) : (
              <div style={{ background: "white", border: "2px solid var(--black)", boxShadow: "4px 4px 0 var(--black)" }}>
                {sessions.map((session, i) => (
                  <div
                    key={session.id}
                    style={{
                      padding: "20px 24px",
                      borderBottom: i < sessions.length - 1 ? "2px solid #eee" : "none",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 16,
                      flexWrap: "wrap",
                      background: session.isCurrent ? "rgba(137, 212, 255, 0.08)" : "white",
                      transition: "background 0.2s",
                    }}
                  >
                    <DeviceIcon device={session.device} />

                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 15 }}>
                          {session.device}
                        </span>
                        {session.isCurrent && (
                          <span style={{
                            background: "var(--sky)",
                            border: "2px solid var(--black)",
                            padding: "1px 8px",
                            fontFamily: "Space Grotesk",
                            fontWeight: 700,
                            fontSize: 11,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}>
                            Current
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 13, color: "#555", marginBottom: 3 }}>
                        {session.os} · {session.browser}
                      </p>
                      <p style={{ fontSize: 13, color: "#888" }}>
                        {session.location} · {session.ip}
                      </p>
                      <p style={{ fontSize: 12, color: "#999", marginTop: 4, fontFamily: "Space Grotesk", fontWeight: 600 }}>
                        {session.lastActive === "Active now" ? (
                          <span style={{ color: "#22c55e" }}>● Active now</span>
                        ) : (
                          `Last active: ${session.lastActive}`
                        )}
                      </p>
                    </div>

                    {!session.isCurrent && (
                      <button
                        onClick={() => handleRevokeSession(session)}
                        className="btn btn-sm"
                        style={{
                          background: "#fff1f1",
                          borderColor: "#cc0000",
                          color: "#cc0000",
                          boxShadow: "3px 3px 0 var(--black)",
                          flexShrink: 0,
                          alignSelf: "center",
                        }}
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                ))}

                {sessions.length === 0 && (
                  <div style={{ padding: "48px 24px", textAlign: "center" }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>🔒</div>
                    <p style={{ fontFamily: "Space Grotesk", fontWeight: 600, color: "#888" }}>No active sessions.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Profile tab ───────────────────────────────────────────────── */}
        {tab === "profile" && (
          <div className="anim-hidden anim-slide-up delay-200">
            <div style={{
              background: "white",
              border: "2px solid var(--black)",
              boxShadow: "4px 4px 0 var(--black)",
              overflow: "hidden",
            }}>
              {/* Header */}
              <div style={{
                padding: "20px 28px",
                background: "var(--pink)",
                borderBottom: "2px solid var(--black)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}>
                <div style={{
                  width: 56, height: 56,
                  background: "white",
                  border: "2px solid var(--black)",
                  boxShadow: "3px 3px 0 var(--black)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "Space Grotesk", fontWeight: 800, fontSize: 24,
                }}>
                  {profileName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 style={{ fontFamily: "Space Grotesk", fontWeight: 800, fontSize: "1.2rem", marginBottom: 2 }}>
                    {profileName}
                  </h2>
                  <p style={{ fontSize: 13, color: "#333" }}>
                    demo@nodestack.dev
                    {!emailVerified && (
                      <span style={{
                        marginLeft: 8,
                        background: "var(--cream)",
                        border: "2px solid var(--black)",
                        padding: "1px 6px",
                        fontFamily: "Space Grotesk",
                        fontWeight: 700,
                        fontSize: 11,
                        color: "#333",
                      }}>
                        Unverified
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Form */}
              <div style={{ padding: "28px" }}>
                {profileLoading ? (
                  <SkeletonProfile />
                ) : (
                  <form onSubmit={handleSaveProfile}>
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
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="b-input"
                        style={{ maxWidth: 400 }}
                        placeholder="Your name"
                        disabled={profileSaving}
                      />
                    </div>

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
                        Email Address
                      </label>
                      <input
                        type="email"
                        value="demo@nodestack.dev"
                        className="b-input"
                        style={{
                          maxWidth: 400,
                          background: "#f5f5f5",
                          cursor: "not-allowed",
                          opacity: 0.7,
                        }}
                        disabled
                        readOnly
                      />
                      <p style={{ fontSize: 12, color: "#888", marginTop: 4, fontFamily: "Space Grotesk" }}>
                        Email address cannot be changed in demo mode.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-pink"
                      disabled={profileSaving || name.trim() === profileName}
                    >
                      {profileSaving ? <><span className="spinner" style={{ marginRight: 8 }} />Saving...</> : "Save Changes"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Security tab ──────────────────────────────────────────────── */}
        {tab === "security" && (
          <div className="anim-hidden anim-slide-up delay-200" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Change password */}
            <div style={{
              background: "white",
              border: "2px solid var(--black)",
              boxShadow: "4px 4px 0 var(--black)",
              overflow: "hidden",
            }}>
              <div style={{
                padding: "16px 28px",
                background: "var(--sky)",
                borderBottom: "2px solid var(--black)",
              }}>
                <h2 style={{ fontFamily: "Space Grotesk", fontWeight: 800, fontSize: "1.1rem" }}>
                  🔒 Change Password
                </h2>
              </div>

              <div style={{ padding: "28px" }}>
                <form onSubmit={handleChangePassword}>
                  {/* Current password */}
                  <div style={{ marginBottom: 18 }}>
                    <label style={{
                      display: "block",
                      fontFamily: "Space Grotesk",
                      fontWeight: 700,
                      fontSize: 13,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 6,
                    }}>
                      Current Password <span style={{ color: "#e00" }}>*</span>
                    </label>
                    <div style={{ position: "relative", maxWidth: 400 }}>
                      <input
                        type={showCurrentPass ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="b-input"
                        style={{
                          paddingRight: 48,
                          borderColor: passwordErrors.current ? "#cc0000" : "var(--black)",
                          boxShadow: passwordErrors.current ? "4px 4px 0 var(--black)" : undefined,
                        }}
                        placeholder="••••••••"
                        disabled={passwordSaving}
                        autoComplete="current-password"
                      />
                      <button type="button" onClick={() => setShowCurrentPass(!showCurrentPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#666" }}>
                        {showCurrentPass ? "🙈" : "👁️"}
                      </button>
                    </div>
                    {passwordErrors.current && <p style={{ color: "#cc0000", fontSize: 13, marginTop: 4, fontWeight: 500 }}>↳ {passwordErrors.current}</p>}
                  </div>

                  {/* New password */}
                  <div style={{ marginBottom: 18 }}>
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
                    <div style={{ position: "relative", maxWidth: 400 }}>
                      <input
                        type={showNewPass ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="b-input"
                        style={{
                          paddingRight: 48,
                          borderColor: passwordErrors.new ? "#cc0000" : "var(--black)",
                          boxShadow: passwordErrors.new ? "4px 4px 0 var(--black)" : undefined,
                        }}
                        placeholder="Min. 8 characters"
                        disabled={passwordSaving}
                        autoComplete="new-password"
                      />
                      <button type="button" onClick={() => setShowNewPass(!showNewPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#666" }}>
                        {showNewPass ? "🙈" : "👁️"}
                      </button>
                    </div>
                    {passwordErrors.new && <p style={{ color: "#cc0000", fontSize: 13, marginTop: 4, fontWeight: 500 }}>↳ {passwordErrors.new}</p>}
                  </div>

                  {/* Confirm password */}
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
                      Confirm New Password <span style={{ color: "#e00" }}>*</span>
                    </label>
                    <div style={{ position: "relative", maxWidth: 400 }}>
                      <input
                        type={showConfirmPass ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="b-input"
                        style={{
                          paddingRight: 48,
                          borderColor: passwordErrors.confirm ? "#cc0000" : "var(--black)",
                          boxShadow: passwordErrors.confirm ? "4px 4px 0 var(--black)" : undefined,
                        }}
                        placeholder="Re-enter new password"
                        disabled={passwordSaving}
                        autoComplete="new-password"
                      />
                      <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#666" }}>
                        {showConfirmPass ? "🙈" : "👁️"}
                      </button>
                    </div>
                    {/* Match indicator */}
                    {confirmPassword && (
                      <p style={{
                        fontSize: 12, marginTop: 4, fontWeight: 600, fontFamily: "Space Grotesk",
                        color: newPassword === confirmPassword ? "#22c55e" : "#cc0000",
                      }}>
                        {newPassword === confirmPassword ? "✓ Passwords match" : "✗ Passwords don't match"}
                      </p>
                    )}
                    {passwordErrors.confirm && <p style={{ color: "#cc0000", fontSize: 13, marginTop: 4, fontWeight: 500 }}>↳ {passwordErrors.confirm}</p>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-sky"
                    disabled={passwordSaving}
                  >
                    {passwordSaving ? <><span className="spinner" style={{ marginRight: 8 }} />Updating...</> : "Update Password"}
                  </button>
                </form>
              </div>
            </div>

            {/* Danger zone */}
            <div style={{
              background: "white",
              border: "2px solid #cc0000",
              boxShadow: "4px 4px 0 var(--black)",
              overflow: "hidden",
            }}>
              <div style={{
                padding: "16px 28px",
                background: "#fff1f1",
                borderBottom: "2px solid #cc0000",
              }}>
                <h2 style={{ fontFamily: "Space Grotesk", fontWeight: 800, fontSize: "1.1rem", color: "#cc0000" }}>
                  ⚠️ Danger Zone
                </h2>
              </div>
              <div style={{ padding: "24px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <p style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 14, marginBottom: 2 }}>
                      Sign out everywhere
                    </p>
                    <p style={{ color: "#666", fontSize: 13 }}>
                      Revoke all active sessions including this one.
                    </p>
                  </div>
                  <button
                    onClick={() => setModal({
                      title: "Sign Out Everywhere",
                      message: "This will invalidate all your sessions on all devices, including this one. You will be redirected to the login page.",
                      confirmLabel: "Sign Out Everywhere",
                      confirmColor: "#cc0000",
                      onConfirm: () => router.push("/login"),
                    })}
                    className="btn btn-sm"
                    style={{ background: "#fff1f1", borderColor: "#cc0000", color: "#cc0000", boxShadow: "3px 3px 0 var(--black)", flexShrink: 0 }}
                  >
                    Sign Out All
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      {modal && (
        <ConfirmModal config={modal} onClose={() => setModal(null)} />
      )}

      {/* ── Toasts ─────────────────────────────────────────────────────────── */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
        {toasts.map((t) => (
          <ToastNotification key={t.id} toast={t} onDismiss={dismissToast} />
        ))}
      </div>

      {/* suppress unused vars warning */}
      <style>{`
        @media (max-width: 600px) {
          .tab-btn span:last-child { display: none; }
        }
      `}</style>
    </div>
  );
}
