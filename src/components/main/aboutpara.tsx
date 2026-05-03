"use client";
import { useRef, useEffect, useLayoutEffect, useState } from "react";

function ScrambleButton() {
  const [displayText, setDisplayText] = useState("READ MY BLOG");
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ticksRef = useRef(0);
  const originalText = "READ MY BLOG";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const DURATION = 18;

  useLayoutEffect(() => {
    if (buttonRef.current) {
      const w = buttonRef.current.getBoundingClientRect().width;
      buttonRef.current.style.width = `${w}px`;
    }
  }, []);

  const scrambleAll = () =>
    originalText
      .split("")
      .map((char) => (char === " " ? " " : chars[Math.floor(Math.random() * 26)]))
      .join("");

  const handleMouseEnter = () => {
    setIsHovering(true);
    ticksRef.current = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      ticksRef.current += 1;
      if (ticksRef.current >= DURATION) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setDisplayText(originalText);
      } else {
        setDisplayText(scrambleAll());
      }
    }, 35);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setDisplayText(originalText);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        fontFamily: "'Euclid Circular A', 'DM Sans', sans-serif",
        fontSize: "clamp(14px, 1.2vw, 18px)",
        lineHeight: "1em",
        letterSpacing: "0.8px",
        fontWeight: 600,
        backgroundColor: isHovering ? "#ffffff" : "#1a1a1a",
        color: isHovering ? "#1a1a1a" : "#ffffff",
        border: "none",
        borderRadius: "9999px",
        padding: "clamp(14px, 1.4vw, 20px) clamp(22px, 2.5vw, 36px)",
        cursor: "pointer",
        transition: "background-color 0.25s ease, color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
        transform: isHovering ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
        boxShadow: isHovering
          ? "0 16px 40px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.3)"
          : "0 2px 6px rgba(0,0,0,0.25)",
        fontVariantNumeric: "tabular-nums",
        whiteSpace: "nowrap",
        textAlign: "center",
      }}
    >
      {displayText}
    </button>
  );
}

export default function AboutPara() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="bg-[#2F2F2F] w-full"
      style={{ paddingBottom: "60px" }}
    >
      {/* Constrained inner wrapper */}
      <div
        className="mx-auto max-w-7xl"
        style={{
          padding: "48px clamp(1.5rem, 5vw, 64px) 0",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "32px",
        }}
      >
        {/* Top label row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <span
            style={{
              fontFamily: "'Euclid Circular A', 'DM Sans', sans-serif",
              fontSize: "16px",
              lineHeight: "1.2em",
              fontWeight: 300,
              color: "#D6D6D6",
              letterSpacing: "0.2px",
            }}
          >
            about
          </span>
          <div style={{ height: "1px", width: "180px", backgroundColor: "#9E9E9E", opacity: 0.6 }} />
        </div>

        {/* Content paragraph + button */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
          }}
        >
          {/* Paragraph */}
          <p
            style={{
              fontFamily: "'Euclid Circular A', 'DM Sans', sans-serif",
              fontSize: "clamp(16px, 1.5vw, 21px)",
              lineHeight: "1.6em",
              fontWeight: 700,
              color: "#D6D6D6",
              margin: 0,
              maxWidth: "580px",
              flex: "1 1 300px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            An emblem of curiosity and grit, I&apos;m a Software Engineering
            Graduate at Ngee Ann Polytechnic who loves tinkering with software (or hardware) that
            sparks my interest. Whether it&apos;s experimenting with new distros, building
            fun projects, or just learning something challenging, I enjoy the process as
            much as the result.
          </p>

          {/* CTA Button */}
          <div
            style={{
              flex: "0 0 auto",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(12px)",
              transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
            }}
          >
            <ScrambleButton />
          </div>
        </div>
      </div>
    </section>
  );
}
