"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { StaticImageData } from "next/image";

// ─── TYPES ───────────────────────────────────────────────────────────────────

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

// ─── DATA ─────────────────────────────────────────────────────────────────────

const certs: Certificate[] = [
  { id: 1, image: "/certs/ycep.jpg", title: "Youth Cyber Exploration Programme (YCEP)", issuer: "CSA", year: 2021, category: "Programme" },
  { id: 2, image: "/certs/cctfycep.jpg", title: "Central CTF YCEP", issuer: "CSA, Cybint", year: 2021, category: "Competition" },
  { id: 3, image: "/certs/aycep.jpg", title: "Advanced Youth Cyber Exploration Programme", issuer: "CSA, Cloudsine", year: 2021, category: "Programme" },
  { id: 4, image: "/certs/brainhack2021.jpg", title: "BrainHack 2021", issuer: "DSTA", year: 2021, category: "Competition" },
  { id: 5, image: "/certs/brainhack2024.jpg", title: "BrainHack 2024", issuer: "DSTA", year: 2024, category: "Competition" },
  { id: 6, image: "/certs/buildingblocs.jpg", title: "BuildingBloCS 2021", issuer: "SIMCC, CTE-STEM", year: 2021, category: "Programme" },
  { id: 7, image: "/certs/hackatac.jpg", title: "Hack@AC 2021", issuer: "CSA", year: 2021, category: "Competition" },
  { id: 8, image: "/certs/thc.jpg", title: "Threat Hunting Challenge", issuer: "CSA, Elastic", year: 2021, category: "Competition" },
  { id: 9, image: "/certs/tisc.jpg", title: "The InfoSecurity Challenge", issuer: "CSIT", year: 2023, category: "Competition" },
  { id: 10, image: "/certs/scrum.jpg", title: "Professional Scrum Master I", issuer: "Scrum.org", year: 2024, category: "Certification" },
  { id: 11, image: "/certs/npkongsi.jpg", title: "Ngee Ann Kongsi Award", issuer: "Ngee Ann Kongsi", year: 2024, category: "Award" },
];

