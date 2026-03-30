"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { StaticImageData } from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────

interface Certificate {
  id: number;
  image: StaticImageData | string;
  title: string;
  issuer: string;
  year: number;
  category: "Competition" | "Programme" | "Award" | "Course" | "Certification";
}

const CATEGORIES = ["Competition", "Programme", "Award", "Course", "Certification"] as const;
type CatKey = typeof CATEGORIES[number];

const CAT_COLOR: Record<CatKey, string> = {
  Competition: "#BE7E7E",
  Programme: "#7EAABE",
  Award: "#C8AA6E",
  Course: "#A27EBE",
  Certification: "#7E8FBE",
};

// ─── DATA (unchanged) ─────────────────────────────────────────────────────

const certs: Certificate[] = [
  { id: 1, image: "/certs/ycep.jpg", title: "Youth Cyber Exploration Programme (YCEP)", issuer: "CSA", year: 2021, category: "Programme" },
  { id: 2, image: "/certs/cctfycep.jpg", title: "Central CTF YCEP", issuer: "CSA, Cybint", year: 2021, category: "Competition" },
  { id: 3, image: "/certs/aycep.jpg", title: "Advanced Youth Cyber Exploration Programme (AYCEP)", issuer: "CSA, Cloudsine", year: 2021, category: "Programme" },
  { id: 4, image: "/certs/brainhack2021.jpg", title: "BrainHack 2021", issuer: "DSTA", year: 2021, category: "Competition" },
  { id: 5, image: "/certs/brainhack2024.jpg", title: "BrainHack 2024", issuer: "DSTA", year: 2024, category: "Competition" },
  { id: 6, image: "/certs/buildingblocs.jpg", title: "BuildingBloCS 2021", issuer: "SIMCC, CTE-STEM, AISG", year: 2021, category: "Programme" },
  { id: 7, image: "/certs/hackatac.jpg", title: "Hack@AC 2021", issuer: "CSA", year: 2021, category: "Competition" },
  { id: 8, image: "/certs/thc.jpg", title: "Threat Hunting Challenge", issuer: "CSA, Elastic", year: 2021, category: "Competition" },
  { id: 9, image: "/certs/tisc.jpg", title: "The InfoSecurity Challenge", issuer: "CSIT", year: 2023, category: "Competition" },
  { id: 10, image: "/certs/scrum.jpg", title: "Professional Scrum Master I", issuer: "Scrum.org", year: 2024, category: "Certification" },
  { id: 11, image: "/certs/npkongsi.jpg", title: "Ngee Ann Kongsi Award", issuer: "Ngee Ann Kongsi", year: 2024, category: "Award" },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────

export default function Certs() {
  const [isReady, setIsReady] = useState(false);
  const [filterCat, setFilterCat] = useState<CatKey | "All">("All");
  const [hovered, setHovered] = useState<Certificate | null>(null);
  const [selected, setSelected] = useState<Certificate | null>(null);

  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.left = `${e.clientX + 16}px`;
      tooltipRef.current.style.top = `${e.clientY - 10}px`;
    }
  }, []);

  const visibleCerts =
    filterCat === "All" ? certs : certs.filter((c) => c.category === filterCat);

  const visibleIds = new Set(visibleCerts.map((c) => c.id));

  return (
    <div
      className="cs w-full min-h-screen bg-[#2E2E2E] text-[#D6D6D6]"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto flex">
        {/* LEFT PANEL (unchanged simplified) */}
        <div className="w-[420px] p-10">
          <h2 className="text-6xl font-bold leading-tight mb-6">
            Certifications
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFilterCat("All")}>All</button>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setFilterCat(cat)}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 p-10">
          <CertGrid
            certs={certs}
            visibleIds={visibleIds}
            selected={selected}
            onSelect={setSelected}
            onHover={setHovered}
          />
        </div>
      </div>

      {/* TOOLTIP */}
      <div ref={tooltipRef} style={{ position: "fixed", pointerEvents: "none" }}>
        {hovered && !selected && (
          <div style={{ fontSize: 12 }}>
            {hovered.title}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── GRID COMPONENT ───────────────────────────────────────────────────────

function CertGrid({
  certs,
  visibleIds,
  selected,
  onSelect,
  onHover,
}: {
  certs: Certificate[];
  visibleIds: Set<number>;
  selected: Certificate | null;
  onSelect: (c: Certificate | null) => void;
  onHover: (c: Certificate | null) => void;
}) {
  const visible = certs.filter((c) => visibleIds.has(c.id));

  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-14">
      {visible.map((cert) => {
        const isSelected = selected?.id === cert.id;
        const accent = CAT_COLOR[cert.category];

        return (
          <div
            key={cert.id}
            onMouseEnter={() => onHover(cert)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(isSelected ? null : cert)}
            style={{
              cursor: "pointer",
              opacity: isSelected ? 1 : 0.7,
              transition: "opacity .3s ease",
            }}
          >
            {/* Meta */}
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest">
              <span>{String(cert.id).padStart(2, "0")}</span>
              <div style={{ width: 16, height: 1, background: accent }} />
              <span style={{ color: accent }}>{cert.category}</span>
            </div>

            {/* Title */}
            <div className="text-base mb-1 leading-snug">
              {cert.title}
            </div>

            {/* Footer */}
            <div className="flex justify-between text-xs opacity-60">
              <span>{cert.issuer}</span>
              <span>{cert.year}</span>
            </div>

            {/* Divider */}
            <div className="mt-3 h-px bg-white/10" />

            {/* Accent line */}
            <div
              style={{
                height: 2,
                width: isSelected ? "100%" : "0%",
                background: accent,
                transition: "width .35s ease",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
