"use client";

import { useEffect, useRef, useState } from "react";
import type { StaticImageData } from "next/image";

interface Certificate {
  id: number;
  image: StaticImageData | string;
  title: string;
  issuer: string;
  year: number;
  category: "Competition" | "Award" | "Certification";
}

const CATEGORIES = ["Competition", "Award", "Certification"] as const;
type CatKey = typeof CATEGORIES[number];

const CAT_COLOR: Record<CatKey, string> = {
  Competition: "#BE7E7E",
  Award: "#C8AA6E",
  Certification: "#A27EBE",
};

const certs: Certificate[] = [
  // Award
  { id: 1,  image: "/certs/directorslisty2s2.jpg", title: "Director's List Year 2 Semester 2", issuer: "Ngee Ann Polytechnic", year: 2025, category: "Award" },
  { id: 2,  image: "/certs/directorslisty2s1.jpg", title: "Director's List Year 2 Semester 1", issuer: "Ngee Ann Polytechnic", year: 2024, category: "Award" },
  { id: 3,  image: "/certs/oracleinternship.jpg", title: "Oracle Internship 2025-2026", issuer: "Oracle", year: 2025, category: "Award" },
  { id: 4,  image: "/certs/nak2025.png", title: "Ngee Ann Kongsi Study Award 2025/2026", issuer: "Ngee Ann Kongsi", year: 2025, category: "Award" },
  { id: 5,  image: "/certs/nak2024.png", title: "Ngee Ann Kongsi Study Award 2024/2025", issuer: "Ngee Ann Kongsi", year: 2024, category: "Award" },
  { id: 6,  image: "/certs/edusavemerit2025.jpg", title: "Edusave Merit Bursary 2025", issuer: "Ministry of Education Singapore", year: 2025, category: "Award" },
  { id: 7,  image: "/certs/edusavecert2025.jpg", title: "Edusave Certificate of Academic Achievement 2025", issuer: "Ministry of Education Singapore", year: 2025, category: "Award" },
  // Certification  
  { id: 8,  image: "/certs/oraclecert.png", title: "Oracle Cloud Infrastructure 2025 Foundations Associate", issuer: "Oracle", year: 2025, category: "Certification" },
  { id: 9,  image: "/certs/oracleai.png", title: "Oracle Cloud Infrastructure 2025 AI Foundations Associate", issuer: "Oracle", year: 2025, category: "Certification" },
  { id: 10, image: "/certs/oracleapex.png", title: "Oracle APEX Foundations", issuer: "Oracle", year: 2025, category: "Certification" },
  { id: 11, image: "/certs/Professional Scrum Master I.png", title: "Professional Scrum Master I", issuer: "Scrum.org", year: 2024, category: "Certification" },
  { id: 12, image: "/certs/FoundationsofProjectManagement.png", title: "Foundations of Project Management", issuer: "Google", year: 2024, category: "Certification" },
  // Competition
  { id: 13, image: "/certs/SIL2025_AnYongShyan.jpg", title: "Singapore Informatics League 2025", issuer: "NUS Centre for Nurturing Computing Excellence (CeNCE)", year: 2025, category: "Competition" },
  { id: 14, image: "/certs/BrainHack 2024 Certificate.jpg", title: "BrainHack 2024", issuer: "DSTA", year: 2024, category: "Competition" },
  { id: 15, image: "/certs/Brainhack 2021 Certificate.jpg", title: "BrainHack 2021", issuer: "DSTA", year: 2021, category: "Competition" },
  { id: 16, image: "/certs/TISC 2023 Organising Team - TISC 2023 Badge of Participation - 2023-10-13.png", title: "The InfoSecurity Challenge", issuer: "CSIT", year: 2023, category: "Competition" },
  { id: 17, image: "/certs/NYP YCEP 2021 Certificate.png", title: "Youth Cyber Exploration Programme (YCEP)", issuer: "CSA", year: 2021, category: "Competition" },
  { id: 18, image: "/certs/Central CTF Youth Cyber Exploration Programme 2021 Certificate.png", title: "Central CTF YCEP", issuer: "CSA, Cybint", year: 2021, category: "Competition" },
  { id: 19, image: "/certs/AYCEP 2021.jpg", title: "Advanced Youth Cyber Exploration Programme", issuer: "CSA, Cloudsine", year: 2021, category: "Competition" },
  { id: 20, image: "/certs/BuildingBloCS 2021 Certificate.jpg", title: "BuildingBloCS 2021", issuer: "SIMCC, CTE-STEM", year: 2021, category: "Competition" },
  { id: 21, image: "/certs/Hack@AC 2021 Certificate.jpg", title: "Hack@AC 2021", issuer: "CSA", year: 2021, category: "Competition" },
  { id: 22, image: "/certs/THC 2021 Certificate.png", title: "Threat Hunting Challenge 2021", issuer: "CSA, Elastic", year: 2021, category: "Competition" },
];

const PAGE_SIZE = 6;

interface CertsProps {
  id?: string;
}

