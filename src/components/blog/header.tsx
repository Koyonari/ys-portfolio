"use client";

interface BlogHeaderProps {
  onBack?: () => void;
}

export default function Header({ onBack }: BlogHeaderProps) {
  return (
    <div
      className="mx-auto max-w-7xl"
      style={{
        padding:
          "clamp(2.5rem,6vw,5rem) clamp(1.25rem,4vw,4rem) clamp(2rem,4vw,3rem)",
      }}
    >
      {/* Back button */}
      <button className="back-btn mb-8" onClick={onBack}>
        <span className="back-btn-arrow">←</span>
        <span>Portfolio</span>
      </button>

      {/* Title block */}
      <div style={{ maxWidth: "640px" }}>
        <p
          className="fade-up"
          style={{
            animationDelay: "0.05s",
            fontSize: "9px",
            letterSpacing: "0.22em",
            color: "var(--muted)",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Writing / Notes / Ideas
        </p>
        <h1
          className="fade-up"
          style={{
            animationDelay: "0.12s",
            fontSize: "clamp(36px, 7vw, 80px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            margin: 0,
          }}
        >
          Blog
        </h1>
        <p
          className="fade-up"
          style={{
            animationDelay: "0.22s",
            fontSize: "clamp(13px, 1.2vw, 15px)",
            lineHeight: 1.7,
            color: "rgba(228,228,223,0.45)",
            marginTop: "16px",
            fontWeight: 300,
            maxWidth: "480px",
          }}
        >
          Thoughts on software, security, and the process of building things.
          Irregular, honest, unedited.
        </p>
      </div>
    </div>
  );
}
