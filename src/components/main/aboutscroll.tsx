"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const IMAGES: {
  src: string;
  initY: number;
  left: string;
  leftMobile?: string;
  width: string;
  widthMd: string;
  widthSm: string;
  speed: number;
  speedMd: number;
  speedSm: number;
  delay: number;
  aspect: string;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
}[] = [
    {
      initY: -40, left: "60%", leftMobile: "72%",
      width: "clamp(168.75px, 17.5vw, 250px)", widthMd: "clamp(112.5px, 13.75vw, 175px)", widthSm: "clamp(100px, 26vw, 150px)",
      speed: -5.0, speedMd: -3.5, speedSm: -3.0,
      delay: 0.04, aspect: "75%", src: "/about/bluelake.jpg",
    },
    {
      initY: -5, left: "82%", leftMobile: "8%",
      width: "clamp(112.5px, 11.25vw, 165.6px)", widthMd: "clamp(75px, 8.75vw, 112.5px)", widthSm: "clamp(85px, 22vw, 120px)",
      speed: -2.8, speedMd: -2.0, speedSm: -2.0,
      delay: 0.08, aspect: "150%", src: "/about/dream.JPG",
    },
    {
      initY: 80, left: "5%", leftMobile: "5%",
      width: "clamp(153.1px, 15vw, 218.75px)", widthMd: "clamp(100px, 11.25vw, 150px)", widthSm: "clamp(95px, 24vw, 140px)",
      speed: -1.6, speedMd: -1.1, speedSm: -1.2,
      delay: 0.03, aspect: "75%", src: "/about/patcat.jpg",
    },
    {
      initY: 40, left: "64%", leftMobile: "73%",
      width: "clamp(165px, 17vw, 242px)", widthMd: "clamp(108px, 12.5vw, 162px)", widthSm: "clamp(90px, 23vw, 130px)",
      speed: -1.6, speedMd: -1.1, speedSm: -1.4,
      delay: 0.10, aspect: "75%", src: "/about/hakone.jpg",
    },
    {
      initY: -36, left: "26%", leftMobile: "3%",
      width: "clamp(121.8px, 12.5vw, 175px)", widthMd: "clamp(81.25px, 9.3vw, 125px)", widthSm: "clamp(80px, 20vw, 115px)",
      speed: -1.9, speedMd: -1.3, speedSm: -1.6,
      delay: 0.07, aspect: "150%", src: "/about/catsit.jpg",
    },
    {
      initY: -10, left: "6%", leftMobile: "75%",
      width: "clamp(165.6px, 16.8vw, 240.6px)", widthMd: "clamp(109.3px, 12.5vw, 165.6px)", widthSm: "clamp(90px, 23vw, 130px)",
      speed: -0.7, speedMd: -0.5, speedSm: -0.5,
      delay: 0.09, aspect: "75%", src: "/about/chase.jpg",
    },
    {
      initY: 50, left: "78%", leftMobile: "72%",
      width: "clamp(103.1px, 10.6vw, 153.1px)", widthMd: "clamp(68.75px, 8.1vw, 103.1px)", widthSm: "clamp(75px, 19vw, 110px)",
      speed: -0.6, speedMd: -0.4, speedSm: -0.5,
      delay: 0.13, aspect: "150%", src: "/about/enoshima.jpg",
    },
    {
      initY: 60, left: "22.5%", leftMobile: "2%",
      width: "clamp(146.8px, 15vw, 215.6px)", widthMd: "clamp(96.8px, 11.25vw, 143.7px)", widthSm: "clamp(85px, 22vw, 120px)",
      speed: -0.9, speedMd: -0.6, speedSm: -0.7,
      delay: 0.05, aspect: "150%", src: "/about/takepic.jpg",
    },
  ];

const LINES = [
  { text: "ABOUT ME", opacity: 1.00 },
  { text: "ABOUT ME", opacity: 0.50 },
  { text: "ABOUT ME", opacity: 0.25 },
  { text: "ABOUT ME", opacity: 0.50 },
  { text: "ABOUT ME", opacity: 1.00 },
];

const BP_TABLET = 1024;
const BP_MOBILE = 640;

