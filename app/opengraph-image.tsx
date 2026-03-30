import { ImageResponse } from "next/og";

export const alt = "RedAuth — Production-Ready Auth Backend for Node.js";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 90px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid dot pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Pink blob */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 80,
            width: 280,
            height: 280,
            background: "#ff6b9d",
            opacity: 0.25,
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />

        {/* Blue blob */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 60,
            width: 220,
            height: 220,
            background: "#4a7bff",
            opacity: 0.2,
            borderRadius: "50%",
            filter: "blur(50px)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            background: "#f5e6d0",
            border: "2.5px solid #0a0a0a",
            boxShadow: "3px 3px 0 rgba(255,255,255,0.15)",
            padding: "6px 18px",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 36,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#0a0a0a",
          }}
        >
          <span style={{ color: "#4a7bff" }}>◆</span>
          Auth Backend v1.0
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 28,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span>Build Production APIs</span>
          <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
            Without{" "}
            <span
              style={{
                background: "#4a7bff",
                padding: "2px 14px",
                border: "2.5px solid white",
                boxShadow: "4px 4px 0 rgba(255,107,157,0.6)",
                display: "flex",
              }}
            >
              the Boilerplate.
            </span>
          </span>
        </div>

        {/* Tech stack pill row */}
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          {[
            { label: "Node.js", bg: "#ff6b9d" },
            { label: "Express", bg: "#87ceeb" },
            { label: "TypeScript", bg: "#f5e6d0" },
            { label: "Redis", bg: "#ff6b9d" },
            { label: "BullMQ", bg: "#87ceeb" },
            { label: "Prisma", bg: "#f5e6d0" },
            { label: "JWT", bg: "#ff6b9d" },
            { label: "Zod v4", bg: "#87ceeb" },
          ].map((t) => (
            <span
              key={t.label}
              style={{
                background: t.bg,
                border: "2px solid #0a0a0a",
                boxShadow: "2px 2px 0 rgba(0,0,0,0.4)",
                padding: "5px 14px",
                fontSize: 16,
                fontWeight: 700,
                color: "#0a0a0a",
                display: "flex",
              }}
            >
              {t.label}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 40 }}>
          {[
            { num: "10+", label: "Core Features" },
            { num: "100%", label: "TypeScript" },
            { num: "0", label: "Config Hell" },
          ].map(({ num, label }) => (
            <div
              key={label}
              style={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <span
                style={{
                  fontWeight: 900,
                  fontSize: 36,
                  lineHeight: 1,
                  color: "white",
                }}
              >
                {num}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            right: 90,
            fontSize: 20,
            color: "#555",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              background: "#4a7bff",
              borderRadius: "50%",
            }}
          />
          redauth.uzairmanan.com
        </div>
      </div>
    ),
    { ...size }
  );
}
