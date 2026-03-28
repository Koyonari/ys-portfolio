"use client";

import { useEffect, useRef, useState } from "react";

interface WorkItem {
  id: number;
  year: string;
  title: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
}

const works: WorkItem[] = [
  {
    id: 1,
    year: "2025",
    title: "Una Villa Contemporanea dal Carattere Sartoriale",
    category: "Residenziale",
    imageSrc: "/images/work-01.jpg",
    imageAlt: "Contemporary villa interior with modular grey sofa",
  },
  {
    id: 2,
    year: "2024",
    title: "Appartamento Minimalista nel Cuore della Città",
    category: "Residenziale",
    imageSrc: "/images/work-02.jpg",
    imageAlt: "Minimalist apartment interior",
  },
  {
    id: 3,
    year: "2024",
    title: "Studio Creativo per un Brand di Moda",
    category: "Commerciale",
    imageSrc: "/images/work-03.jpg",
    imageAlt: "Creative studio space for a fashion brand",
  },
  {
    id: 4,
    year: "2023",
    title: "Penthouse con Vista Panoramica sulla Città",
    category: "Residenziale",
    imageSrc: "/images/work-04.jpg",
    imageAlt: "Penthouse with panoramic city view",
  },
];

// ─── Layout constants ────────────────────────────────────────────────────
const LEFT_PANEL_WIDTH = 380;
const CARD_WIDTH_RATIO = 0.70;
const CARD_GAP = 28;
const SCROLL_PER_STEP_VH = 100;

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const totalCount = String(works.length).padStart(2, "0");
  const currentNumber = String(activeIndex + 1).padStart(2, "0");

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const rightPanel = rightPanelRef.current;
    if (!section || !track || !rightPanel) return;

    const getCardWidth = () =>
      Math.round(rightPanel.offsetWidth * CARD_WIDTH_RATIO);

    const getStepSize = () => getCardWidth() + CARD_GAP;

    const getTotalScrollDistance = () =>
      section.offsetHeight - window.innerHeight;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const totalScrollDistance = getTotalScrollDistance();

      if (totalScrollDistance <= 0) return;

      const rawProgress = Math.min(scrolled / totalScrollDistance, 1);
      const rawIndex = rawProgress * (works.length - 1);
      const snappedIndex = Math.round(rawIndex);

      const stepSize = getStepSize();
      const translateX = snappedIndex * stepSize;

      track.style.transform = `translateX(-${translateX}px)`;

      if (snappedIndex !== activeIndexRef.current) {
        activeIndexRef.current = snappedIndex;
        setActiveIndex(snappedIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400&family=Work+Sans:wght@300;400&display=swap');

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0px); }
        }

        /* ── Swiss grid rules ───────────────────────── */
        .ws {
          --rule:        rgba(214,214,214,0.06);
          --rule-bright: rgba(214,214,214,0.11);
          --margin:      40px;
        }

        .ws-rule {
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          pointer-events: none;
          z-index: 10;
        }

        /* Horizontal rules span the full sticky frame */
        .ws-hrule {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      <div
        ref={sectionRef}
        className="ws relative w-full bg-[#2E2E2E]"
        style={{
          height: `calc(${(works.length - 1) * SCROLL_PER_STEP_VH}vh + 100vh)`,
        }}
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* ══ Swiss grid overlay ══════════════════════════════════════
              Mirrors the Hero's vertical + horizontal rule system.
              All rules are position:absolute inside the sticky frame.    */}

          {/* Left margin rule — aligns with left panel's paddingLeft (40px) */}
          <div
            className="ws-rule"
            style={{ left: "var(--margin)", background: "var(--rule-bright)" }}
          />

          {/* Panel seam — where left panel ends / right panel begins */}
          <div
            className="ws-rule"
            style={{ left: `${LEFT_PANEL_WIDTH}px`, background: "var(--rule-bright)" }}
          />

          {/* Right margin rule — mirrors Hero's inner right margin */}
          <div
            className="ws-rule"
            style={{ right: "var(--margin)", background: "var(--rule)" }}
          />

          {/* Top horizontal rule — sits just below the top margin */}
          <div
            className="ws-hrule"
            style={{ top: "var(--margin)", background: "var(--rule-bright)" }}
          />

          {/* Counter divider — horizontal rule separating counter from heading.
              Positioned to align with the ~mid-point of the left panel.    */}
          <div
            className="ws-hrule"
            style={{
              top: "50%",
              left: 0,
              right: `calc(100% - ${LEFT_PANEL_WIDTH}px)`,
              background: "var(--rule-bright)",
            }}
          />

          {/* Bottom horizontal rule — mirrors top rule exactly, full width */}
          <div
            className="ws-hrule"
            style={{ bottom: "var(--margin)", background: "var(--rule-bright)" }}
          />

          {/* ══ Content ══════════════════════════════════════════════════ */}
          <div className="max-w-7xl mx-auto h-full flex">

            {/* ── LEFT PANEL ── */}
            <div
              className="shrink-0 flex flex-col justify-center z-10 bg-[#2E2E2E]"
              style={{
                width: `${LEFT_PANEL_WIDTH}px`,
                paddingLeft: "40px",
                paddingRight: "32px",
              }}
            >
              {/* MY WORK */}
              <h2
                className="font-bold select-none"
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: "92px",
                  lineHeight: "0.94em",
                  color: "#D6D6D6",
                  fontWeight: 700,
                }}
              >
                Recent<br />Works
              </h2>

              <div style={{ height: "32px" }} />

              {/* Counter */}
              <div className="flex flex-col">
                <div
                  key={currentNumber}
                  style={{
                    fontFamily: "'Merriweather', Georgia, serif",
                    fontSize: "80px",
                    lineHeight: "0.9em",
                    letterSpacing: "0.01em",
                    color: "#D6D6D6",
                    fontWeight: 400,
                    animation: "fadeSlideIn 0.35s ease forwards",
                  }}
                >
                  {currentNumber}
                </div>

                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: "#D6D6D6",
                    opacity: 0.35,
                    margin: "10px 0",
                  }}
                />

                <div
                  style={{
                    fontFamily: "'Merriweather', Georgia, serif",
                    fontSize: "80px",
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

            {/* ── RIGHT PANEL ── */}
            <div
              ref={rightPanelRef}
              className="flex-1 overflow-hidden flex items-center"
            >
              <div
                ref={trackRef}
                className="flex items-center"
                style={{
                  willChange: "transform",
                  gap: `${CARD_GAP}px`,
                  transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {works.map((work, i) => (
                  <WorkCard
                    key={work.id}
                    work={work}
                    index={i}
                    isActive={i === activeIndex}
                    isLast={i === works.length - 1}
                    cardWidthRatio={CARD_WIDTH_RATIO}
                  />
                ))}
              </div>
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

interface WorkCardProps {
  work: WorkItem;
  index: number;
  isActive: boolean;
  isLast: boolean;
  cardWidthRatio: number;
}

function WorkCard({ work, isActive, isLast, cardWidthRatio }: WorkCardProps) {
  return (
    <div
      className="shrink-0 flex flex-col"
      style={{
        width: `min(calc((100vw - ${LEFT_PANEL_WIDTH}px) * ${cardWidthRatio}), ${Math.round((1280 - LEFT_PANEL_WIDTH) * cardWidthRatio)}px)`,
        transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: isActive ? 1 : 0.35,
        transform: isActive ? "scale(1)" : "scale(0.97)",
      }}
    >
      {/* Image */}
      <div
        className="w-full relative overflow-hidden bg-[#1a1a1a]"
        style={{ paddingBottom: "60%" }}
      >
        <img
          src={work.imageSrc}
          alt={work.imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "rgba(46,46,46,0.4)",
            opacity: isActive ? 0 : 1,
            transition: "opacity 0.45s ease",
          }}
        />
      </div>

      {/* Caption row */}
      <div
        className="flex items-center justify-between mt-3 gap-4"
        style={{
          opacity: isActive ? 1 : 0.38,
          transition: "opacity 0.45s ease",
        }}
      >
        <span style={captionStyle}>{work.year}</span>
        <span
          className="uppercase flex-1 text-center"
          style={{
            ...captionStyle,
            letterSpacing: "0.07em",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {work.title}
        </span>
        <span className="uppercase" style={captionStyle}>
          {work.category}
        </span>
      </div>
    </div>
  );
}
