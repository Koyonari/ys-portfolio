"use client";
interface HeaderProps {
  onBack?: () => void;
}
export default function Header({ onBack }: HeaderProps) {
  return (
    <div className="mx-auto max-w-7xl px-[clamp(1.25rem,4vw,4rem)] py-[clamp(2.5rem,6vw,5rem)] pb-[clamp(2rem,4vw,3rem)]">
      {/* Back button */}
      <button className="back-btn mb-8" onClick={() => { window.location.href = "/"; }}>
        <span className="back-btn-arrow">←</span>
        <span>Portfolio</span>
      </button>
      {/* Title block */}
      <div className="max-w-[640px]">
        <p
          className="fade-up mb-4 text-xs uppercase tracking-[0.22em] text-[var(--muted)]"
          style={{ animationDelay: "0.05s" }}
        >
          Writing / Notes / Ideas
        </p>
        <h1
          className="fade-up m-0 text-[clamp(36px,7vw,80px)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--fg)]"
          style={{ animationDelay: "0.12s" }}
        >
          Blog
        </h1>
        <p
          className="fade-up mt-4 max-w-[480px] text-[clamp(13px,1.2vw,15px)] font-light leading-[1.7] text-[rgba(228,228,223,0.45)]"
          style={{ animationDelay: "0.22s" }}
        >
          Thoughts on software, random thoughts and idealogies.
        </p>
      </div>
    </div>
  );
}
