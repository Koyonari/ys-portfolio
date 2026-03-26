"use client";
import { useRef, useEffect, useState } from "react";

function ScrambleButton() {
  const [displayText, setDisplayText] = useState("READ MY BLOG");
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const originalText = "READ MY BLOG";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const scramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(originalText);
      }
      iteration += 1 / 2;
    }, 30);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    scramble();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(originalText);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <button
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
        transition: "background-color 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
        transform: isHovering ? "translateY(-2px)" : "translateY(0)",
        boxShadow: isHovering
          ? "0 8px 24px rgba(0,0,0,0.4)"
          : "0 2px 8px rgba(0,0,0,0.2)",
        fontVariantNumeric: "tabular-nums",
        whiteSpace: "nowrap",
        minWidth: "200px",
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
          lineHeight: "1.6em",
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
