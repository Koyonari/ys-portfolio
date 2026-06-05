"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface WorkItem {
  id: number;
  year: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  imageSrc: string;
  imageAlt: string;
}

const works: WorkItem[] = [
  {
    id: 1,
    year: "2026",
    title: "Portfolio",
    category: "Front-End Development",
    description: "The portfolio site you're looking at right now. Rebuilt from scratch with a focus on scroll-driven interactions, custom cursor effects, and a minimal typographic aesthetic.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS"],
    githubUrl: "https://github.com/Koyonari/ys-portfolio",
    imageSrc: "/works/portfolio.jpg",
    imageAlt: "Portfolio",
  },
  {
    id: 2,
    year: "2025",
    title: "Vestra",
    category: "Full-Stack Development",
    description: "A fashion discovery and wardrobe management app powered by AI outfit suggestions. Combines a Next.js frontend with a Python backend for intelligent styling recommendations.",
    techStack: ["Next.js", "TailwindCSS", "Python"],
    githubUrl: "https://github.com/Koyonari/Vestra_II",
    imageSrc: "/works/vestra.png",
    imageAlt: "Vestra",
  },
  {
    id: 3,
    year: "2024",
    title: "BannerBites",
    category: "Full-Stack Development",
    description: "A dynamic digital signage platform that allows real-time ad placement via a drag-and-drop editor. Built for an assignment in FSDIT03 with WebSocket-driven live updates and S3-backed media storage.",
    techStack: ["React.js", "S3", "WebSocket", "Node.js"],
    githubUrl: "https://github.com/Koyonari/BannerBites_FSDIT03",
    imageSrc: "/works/bannerbites.png",
    imageAlt: "BannerBites",
  },
  {
    id: 4,
    year: "2024",
    title: "PlanHub",
    category: "Mobile App Development",
    description: "An Android productivity app for task and event planning with a clean calendar-driven interface. Developed as a team project for an assignment in MAD24 using native Java and local SQLite storage.",
    techStack: ["Java"],
    githubUrl: "https://github.com/RISHIKEsH12321/MAD24_P01_Team3",
    imageSrc: "/works/planhub.png",
    imageAlt: "PlanHub",
  },
];

