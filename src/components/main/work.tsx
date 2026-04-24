"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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

  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 1024;

  const totalCount = String(works.length).padStart(2, "0");
  const currentNumber = String(activeIndex + 1).padStart(2, "0");

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
  }, [cardWidth]);

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
        style={{ height: `calc(${(works.length - 1) * SCROLL_PER_STEP_VH}vh + 100vh)` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* ── MOBILE: title above cards ── */}
          {isMobile ? (
            <div className="w-full h-full flex flex-col">
              <div className="shrink-0 flex items-center justify-between px-5 pt-8 pb-4">
                <h2
                  className="font-bold text-[#D6D6D6]"
                  style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: "clamp(28px,8vw,44px)",
                    lineHeight: 1,
                    fontWeight: 700,
                  }}
                >
                  Recent Works
                </h2>
                <div className="flex flex-col items-end shrink-0" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                  <span key={currentNumber} style={{ fontSize: "clamp(20px,5.5vw,32px)", color: "#D6D6D6", fontWeight: 400, lineHeight: 1, animation: "fadeSlideIn 0.35s ease forwards" }}>
                    {currentNumber}
                  </span>
                  <div style={{ width: "24px", height: "1px", background: "#D6D6D6", opacity: 0.35, margin: "5px 0" }} />
                  <span style={{ fontSize: "clamp(20px,5.5vw,32px)", color: "#D6D6D6", opacity: 0.28, fontWeight: 400, lineHeight: 1 }}>
                    {totalCount}
                  </span>
                </div>
              </div>

              <div ref={rightPanelRef} className="flex-1 overflow-hidden flex items-center">
                <div
                  ref={trackRef}
                  className="flex items-center"
                  style={{ willChange: "transform", gap: `${CARD_GAP}px`, transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)", paddingLeft: "clamp(1rem,5vw,2rem)" }}
                >
                  {works.map((work, i) => (
                    <WorkCard key={work.id} work={work} isActive={i === activeIndex} cardPx={cardWidth} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ── DESKTOP / TABLET: left panel + right cards ── */
            <div className="w-full h-full flex">
              {/* Left panel — width driven by clamp so it never overflows */}
              <div
                className="shrink-0 flex flex-col justify-center z-10"
                style={{
                  width: isTablet ? "clamp(160px,20vw,220px)" : "clamp(220px,20vw,320px)",
                  paddingLeft: isTablet ? "clamp(14px,2.5vw,24px)" : "clamp(24px,3vw,44px)",
                  paddingRight: isTablet ? "12px" : "clamp(12px,1.5vw,28px)",
                  // Hard max so it can never eat into card space
                  maxWidth: isTablet ? "220px" : "320px",
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

              {/* Right panel — takes all remaining width */}
              <div ref={rightPanelRef} className="flex-1 overflow-hidden flex items-center min-w-0">
                <div
                  ref={trackRef}
                  className="flex items-center"
                  style={{ willChange: "transform", gap: `${CARD_GAP}px`, transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)" }}
                >
                  {works.map((work, i) => (
                    <WorkCard key={work.id} work={work} isActive={i === activeIndex} cardPx={cardWidth} />
                  ))}
                </div>
              </div>
            </div>
          )}
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

function WorkCard({ work, isActive, cardPx }: { work: WorkItem; isActive: boolean; cardPx: number }) {
  const widthStyle = cardPx > 0 ? `${cardPx}px` : "60vw";
  return (
    <div
      className="shrink-0 flex flex-col"
      style={{
        width: widthStyle,
        transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(0.4,0,0.2,1)",
        opacity: isActive ? 1 : 0.35,
        transform: isActive ? "scale(1)" : "scale(0.97)",
      }}
    >
      <div className="w-full relative overflow-hidden bg-[#1a1a1a]" style={{ paddingBottom: "60%" }}>
        <img
          src={work.imageSrc}
          alt={work.imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(46,46,46,0.4)", opacity: isActive ? 0 : 1, transition: "opacity 0.45s ease" }}
        />
      </div>
      <div
        className="flex items-center justify-between mt-3 gap-4"
        style={{ opacity: isActive ? 1 : 0.38, transition: "opacity 0.45s ease" }}
      >
        <span style={captionStyle}>{work.year}</span>
        <span className="uppercase flex-1 text-center" style={{ ...captionStyle, letterSpacing: "0.07em", overflow: "hidden", textOverflow: "ellipsis" }}>
          {work.title}
        </span>
        <span className="uppercase" style={captionStyle}>{work.category}</span>
      </div>
    </div>
  );
}