export default function AboutScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(0);
  const [progress, setProgress] = useState(0);
  const [entered, setEntered] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [vhPx, setVhPx] = useState(800);
  const [vw, setVw] = useState(1440);

  useEffect(() => {
    const update = () => {
      setVhPx(window.innerHeight / 100);
      setVw(window.innerWidth);
      if (sectionRef.current) {
        setSectionHeight(sectionRef.current.offsetHeight);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const rawScrolled = -rect.top;
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, rawScrolled / total));
      setScrolled(Math.max(0, rawScrolled));
      setProgress(p);
      if (!sectionHeight && el.offsetHeight) setSectionHeight(el.offsetHeight);
      if (rect.top < window.innerHeight * 0.85) setEntered(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionHeight]);

  const isMobile = vw < BP_MOBILE;
  const isTablet = vw >= BP_MOBILE && vw < BP_TABLET;

  const headingSize = isMobile
    ? "clamp(22px,7.5vw,32px)"
    : isTablet
      ? "clamp(26px,4.5vw,40px)"
      : "clamp(34px,3.2vw,56px)";

  return (
    <>
      <style>{`
        .as {
          --bg:           #2F2F2F;
          --fg:           #E4E4DF;
          --muted:        #54544F;
          --muted-bright: #7E7E78;
          --rule-bright:  rgba(228,228,223,0.13);
          --margin:       clamp(1.2rem, 4vw, 5rem);
          --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
          --ease-swiss:   cubic-bezier(0.25, 0.1, 0.25, 1);
          font-family:    'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        .as-img {
          position: absolute;
          overflow: hidden;
          clip-path: inset(0 0 100% 0);
          transition: clip-path 0.9s var(--ease-out);
          transition-delay: var(--d, 0s);
          will-change: transform;
        }
        .as-in .as-img {
          clip-path: inset(0 0 0% 0);
        }

        .as-line {
          display: block;
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.15;
          text-transform: uppercase;
          color: var(--fg);
          white-space: nowrap;
          transform: translateY(8px);
          opacity: 0;
          transition: transform 0.7s var(--ease-swiss), opacity 0.7s ease;
        }
        .as-in .as-line { transform: translateY(0); opacity: 1; }
        .as-in .as-line:nth-child(1) { transition-delay: 0.05s; }
        .as-in .as-line:nth-child(2) { transition-delay: 0.12s; }
        .as-in .as-line:nth-child(3) { transition-delay: 0.19s; }
        .as-in .as-line:nth-child(4) { transition-delay: 0.26s; }
        .as-in .as-line:nth-child(5) { transition-delay: 0.33s; }

        .as-label {
          font-size: clamp(7px, 0.9vw, 9px);
          letter-spacing: 0.20em;
          color: var(--muted);
          text-transform: uppercase;
          font-weight: 500;
        }

        @keyframes as-pulse {
          0%,100% { opacity: 0.18; }
          50%      { opacity: 0.60; }
        }

        .as-counter {
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
        }
      `}</style>

      <div
        ref={sectionRef}
        className="as relative w-full"
        style={{ height: "160vh", backgroundColor: "var(--bg)" }}
      >
        {/* Gradient bridge */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "clamp(60px,12vh,200px)",
          background: "linear-gradient(to bottom,#1F1F1F 0%,transparent 100%)",
          zIndex: 20, pointerEvents: "none",
        }} />

        {/* Sticky viewport */}
        <div
          className={`sticky top-0 w-full${entered ? " as-in" : ""}`}
          style={{ height: "100vh", overflow: "visible", position: "sticky" }}
        >
          {/* Images */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
            {IMAGES.map((img, i) => {
              if (isTablet && img.hideOnTablet) return null;

              // Size and speed based on breakpoint
              const width = isMobile ? img.widthSm : isTablet ? img.widthMd : img.width;
              const speed = isMobile ? img.speedSm : isTablet ? img.speedMd : img.speed;

              const baseTop = (50 + img.initY * (isMobile ? 0.55 : 1.0)) * vhPx;
              const translateY = scrolled * speed;

              return (
                <div
                  key={i}
                  className="as-img"
                  style={{
                    top: `${baseTop}px`,
                    left: isMobile && img.leftMobile ? img.leftMobile : img.left,
                    width,
                    "--d": `${img.delay}s`,
                    transform: `translateY(${translateY}px)`,
                  } as React.CSSProperties}
                >
                  <div style={{ position: "relative", width: "100%", paddingBottom: img.aspect }}>
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes={isMobile ? "30vw" : isTablet ? "22vw" : "22vw"}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* About me */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: "1px",
              height: isMobile ? "16px" : "clamp(18px,2.8vh,36px)",
              background: "var(--rule-bright)",
              marginBottom: isMobile ? "0.8rem" : "1.1rem",
              opacity: Math.max(0, 1 - progress * 3.5),
              transition: "opacity 0.35s ease",
            }} />

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
              {LINES.map((line, i) => (
                <span key={i} className="as-line" style={{ fontSize: headingSize, opacity: line.opacity }}>
                  {line.text}
                </span>
              ))}
            </div>

            <div style={{
              width: "1px",
              height: isMobile ? "16px" : "clamp(18px,2.8vh,36px)",
              background: "var(--rule-bright)",
              marginTop: isMobile ? "0.8rem" : "1.1rem",
              opacity: Math.max(0, 1 - progress * 3.5),
              transition: "opacity 0.35s ease",
            }} />

            <div style={{
              marginTop: isMobile ? "1.2rem" : "1.8rem",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
              opacity: Math.max(0, 1 - progress * 6),
              transition: "opacity 0.3s ease",
            }}>
              <span className="as-label">Scroll</span>
              <div style={{
                width: "1px", height: "24px",
                background: "linear-gradient(to bottom,var(--muted-bright),transparent)",
                animation: "as-pulse 2.6s ease-in-out infinite",
                animationDelay: "1.8s",
              }} />
            </div>
          </div>

          {/* Progress counter */}
          <div style={{ position: "absolute", bottom: "var(--margin)", left: "var(--margin)", zIndex: 7 }}>
            <span className="as-label as-counter" style={{
              opacity: entered ? 0.55 : 0,
              transform: entered ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.6s ease 0.4s, transform 0.6s cubic-bezier(0.25,0.1,0.25,1) 0.4s",
              display: "block",
            }}>
              {String(Math.round(progress * 100)).padStart(3, "0")} %
            </span>
          </div>

          {/* Year */}
          <div style={{ position: "absolute", bottom: "var(--margin)", right: "var(--margin)", zIndex: 7 }}>
            <span className="as-label" style={{
              opacity: entered ? 0.55 : 0,
              transform: entered ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.6s ease 0.45s, transform 0.6s cubic-bezier(0.25,0.1,0.25,1) 0.45s",
              display: "block",
            }}>
              2025
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