const CARD_GAP = 20;
const CARD_WIDTH_RATIO = 0.68;
const SCROLL_PER_STEP_VH = 100;

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [vw, setVw] = useState(1440);
  const [cardWidth, setCardWidth] = useState(0);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);

  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 1024;

  const totalCount = String(works.length).padStart(2, "0");
  const currentNumber = String(activeIndex + 1).padStart(2, "0");

  const openPanel = (work: WorkItem) => {
    setSelectedWork(work);
    setTimeout(() => setPanelVisible(true), 10);
  };

  const closePanel = () => {
    setPanelVisible(false);
    setTimeout(() => setSelectedWork(null), 380);
  };

  const measureCardWidth = useCallback(() => {
    if (!rightPanelRef.current) return;
    setCardWidth(Math.round(rightPanelRef.current.offsetWidth * CARD_WIDTH_RATIO));
  }, []);

  useEffect(() => {
    const update = () => {
      setVw(window.innerWidth);
      measureCardWidth();
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [measureCardWidth]);

  useEffect(() => {
    const t = setTimeout(measureCardWidth, 60);
    return () => clearTimeout(t);
  }, [isMobile, isTablet, measureCardWidth]);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getStepSize = () => {
      if (!rightPanelRef.current) return cardWidth + CARD_GAP;
      return Math.round(rightPanelRef.current.offsetWidth * CARD_WIDTH_RATIO) + CARD_GAP;
    };

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const totalScrollDistance = section.offsetHeight - window.innerHeight;
      if (totalScrollDistance <= 0) return;
      const rawProgress = Math.min(scrolled / totalScrollDistance, 1);
      const snappedIndex = Math.round(rawProgress * (works.length - 1));
      track.style.transform = `translateX(-${snappedIndex * getStepSize()}px)`;
      if (snappedIndex !== activeIndexRef.current) {
        activeIndexRef.current = snappedIndex;
        setActiveIndex(snappedIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cardWidth, isMobile]);

  useEffect(() => {
    if (selectedWork) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedWork]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400&family=Work+Sans:wght@300;400&display=swap');
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
      `}</style>

      <div
        ref={sectionRef}
        className="relative w-full"
        style={{
          height: isMobile ? "auto" : `calc(${(works.length - 1) * SCROLL_PER_STEP_VH}vh + 100vh)`,
          backgroundColor: "#2F2F2F",
        }}
      >
        {/* Mobile view */}
        {isMobile ? (
          <div
            style={{
              width: "100%",
              padding: "clamp(2.5rem,8vw,4rem) clamp(1.25rem,5vw,2rem)",
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "clamp(2rem,6vw,3rem)" }}>
              <h2 style={{ fontSize: "clamp(28px,8vw,40px)", fontWeight: 700, color: "#D6D6D6", lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>
                Recent Works
              </h2>
              <span style={{ fontSize: "8px", letterSpacing: "0.22em", color: "rgba(228,228,223,0.22)", textTransform: "uppercase", fontVariantNumeric: "tabular-nums" }}>
                {String(works.length).padStart(2, "0")} projects
              </span>
            </div>

            {/* List */}
            <div>
              {works.map((work, i) => (
                <button
                  key={work.id}
                  onClick={() => openPanel(work)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    borderTop: "1px solid rgba(228,228,223,0.07)",
                    padding: "20px 0",
                    display: "grid",
                    gridTemplateColumns: "2.25rem 1fr auto",
                    alignItems: "start",
                    gap: "14px",
                    cursor: "pointer",
                    textAlign: "left",
                    ...(i === works.length - 1 ? { borderBottom: "1px solid rgba(228,228,223,0.07)" } : {}),
                  }}
                >
                  <span style={{ fontSize: "9px", letterSpacing: "0.14em", color: "rgba(228,228,223,0.22)", textTransform: "uppercase", fontVariantNumeric: "tabular-nums", paddingTop: "2px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                    <p style={{ fontSize: "clamp(13px,3.8vw,15px)", fontWeight: 400, color: "#D6D6D6", margin: 0, lineHeight: 1.35, letterSpacing: "-0.01em" }}>
                      {work.title}
                    </p>
                    <span style={{ fontSize: "8px", letterSpacing: "0.18em", color: "rgba(228,228,223,0.35)", textTransform: "uppercase" }}>
                      {work.category}
                    </span>
                  </div>
                  <span style={{ fontSize: "16px", color: "rgba(228,228,223,0.25)", paddingTop: "0px", lineHeight: 1 }}>
                    ↗
                  </span>
                </button>
              ))}
            </div>

            {/* Bottom rule */}
            <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ height: "1px", flex: 1, background: "rgba(228,228,223,0.06)" }} />
              <span style={{ fontSize: "7px", letterSpacing: "0.24em", color: "rgba(228,228,223,0.18)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Selected work 2024–2025
              </span>
              <div style={{ height: "1px", flex: 1, background: "rgba(228,228,223,0.06)" }} />
            </div>
          </div>
        ) : (
          /* Desktop / Tablet view */
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="w-full h-full flex">
              <div
                className="shrink-0 flex flex-col justify-center z-10"
                style={{
                  width: isTablet ? "clamp(160px,20vw,220px)" : "clamp(220px,20vw,320px)",
                  maxWidth: isTablet ? "220px" : "320px",
                  paddingLeft: isTablet ? "clamp(14px,2.5vw,24px)" : "clamp(24px,3vw,44px)",
                  paddingRight: isTablet ? "12px" : "clamp(12px,1.5vw,28px)",
                }}
              >
                <h2
                  className="font-bold select-none text-[#D6D6D6]"
                  style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: isTablet ? "clamp(24px,3.5vw,44px)" : "clamp(32px,3.5vw,68px)",
                    lineHeight: "0.97em",
                    fontWeight: 700,
                  }}
                >
                  Recent<br />Works
                </h2>
                <div style={{ height: isTablet ? "14px" : "24px" }} />
                <div className="flex flex-col">
                  <div
                    key={currentNumber}
                    style={{
                      fontFamily: "'Merriweather', Georgia, serif",
                      fontSize: isTablet ? "clamp(24px,3.5vw,44px)" : "clamp(32px,3.5vw,64px)",
                      lineHeight: "0.9em",
                      letterSpacing: "0.01em",
                      color: "#D6D6D6",
                      fontWeight: 400,
                      animation: "fadeSlideIn 0.35s ease forwards",
                    }}
                  >
                    {currentNumber}
                  </div>
                  <div style={{ width: "32px", height: "1px", background: "#D6D6D6", opacity: 0.35, margin: "8px 0" }} />
                  <div
                    style={{
                      fontFamily: "'Merriweather', Georgia, serif",
                      fontSize: isTablet ? "clamp(24px,3.5vw,44px)" : "clamp(32px,3.5vw,64px)",
                      lineHeight: "0.9em",
                      letterSpacing: "0.01em",
                      color: "#D6D6D6",
                      opacity: 0.28,
                      fontWeight: 400,
                    }}
                  >
                    {totalCount}
                  </div>
                </div>
              </div>

              <div ref={rightPanelRef} className="flex-1 overflow-hidden flex items-center min-w-0">
                <div
                  ref={trackRef}
                  className="flex items-center"
                  style={{ willChange: "transform", gap: `${CARD_GAP}px`, transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)" }}
                >
                  {works.map((work, i) => (
                    <WorkCard
                      key={work.id}
                      work={work}
                      isActive={i === activeIndex}
                      cardPx={cardWidth}
                      onOpen={openPanel}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile bottom sheet */}
      {isMobile && selectedWork && (
        <>
          <div
            onClick={closePanel}
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              background: "rgba(0,0,0,0.1)",
              backdropFilter: "blur(4px)",
              opacity: panelVisible ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          />
          <div
            style={{
              position: "fixed",
              bottom: 0, left: 0, right: 0,
              zIndex: 51,
              background: "#1E1E1E",
              borderTop: "1px solid rgba(228,228,223,0.1)",
              borderRadius: "16px 16px 0 0",
              maxHeight: "88vh",
              overflowY: "auto",
              transform: panelVisible ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.38s cubic-bezier(0.16,1,0.3,1)",
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px", paddingBottom: "4px" }}>
              <div style={{ width: "36px", height: "3px", borderRadius: "2px", background: "rgba(228,228,223,0.18)" }} />
            </div>
            <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", background: "#111", marginTop: "8px" }}>
              <img
                src={selectedWork.imageSrc}
                alt={selectedWork.imageAlt}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #1E1E1E 0%, transparent 50%)" }} />
            </div>
            <div style={{ padding: "20px 24px 40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "8px", letterSpacing: "0.2em", color: "rgba(228,228,223,0.4)", textTransform: "uppercase" }}>
                  {selectedWork.category}
                </span>
                <span style={{ width: "1px", height: "10px", background: "rgba(228,228,223,0.15)" }} />
                <span style={{ fontSize: "8px", letterSpacing: "0.2em", color: "rgba(228,228,223,0.25)", textTransform: "uppercase", fontVariantNumeric: "tabular-nums" }}>
                  {selectedWork.year}
                </span>
              </div>
              <h3 style={{ fontSize: "clamp(16px,4.5vw,20px)", fontWeight: 500, color: "#D6D6D6", margin: "0 0 16px", lineHeight: 1.3, letterSpacing: "-0.02em" }}>
                {selectedWork.title}
              </h3>
              <div style={{ height: "1px", background: "rgba(228,228,223,0.07)", marginBottom: "16px" }} />
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(228,228,223,0.55)", margin: "0 0 24px", fontWeight: 300 }}>
                {selectedWork.description}
              </p>
              <div style={{ marginBottom: "28px" }}>
                <span style={{ fontSize: "8px", letterSpacing: "0.2em", color: "rgba(228,228,223,0.3)", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
                  Tech Stack
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selectedWork.techStack.map((tech) => (
                    <span key={tech} style={{ fontSize: "10px", letterSpacing: "0.08em", color: "rgba(228,228,223,0.6)", border: "1px solid rgba(228,228,223,0.12)", padding: "4px 10px", textTransform: "uppercase" }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={selectedWork.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", border: "1px solid rgba(228,228,223,0.12)", color: "#D6D6D6", textDecoration: "none", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase" }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  View on GitHub
                </span>
                <span style={{ opacity: 0.4 }}>↗</span>
              </a>
              <button
                onClick={closePanel}
                style={{ marginTop: "12px", width: "100%", background: "none", border: "none", padding: "12px", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(228,228,223,0.25)", textTransform: "uppercase", cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}

      {/* Desktop modal */}
      {!isMobile && selectedWork && (
        <WorkModal work={selectedWork} onClose={closePanel} />
      )}
    </>
  );
}

function WorkModal({ work, onClose }: { work: WorkItem; onClose: () => void }) {
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", opacity: entering ? 0 : 1 }}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-6 lg:p-12">
        <div
          className="pointer-events-auto w-full bg-[#1E1E1E] transition-all duration-300"
          style={{
            maxWidth: "min(60rem, 92vw)",
            border: "1px solid rgba(228,228,223,0.1)",
            opacity: entering ? 0 : 1,
            transform: entering ? "translateY(14px)" : "translateY(0)",
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
            <div className="flex items-center gap-4">
              <span className="text-[9px] tracking-[0.22em] uppercase text-[#D6D6D6]/40">
                {work.category}
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="text-[9px] tracking-[0.22em] text-[#D6D6D6]/20 font-mono">
                {work.year}
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-[9px] tracking-[0.22em] uppercase text-white/25 hover:text-white/60 transition-colors duration-150 cursor-pointer"
            >
              <span>ESC</span>
              <span className="text-white/15">✕</span>
            </button>
          </div>

          {/* Image */}
          <div className="relative w-full bg-[#141414] overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <img
              src={work.imageSrc}
              alt={work.imageAlt}
              className="w-full h-full object-contain"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)" }}
            />
          </div>

          {/* Content */}
          <div className="px-6 py-6 flex flex-col sm:flex-row gap-6 sm:gap-10">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-normal leading-snug text-white/90 mb-2 tracking-tight">
                {work.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-white/40 mb-5">
                {work.description}
              </p>
              <div>
                <span className="block text-[8px] tracking-[0.22em] uppercase text-white/25 mb-2">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {work.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] tracking-[0.1em] uppercase text-[#D6D6D6]/50 px-2.5 py-1"
                      style={{ border: "1px solid rgba(228,228,223,0.1)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col justify-between sm:justify-end items-end gap-3 shrink-0">
              <a
                href={work.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[10px] tracking-[0.18em] uppercase text-[#D6D6D6]/50 hover:text-[#D6D6D6]/90 transition-colors duration-200 px-4 py-3"
                style={{ border: "1px solid rgba(228,228,223,0.1)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.65, flexShrink: 0 }}>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                View on GitHub
                <span className="opacity-40">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const captionStyle: React.CSSProperties = {
  fontFamily: "'Work Sans', sans-serif",
  fontSize: "8.75px",
  lineHeight: "13.125px",
  color: "#BEB8A7",
  letterSpacing: "0.04em",
  whiteSpace: "nowrap",
};

function WorkCard({
  work,
  isActive,
  cardPx,
  onOpen,
}: {
  work: WorkItem;
  isActive: boolean;
  cardPx: number;
  onOpen: (w: WorkItem) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const moveCursor = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current || !cursorRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    cursorRef.current.style.left = `${e.clientX - rect.left}px`;
    cursorRef.current.style.top = `${e.clientY - rect.top}px`;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    moveCursor(e);
    setIsHovered(true);
  };

  const widthStyle = cardPx > 0 ? `${cardPx}px` : "60vw";

  return (
    <div
      className="shrink-0 flex"
      style={{
        width: widthStyle,
        gap: "14px",
        transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(0.4,0,0.2,1)",
        opacity: isActive ? 1 : 0.38,
        transform: isActive ? "scale(1)" : "scale(0.96)",
      }}
    >
      {/* Left accent rule */}
      <div
        style={{
          width: "4px",
          flexShrink: 0,
          background: "#C09E72",
          opacity: isActive ? 1 : 0.25,
          transition: "opacity 0.45s ease",
          alignSelf: "stretch",
        }}
      />

      {/* Image + caption */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Image area */}
        <div
          ref={imgRef}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            background: "#1c1c1c",
            cursor: "none",
            overflow: "hidden",
            boxShadow: isActive
              ? "0 24px 56px rgba(0,0,0,0.65)"
              : "none",
            transition: "box-shadow 0.45s ease",
          }}
          onClick={() => onOpen(work)}
          onMouseMove={moveCursor}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={work.imageSrc}
            alt={work.imageAlt}
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />

          {/* Inactive dim overlay */}
          <div
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "rgba(47,47,47,0.5)",
              opacity: isActive ? 0 : 1,
              transition: "opacity 0.45s ease",
            }}
          />

          {/* Custom cursor */}
          <div
            ref={cursorRef}
            style={{
              position: "absolute",
              left: "-200px",
              top: "-200px",
              width: "72px",
              height: "72px",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: "rgba(10,10,10,0.88)",
              border: "1px solid rgba(190,184,167,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 10,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.18s ease",
            }}
          >
            <span
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "8px",
                letterSpacing: "0.22em",
                color: "#BEB8A7",
                textTransform: "uppercase",
                userSelect: "none",
              }}
            >
              View ↗
            </span>
          </div>
        </div>

        {/* Caption */}
        <div
          className="flex items-center justify-between mt-3 gap-4"
          style={{ opacity: isActive ? 1 : 0.38, transition: "opacity 0.45s ease" }}
        >
          <span style={captionStyle}>{work.year}</span>
          <span
            className="uppercase flex-1 text-center"
            style={{ ...captionStyle, letterSpacing: "0.07em", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {work.title}
          </span>
          <span className="uppercase" style={captionStyle}>{work.category}</span>
        </div>
      </div>
    </div>
  );
}
