"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => {
      el.setAttribute("data-ready", "true");
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <style>{`
        /* ── Tokens ─────────────────────────────────────── */
        .hs {
          --bg:           #2F2F2F;
          --fg:           #E4E4DF;
          --muted:        #54544F;
          --dim:          #2E2E2A;
          --muted-bright: #7E7E78;
          --rule:         rgba(228,228,223,0.07);
          --rule-bright:  rgba(228,228,223,0.13);
          --photo-w:      clamp(260px, 30vw, 440px);
          --margin:       clamp(2.5rem, 5.5vw, 5rem);
          --ease:         cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ── Entrance ────────────────────────────────────── */
        .hs [data-a] {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity .9s var(--ease), transform .9s var(--ease);
        }
        .hs[data-ready] [data-a="1"]  { opacity:1; transform:none; transition-delay:.00s; }
        .hs[data-ready] [data-a="2"]  { opacity:1; transform:none; transition-delay:.10s; }
        .hs[data-ready] [data-a="3"]  { opacity:1; transform:none; transition-delay:.20s; }
        .hs[data-ready] [data-a="4"]  { opacity:1; transform:none; transition-delay:.30s; }
        .hs[data-ready] [data-a="5"]  { opacity:1; transform:none; transition-delay:.40s; }
        .hs[data-ready] [data-a="6"]  { opacity:1; transform:none; transition-delay:.52s; }
        .hs[data-ready] [data-a="7"]  { opacity:1; transform:none; transition-delay:.62s; }
        .hs[data-ready] [data-a="8"]  { opacity:1; transform:none; transition-delay:.72s; }
        .hs[data-ready] [data-a="9"]  { opacity:1; transform:none; transition-delay:.80s; }
        .hs[data-ready] [data-a="10"] { opacity:1; transform:none; transition-delay:.88s; }

        /* ── Works row ───────────────────────────────────── */
        .hs-work {
          transition: opacity .22s ease;
          cursor: pointer;
          opacity: 0.5;
        }
        .hs-work:hover { opacity: 1; }
        .hs-work-arrow {
          display: inline-block;
          transition: transform .22s var(--ease);
        }
        .hs-work:hover .hs-work-arrow { transform: translateX(5px); }

        /* ── Grid rules ──────────────────────────────────── */
        .hs-rule {
          opacity: 0;
          transition: opacity 2.2s ease;
        }
        .hs[data-ready] .hs-rule        { opacity:1; transition-delay:.15s; }
        .hs[data-ready] .hs-rule--late  { opacity:1; transition-delay:.80s; }

        /* ── Photo wipe ──────────────────────────────────── */
        .hs-photo {
          clip-path: inset(0 0 100% 0);
          transition: clip-path 1.4s var(--ease);
          transition-delay: .05s;
        }
        .hs[data-ready] .hs-photo { clip-path: inset(0 0 0% 0); }

        /* ── BG fade ─────────────────────────────────────── */
        .hs-bg {
          opacity: 0 !important;
          transition: opacity 3s ease !important;
        }
        .hs[data-ready] .hs-bg { opacity:1 !important; }

        /* ── Scroll pulse ────────────────────────────────── */
        @keyframes hs-blink {
          0%,100% { opacity:.5; } 50% { opacity:1; }
        }
        .hs-blink {
          animation: hs-blink 3s ease-in-out infinite;
          animation-delay: 2s;
        }


      `}</style>

      <section
        ref={sectionRef}
        className="hs relative w-full h-screen min-h-svh overflow-hidden"
        style={{
          backgroundColor: "var(--bg)",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          display: "grid",
          gridTemplateColumns: "1fr var(--photo-w)",
          gridTemplateRows: "var(--margin) 1fr auto var(--margin)",
        }}
      >

        {/* ══ BG image ════════════════════════════════════ */}
        <Image
          src="/hero/ph2.jpg"
          alt=""
          fill
          priority
          className="hs-bg object-cover object-center"
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background:
              "linear-gradient(115deg, rgba(31,31,31,0.98) 0%, rgba(31,31,31,0.92) 45%, rgba(31,31,31,0.50) 100%)",
          }}
        />

        {/* ══ Vertical rules ══════════════════════════════ */}
        {/* Left margin */}
        <div className="hs-rule absolute top-0 bottom-0"
          style={{ zIndex: 2, left: "var(--margin)", width: "1px", background: "var(--rule-bright)" }} />
        {/* Column seam */}
        <div className="hs-rule absolute top-0 bottom-0"
          style={{ zIndex: 2, right: "var(--photo-w)", width: "1px", background: "var(--rule-bright)" }} />
        {/* Inner right margin */}
        <div className="hs-rule hs-rule--late absolute top-0 bottom-0"
          style={{ zIndex: 2, right: "var(--margin)", width: "1px", background: "var(--rule)" }} />

        {/* Horizontal rule above the name block */}
        <div
          className="hs-rule hs-rule--late absolute"
          style={{
            zIndex: 2,
            bottom: "calc(92px * 1.3 + 13px * 1.6 + var(--margin) + 14px)",
            left: 0,
            right: "var(--photo-w)",
            height: "1px",
            background: "var(--rule-bright)",
          }}
        />

        {/* ══ Photo column — full height ══════════════════ */}
        <div
          className="hs-photo relative overflow-hidden"
          style={{ gridColumn: "2", gridRow: "1 / 5", zIndex: 3 }}
        >
          <Image
            src="/hero/ph1.jpg"
            alt="Yong Shyan"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Left bleed into text col */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #2F2F2F, rgba(31,31,31,0) 110px)" }} />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0"
            style={{ height: "55%", background: "linear-gradient(to top, #2F2F2F, transparent)" }} />

          {/* Caption bottom-right */}
          <div
            data-a="2"
            className="absolute bottom-0 right-0 flex flex-col items-end"
            style={{ zIndex: 4, padding: "0 var(--margin) calc(var(--margin) + 1.8rem) 0", gap: "3px" }}
          >
            <span style={{ fontSize: "8px", letterSpacing: "0.18em", color: "var(--muted-bright)", textTransform: "uppercase" }}>
              ph1.jpg
            </span>
            <span style={{ fontSize: "8px", letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase" }}>
              Portrait — 2025
            </span>
          </div>
        </div>

        {/* ══ Top-left: index label ════════════════════════ */}
        <div
          data-a="1"
          className="relative flex items-start"
          style={{ gridColumn: "1", gridRow: "1", zIndex: 4, paddingLeft: "var(--margin)" }}
        >
          <span style={{ fontSize: "8px", letterSpacing: "0.20em", color: "var(--muted)", textTransform: "uppercase" }} className="px-2.5 pt-2">
            001 — Portfolio
          </span>
        </div>

        {/* ══ Mid-left: selected works teaser ════════════ */}
        <div
          className="relative flex flex-col justify-center"
          style={{
            gridColumn: "1",
            gridRow: "2",
            zIndex: 4,
            paddingLeft: "var(--margin)",
            paddingRight: "3rem",
          }}
        >
          {/* Section label */}
          <div
            data-a="3"
            className="flex items-center"
            style={{ gap: "0.75rem", marginBottom: "1.25rem" }}
          >
            <span style={{ fontSize: "8px", letterSpacing: "0.20em", color: "var(--muted)", textTransform: "uppercase" }} className="px-2.5">
              Selected Work
            </span>
            <div style={{ flex: 1, height: "1px", background: "var(--rule-bright)", maxWidth: "3rem" }} />
          </div>

          {/* Work rows */}
          {[
            { n: "4", index: "01", title: "Portfolio Website", year: "2025", tags: "Next.js · UIUX" },
            { n: "5", index: "02", title: "Project Alpha", year: "2024", tags: "React · TypeScript" },
            { n: "6", index: "03", title: "Design System", year: "2024", tags: "Figma · Storybook" },
          ].map((work, i) => (
            <div
              key={work.index}
              data-a={work.n}
              className="hs-work"
              style={{
                display: "grid",
                gridTemplateColumns: "1.8rem 1fr auto",
                columnGap: "1.2rem",
                alignItems: "baseline",
                padding: "0.9rem 10px",
                borderBottom: "1px solid var(--rule)",
                ...(i === 0 ? { borderTop: "1px solid var(--rule)" } : {}),
              }}
            >
              {/* Index */}
              <span style={{
                fontSize: "8px",
                letterSpacing: "0.14em",
                color: "var(--muted)",
                textTransform: "uppercase",
                fontVariantNumeric: "tabular-nums",
                paddingTop: "1px",
              }}>
                {work.index}
              </span>

              {/* Title + tags */}
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{
                  fontSize: "13px",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  color: "var(--fg)",
                  fontWeight: 400,
                }}>
                  {work.title}
                  <span className="hs-work-arrow" style={{ marginLeft: "6px", color: "var(--muted-bright)", fontSize: "11px" }}>→</span>
                </span>
                <span style={{
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  color: "var(--muted-bright)",
                  textTransform: "uppercase",
                }}>
                  {work.tags}
                </span>
              </div>

              {/* Year */}
              <span style={{
                fontSize: "9px",
                letterSpacing: "0.10em",
                color: "var(--muted)",
                textTransform: "uppercase",
                fontVariantNumeric: "tabular-nums",
              }}>
                {work.year}
              </span>
            </div>
          ))}
        </div>

        {/* ══ Bottom-left: role + name + bio ══════════════ */}
        <div
          className="relative grid items-end"
          style={{
            gridColumn: "1",
            gridRow: "3",
            zIndex: 4,
            padding: "0 3rem 0 var(--margin)",
            gridTemplateColumns: "1fr auto",
          }}
        >
          {/* Role + name */}
          <div className="flex flex-col justify-end px-2.5">
            <p
              data-a="7"
              className="m-0 font-normal"
              style={{ fontSize: "13px", letterSpacing: "-0.02em", lineHeight: "1.6em", color: "var(--muted-bright)" }}
            >
              SOFTWARE ENGINEER / UIUX / STUDENT
            </p>
            <h1
              data-a="8"
              className="m-0 font-extrabold uppercase"
              style={{ fontSize: "92px", lineHeight: "1.3em", letterSpacing: "-0.02em", color: "var(--fg)" }}
            >
              YONG SHYAN
            </h1>
          </div>

          {/* Bio — top aligns with role tag */}
          <div className="flex flex-col justify-between self-stretch" style={{ paddingLeft: "2rem" }}>
            <div className="flex flex-col items-end" style={{ gap: "5px" }}>
              <span
                data-a="7"
                style={{ fontSize: "8px", letterSpacing: "0.18em", color: "var(--muted)", textTransform: "uppercase" }}
              >
                Est. 2025
              </span>
              <p
                data-a="9"
                className="m-0 text-right"
                style={{
                  fontSize: "10px",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.65em",
                  color: "var(--muted-bright)",
                  maxWidth: "150px",
                }}
              >
                Hey, I&apos;m Yong Shyan, a 3rd Year Software Engineering student
              </p>
            </div>
            {/* Spacer = name block height */}
            <div aria-hidden="true" style={{ height: "calc(92px * 1.3)" }} />
          </div>
        </div>

        {/* ══ Footer strip — text col only ════════════════ */}
        <div
          data-a="7"
          className="relative flex items-center justify-between"
          style={{
            gridColumn: "1",
            gridRow: "4",
            zIndex: 4,
            padding: "0 3rem 0 var(--margin)",
            borderTop: "1px solid var(--rule-bright)",
          }}
        >
          <span style={{ fontSize: "8px", letterSpacing: "0.16em", color: "var(--muted)", textTransform: "uppercase" }} className="px-2.5">
            Singapore
          </span>
          <span
            className="hs-blink flex items-center"
            style={{ gap: "7px", fontSize: "8px", letterSpacing: "0.16em", color: "var(--muted)", textTransform: "uppercase" }}
          >
            Scroll
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--muted-bright)", display: "inline-block" }} />
          </span>
        </div>

      </section>
    </>
  );
}