export default function Certs({ id }: CertsProps) {
  const [filterCat, setFilterCat] = useState<CatKey | "All">("All");
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [vw, setVw] = useState(1440);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 1024;

  const handleFilter = (cat: CatKey | "All") => {
    setFilterCat(cat);
    setSelected(null);
    setShowAll(false);
  };

  const allFiltered = filterCat === "All" ? certs : certs.filter(c => c.category === filterCat);
  const hasMore = allFiltered.length > PAGE_SIZE;
  const visibleCerts = showAll ? allFiltered : allFiltered.slice(0, PAGE_SIZE);

  return (
    <div id={id} className="relative w-full text-[#D6D6D6] min-h-[700px]">
      <div className="relative mx-auto max-w-7xl px-[clamp(1.25rem,4vw,4rem)] py-16 pt-10">

        {/* Mobile layout */}
        {isMobile || isTablet ? (
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-baseline justify-between">
              <h2 className="font-bold text-[#D6D6D6]" style={{ fontSize: "clamp(36px,10vw,70px)" }}>
                Acolades
              </h2>
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/25">
                {visibleCerts.length} / {allFiltered.length}
              </span>
            </div>

            {/* Horizontal filter bar */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleFilter("All")}
                className="px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer"
                style={{
                  color: filterCat === "All" ? "#fff" : "rgba(255,255,255,0.4)",
                  border: filterCat === "All" ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.12)",
                  background: filterCat === "All" ? "rgba(255,255,255,0.06)" : "transparent",
                }}
              >
                All ({certs.length})
              </button>
              {CATEGORIES.map(cat => {
                const count = certs.filter(c => c.category === cat).length;
                const active = filterCat === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleFilter(cat)}
                    className="px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer"
                    style={{
                      color: active ? CAT_COLOR[cat] : "rgba(255,255,255,0.4)",
                      border: active ? `1px solid ${CAT_COLOR[cat]}60` : "1px solid rgba(255,255,255,0.12)",
                      background: active ? `${CAT_COLOR[cat]}12` : "transparent",
                    }}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Grid */}
            <CertGrid certs={visibleCerts} filterCat={filterCat} onSelect={setSelected} isMobile={isMobile} />

            {/* Show More */}
            {hasMore && !showAll && (
              <div className="mt-6 flex items-center gap-6">
                <div className="h-px flex-1 bg-white/[0.07]" />
                <button onClick={() => setShowAll(true)} className="group flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer">
                  <span>Show {allFiltered.length - PAGE_SIZE} more</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
                </button>
                <div className="h-px flex-1 bg-white/[0.07]" />
              </div>
            )}
            {showAll && hasMore && (
              <div className="mt-6 flex items-center gap-6">
                <div className="h-px flex-1 bg-white/[0.07]" />
                <button onClick={() => setShowAll(false)} className="group flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer">
                  <span>Collapse</span>
                  <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">↑</span>
                </button>
                <div className="h-px flex-1 bg-white/[0.07]" />
              </div>
            )}
          </div>
        ) : (
          /* Desktop sidebar + grid */
          <div className="flex gap-16 lg:gap-24">
            <aside className="w-44 shrink-0 pt-5">
              <nav className="flex flex-col gap-0.5">
                <button onClick={() => handleFilter("All")} className="group flex items-center gap-3 py-2 text-left transition-all duration-200 cursor-pointer">
                  <span className="block w-4 h-px transition-all duration-300" style={{ background: filterCat === "All" ? "#fff" : "rgba(255,255,255,0.2)", width: filterCat === "All" ? "24px" : "16px" }} />
                  <span className="text-[11px] tracking-[0.15em] uppercase transition-colors duration-200" style={{ color: filterCat === "All" ? "#fff" : "rgba(255,255,255,0.4)" }}>All</span>
                  <span className="ml-auto text-[10px] text-white/20">{certs.length}</span>
                </button>
                <div className="my-2 h-px bg-white/[0.06]" />
                {CATEGORIES.map(cat => {
                  const count = certs.filter(c => c.category === cat).length;
                  const active = filterCat === cat;
                  return (
                    <button key={cat} onClick={() => handleFilter(cat)} className="group flex items-center gap-3 py-2 text-left transition-all duration-200 cursor-pointer">
                      <span className="block h-px transition-all duration-300" style={{ background: active ? CAT_COLOR[cat] : "rgba(255,255,255,0.15)", width: active ? "24px" : "12px" }} />
                      <span className="text-[11px] tracking-[0.15em] uppercase transition-colors duration-200" style={{ color: active ? CAT_COLOR[cat] : "rgba(255,255,255,0.4)" }}>{cat}</span>
                      <span className="ml-auto text-[10px] text-white/20">{count}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <main className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between mb-5">
                <h2 className="text-[clamp(48px,5vw,70px)] font-bold text-[#D6D6D6]">Acolades</h2>
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/25">{visibleCerts.length} / {allFiltered.length}</span>
              </div>

              <CertGrid certs={visibleCerts} filterCat={filterCat} onSelect={setSelected} isMobile={false} />

              {hasMore && !showAll && (
                <div className="mt-12 flex items-center gap-6">
                  <div className="h-px flex-1 bg-white/[0.07]" />
                  <button onClick={() => setShowAll(true)} className="group flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer">
                    <span>Show {allFiltered.length - PAGE_SIZE} more</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
                  </button>
                  <div className="h-px flex-1 bg-white/[0.07]" />
                </div>
              )}
              {showAll && hasMore && (
                <div className="mt-12 flex items-center gap-6">
                  <div className="h-px flex-1 bg-white/[0.07]" />
                  <button onClick={() => setShowAll(false)} className="group flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer">
                    <span>Collapse</span>
                    <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">↑</span>
                  </button>
                  <div className="h-px flex-1 bg-white/[0.07]" />
                </div>
              )}
            </main>
          </div>
        )}
      </div>

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

function CertGrid({ certs, filterCat, onSelect, isMobile }: {
  certs: Certificate[];
  filterCat: CatKey | "All";
  onSelect: (c: Certificate) => void;
  isMobile: boolean;
}) {
  return (
    <div className={`grid gap-0 ${isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
      {certs.map((cert, index) => {
        const accent = CAT_COLOR[cert.category];
        return (
          <button
            key={cert.id}
            onClick={() => onSelect(cert)}
            className="group text-left relative p-5 md:p-6 transition-all duration-300 hover:bg-white/[0.03] cursor-pointer"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span className="absolute left-0 top-6 bottom-6 w-px transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ background: accent }} />
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] text-white/20 font-mono w-5 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5" style={{ color: accent, background: `${accent}18`, border: `1px solid ${accent}30` }}>{cert.category}</span>
            </div>
            <p className="text-sm leading-snug text-white/75 group-hover:text-white/95 transition-colors duration-200 mb-2 pr-4">{cert.title}</p>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/30">{cert.issuer}</span>
              <span className="text-[11px] text-white/20 font-mono">{cert.year}</span>
            </div>
            <span className="absolute bottom-0 left-0 h-px transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" style={{ background: `linear-gradient(to right, ${accent}, transparent)`, width: "60%" }} />
          </button>
        );
      })}
    </div>
  );
}

function CertModal({ cert, allVisible, onClose, onSelect }: {
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
      <div onClick={onClose} className="fixed inset-0 z-40 transition-opacity duration-300" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)", opacity: entering ? 0 : 0.35 }} />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none" style={{ padding: "1rem" }}>
        <div
          className="pointer-events-auto w-full transition-all duration-300 bg-[#2F2F2F]"
          style={{ maxWidth: "min(48rem, 95vw)", border: "1px solid rgba(255,255,255,0.1)", opacity: entering ? 0 : 1, transform: entering ? "translateY(12px)" : "translateY(0)" }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
            <div className="flex items-center gap-3">
              <span className="w-1 h-4" style={{ background: accent }} />
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: accent }}>{cert.category}</span>
              <span className="text-[10px] tracking-[0.2em] text-white/25 font-mono">{cert.year}</span>
            </div>
            <button onClick={onClose} className="text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/70 transition-colors duration-150 flex items-center gap-1.5 cursor-pointer">
              <span>ESC</span><span className="text-white/20">✕</span>
            </button>
          </div>

          <div className="relative w-full bg-[#141414] overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <img src={imgSrc} alt={cert.title} className="w-full h-full object-contain" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)" }} />
            <button onClick={() => setLightbox(true)} className="absolute bottom-3 right-3 text-[10px] tracking-[0.15em] uppercase text-white/40 hover:text-white/80 transition-colors duration-150 flex items-center gap-1.5 px-2.5 py-1.5 cursor-pointer" style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
              Expand ↗
            </button>
          </div>

          <div className="px-5 py-5">
            <h3 className="text-base font-normal leading-snug text-white/90 mb-1.5">{cert.title}</h3>
            <p className="text-[12px] text-white/40 italic mb-5">{cert.issuer}</p>
            <div className="h-px mb-5" style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }} />
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-1">
                <button disabled={!prev} onClick={() => prev && onSelect(prev)} className="group flex items-center gap-2 px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="transition-transform duration-150 group-hover:-translate-x-0.5">←</span><span>Prev</span>
                </button>
                <button disabled={!next} onClick={() => next && onSelect(next)} className="group flex items-center gap-2 px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span>Next</span><span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                {allVisible.slice(0, Math.min(allVisible.length, 11)).map((c) => (
                  <button key={c.id} onClick={() => onSelect(c)} className="transition-all duration-200 cursor-pointer" style={{ width: c.id === cert.id ? "16px" : "4px", height: "4px", background: c.id === cert.id ? accent : "rgba(255,255,255,0.15)" }} aria-label={c.title} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.95)" }} onClick={() => setLightbox(false)}>
          <img src={imgSrc} alt={cert.title} className="max-w-[90vw] max-h-[90vh] object-contain" style={{ boxShadow: "0 0 80px rgba(0,0,0,0.8)" }} />
          <button onClick={() => setLightbox(false)} className="absolute top-6 right-6 text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white/80 transition-colors cursor-pointer">Close ✕</button>
        </div>
      )}
    </>
  );
}
