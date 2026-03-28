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
        fontSize: "18px",
        lineHeight: "1em",
        letterSpacing: "0.8px",
        fontWeight: 600,
        backgroundColor: isHovering ? "#ffffff" : "#1a1a1a",
        color: isHovering ? "#1a1a1a" : "#ffffff",
        border: "none",
        borderRadius: "9999px",
        padding: "20px 36px",
        cursor: "pointer",
        transition:
          "background-color 0.25s ease, color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
        transform: isHovering
          ? "translateY(-6px) scale(1.03)"
          : "translateY(0) scale(1)",
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
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#2F2F2F] w-7xl justify-between"
      style={{
        minHeight: "220px",
        padding: "48px 64px",
        paddingBottom: "100px",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gridTemplateRows: "auto 1fr",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top-left label row */}
      <div
        style={{
          gridColumn: "1 / 2",
          gridRow: "1 / 2",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
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
        {/* Horizontal rule */}
        <div
          style={{
            height: "1px",
            width: "180px",
            backgroundColor: "#9E9E9E",
            opacity: 0.6,
          }}
        />
      </div>

      {/* Paragraph */}
      <p
        style={{
          gridColumn: "1 / 2",
          gridRow: "2 / 3",
          fontFamily: "'Euclid Circular A', 'DM Sans', sans-serif",
          fontSize: "21px",
          lineHeight: "var(--tw-leading, var(--text-xl--line-height))",
          fontWeight: 700,
          color: "#D6D6D6",
          margin: 0,
          maxWidth: "580px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
        }}
      >
        An emblem of curiosity and grit, I&apos;m a final year Software Engineering
        student at Ngee Ann Polytechnic who loves tinkering with software that
        sparks my interest. Whether it&apos;s experimenting with new distros, building
        fun projects, or just learning something fresh, I enjoy the process as
        much as the result.
      </p>

      {/* CTA Button — spans both rows on the right */}
      <div
        style={{
          gridColumn: "2 / 3",
          gridRow: "1 / 3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(12px)",
          transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
        }}
      >
        <ScrambleButton />
      </div>
    </section>
  );
}