const PAGE_SIZE = 6;

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Certs() {
  const [filterCat, setFilterCat] = useState<CatKey | "All">("All");
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handleFilter = (cat: CatKey | "All") => {
    setFilterCat(cat);
    setSelected(null);
    setShowAll(false);
  };

  const allFiltered = filterCat === "All" ? certs : certs.filter(c => c.category === filterCat);
  const hasMore = allFiltered.length > PAGE_SIZE;
  const visibleCerts = showAll ? allFiltered : allFiltered.slice(0, PAGE_SIZE);

  return (
    <div className="relative w-full bg-[#2E2E2E] text-[#D6D6D6] min-h-[700px]">

      <div className="relative max-w-6xl mx-auto px-8 lg:px-16 py-20 pt-14">

        {/* ── Layout: sidebar + grid ── */}
        <div className="flex gap-16 lg:gap-24">

          {/* ── Left sidebar ── */}
          <aside className="w-44 shrink-0 pt-5">
            <nav className="flex flex-col gap-0.5">
              {/* All */}
              <button
                onClick={() => handleFilter("All")}
                className="group flex items-center gap-3 py-2 text-left transition-all duration-200 cursor-pointer"
              >
                <span
                  className="block w-4 h-px transition-all duration-300"
                  style={{ background: filterCat === "All" ? "#fff" : "rgba(255,255,255,0.2)", width: filterCat === "All" ? "24px" : "16px" }}
                />
                <span
                  className="text-[11px] tracking-[0.15em] uppercase transition-colors duration-200"
                  style={{ color: filterCat === "All" ? "#fff" : "rgba(255,255,255,0.4)" }}
                >
                  All
                </span>
                <span className="ml-auto text-[10px] text-white/20">
                  {certs.length}
                </span>
              </button>

              {/* Divider */}
              <div className="my-2 h-px bg-white/[0.06]" />

              {CATEGORIES.map(cat => {
                const count = certs.filter(c => c.category === cat).length;
                const active = filterCat === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleFilter(cat)}
                    className="group flex items-center gap-3 py-2 text-left transition-all duration-200 cursor-pointer"
                  >
                    <span
                      className="block h-px transition-all duration-300"
                      style={{ background: active ? CAT_COLOR[cat] : "rgba(255,255,255,0.15)", width: active ? "24px" : "12px" }}
                    />
                    <span
                      className="text-[11px] tracking-[0.15em] uppercase transition-colors duration-200"
                      style={{ color: active ? CAT_COLOR[cat] : "rgba(255,255,255,0.4)" }}
                    >
                      {cat}
                    </span>
                    <span className="ml-auto text-[10px] text-white/20">{count}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ── Main grid ── */}
          <main className="flex-1 min-w-0">

            {/* Header row */}
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="text-[70px] font-bold text-[#D6D6D6]">
                Certifications
              </h2>
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/25">
                {visibleCerts.length} / {allFiltered.length}
              </span>
            </div>

            {/* Grid */}
            <CertGrid
              certs={visibleCerts}
              filterCat={filterCat}
              onSelect={setSelected}
            />

            {/* Show More */}
            {hasMore && !showAll && (
              <div className="mt-12 flex items-center gap-6">
                <div className="h-px flex-1 bg-white/[0.07]" />
                <button
                  onClick={() => setShowAll(true)}
                  className="group flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer"
                >
                  <span>Show {allFiltered.length - PAGE_SIZE} more</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
                </button>
                <div className="h-px flex-1 bg-white/[0.07]" />
              </div>
            )}

            {showAll && hasMore && (
              <div className="mt-12 flex items-center gap-6">
                <div className="h-px flex-1 bg-white/[0.07]" />
                <button
                  onClick={() => setShowAll(false)}
                  className="group flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer"
                >
                  <span>Collapse</span>
                  <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">↑</span>
                </button>
                <div className="h-px flex-1 bg-white/[0.07]" />
              </div>
            )}

          </main>
        </div>

      </div>

      {/* ── Centered modal overlay ── */}
      {selected && (
        <CertModal
          cert={selected}
          allVisible={filterCat === "All" ? certs : certs.filter(c => c.category === filterCat)}
          onClose={() => setSelected(null)}
          onSelect={setSelected}
        />
      )}
    </div>
  );
}

// ─── GRID ─────────────────────────────────────────────────────────────────────

function CertGrid({
  certs,
  filterCat,
  onSelect,
}: {
  certs: Certificate[];
  filterCat: CatKey | "All";
  onSelect: (c: Certificate) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
      {certs.map((cert, index) => {
        const accent = CAT_COLOR[cert.category];
        const globalIndex = index + 1;

        return (
          <button
            key={cert.id}
            onClick={() => onSelect(cert)}
            className="group text-left relative p-6 transition-all duration-300 hover:bg-white/[0.03] cursor-pointer"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Left accent bar */}
            <span
              className="absolute left-0 top-6 bottom-6 w-px transition-all duration-300 opacity-0 group-hover:opacity-100"
              style={{ background: accent }}
            />

            {/* Index + category tag */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] text-white/20 font-mono w-5 tabular-nums">
                {String(globalIndex).padStart(2, "0")}
              </span>
              <span
                className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5"
                style={{
                  color: accent,
                  background: `${accent}18`,
                  border: `1px solid ${accent}30`,
                }}
              >
                {cert.category}
              </span>
            </div>

            {/* Title */}
            <p className="text-sm leading-snug text-white/75 group-hover:text-white/95 transition-colors duration-200 mb-2 pr-4">
              {cert.title}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/30">{cert.issuer}</span>
              <span className="text-[11px] text-white/20 font-mono">{cert.year}</span>
            </div>

            {/* Bottom progress line */}
            <span
              className="absolute bottom-0 left-0 h-px transition-all duration-500 ease-out opacity-0 group-hover:opacity-100"
              style={{ background: `linear-gradient(to right, ${accent}, transparent)`, width: "60%" }}
            />
          </button>
        );
      })}
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────

function CertModal({
  cert,
  allVisible,
  onClose,
  onSelect,
}: {
  cert: Certificate;
  allVisible: Certificate[];
  onClose: () => void;
  onSelect: (c: Certificate) => void;
}) {
  const [lightbox, setLightbox] = useState(false);
  const [entering, setEntering] = useState(true);
  const accent = CAT_COLOR[cert.category];

  const idx = allVisible.findIndex(c => c.id === cert.id);
  const prev = allVisible[idx - 1] ?? null;
  const next = allVisible[idx + 1] ?? null;

  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (lightbox) setLightbox(false); else onClose(); }
      if (e.key === "ArrowLeft" && prev) onSelect(prev);
      if (e.key === "ArrowRight" && next) onSelect(next);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, onClose, prev, next, onSelect]);

  const imgSrc = typeof cert.image === "string" ? cert.image : cert.image.src;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(6px)",
          opacity: entering ? 0 : 0.35,
        }}
      />

      {/* Modal — vertically and horizontally centered */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        style={{ padding: "2rem" }}
      >
        <div
          className="pointer-events-auto w-full max-w-xl transition-all duration-300"
          style={{
            background: "#2E2E2E",
            border: "1px solid rgba(255,255,255,0.1)",
            opacity: entering ? 0 : 1,
            transform: entering ? "translateY(12px)" : "translateY(0)",
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
            <div className="flex items-center gap-3">
              <span
                className="w-1 h-4"
                style={{ background: accent }}
              />
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{ color: accent }}
              >
                {cert.category}
              </span>
              <span className="text-[10px] tracking-[0.2em] text-white/25 font-mono">
                {cert.year}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/70 transition-colors duration-150 flex items-center gap-1.5 cursor-pointer"
            >
              <span>ESC</span>
              <span className="text-white/20">✕</span>
            </button>
          </div>

          {/* Image */}
          <div
            className="relative w-full bg-[#141414] overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src={imgSrc}
              alt={cert.title}
              className="w-full h-full object-contain"
            />
            {/* Subtle vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)" }}
            />
            <button
              onClick={() => setLightbox(true)}
              className="absolute bottom-3 right-3 text-[10px] tracking-[0.15em] uppercase text-white/40 hover:text-white/80 transition-colors duration-150 flex items-center gap-1.5 px-2.5 py-1.5 cursor-pointer"
              style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Expand ↗
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <h3 className="text-base font-normal leading-snug text-white/90 mb-1.5">
              {cert.title}
            </h3>
            <p className="text-[12px] text-white/40 italic mb-5">{cert.issuer}</p>

            {/* Divider */}
            <div
              className="h-px mb-5"
              style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  disabled={!prev}
                  onClick={() => prev && onSelect(prev)}
                  className="group flex items-center gap-2 px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span className="transition-transform duration-150 group-hover:-translate-x-0.5 group-disabled:translate-x-0">←</span>
                  <span>Prev</span>
                </button>
                <button
                  disabled={!next}
                  onClick={() => next && onSelect(next)}
                  className="group flex items-center gap-2 px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span>Next</span>
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5 group-disabled:translate-x-0">→</span>
                </button>
              </div>

              {/* Index indicator */}
              <div className="flex items-center gap-1.5">
                {allVisible.slice(0, Math.min(allVisible.length, 11)).map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => onSelect(c)}
                    className="transition-all duration-200 cursor-pointer"
                    style={{
                      width: c.id === cert.id ? "16px" : "4px",
                      height: "4px",
                      background: c.id === cert.id ? accent : "rgba(255,255,255,0.15)",
                    }}
                    aria-label={c.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={() => setLightbox(false)}
        >
          <img
            src={imgSrc}
            alt={cert.title}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            style={{ boxShadow: "0 0 80px rgba(0,0,0,0.8)" }}
          />
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-6 right-6 text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white/80 transition-colors cursor-pointer"
          >
            Close ✕
          </button>
        </div>
      )}
    </>
  );
}
