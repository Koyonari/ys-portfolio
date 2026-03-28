"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Certificate {
  id: number;
  code: string;
  title: string;
  issuer: string;
  year: number;
  category: "Dev" | "Design" | "Cloud" | "Data" | "Security" | "Other";
  credentialId?: string;
}

const certs: Certificate[] = [
  { id: 1,  code: "C001", title: "AWS Certified Solutions Architect",    issuer: "Amazon Web Services", year: 2025, category: "Cloud",    credentialId: "AWS-SAA-C03"    },
  { id: 2,  code: "C002", title: "Google UX Design Professional",        issuer: "Google",              year: 2025, category: "Design",   credentialId: "GCP-UX-2025"    },
  { id: 3,  code: "C003", title: "Meta React Developer",                 issuer: "Meta",                year: 2025, category: "Dev",      credentialId: "META-RD-001"    },
  { id: 4,  code: "C004", title: "Certified Kubernetes Administrator",   issuer: "CNCF",                year: 2024, category: "Cloud",    credentialId: "CKA-2024-0421"  },
  { id: 5,  code: "C005", title: "TensorFlow Developer Certificate",     issuer: "Google",              year: 2024, category: "Data",     credentialId: "TF-DEV-2024"    },
  { id: 6,  code: "C006", title: "Figma Advanced Design Systems",        issuer: "Figma",               year: 2024, category: "Design",   credentialId: "FIG-ADS-007"    },
  { id: 7,  code: "C007", title: "CompTIA Security+",                    issuer: "CompTIA",             year: 2024, category: "Security", credentialId: "COMP-SEC-2024"  },
  { id: 8,  code: "C008", title: "MongoDB Associate Developer",          issuer: "MongoDB",             year: 2024, category: "Dev",      credentialId: "MDB-DEV-0832"   },
  { id: 9,  code: "C009", title: "GitHub Actions CI/CD",                 issuer: "GitHub",              year: 2023, category: "Dev",      credentialId: "GH-ACT-2023"    },
  { id: 10, code: "C010", title: "Google Cloud Digital Leader",          issuer: "Google Cloud",        year: 2023, category: "Cloud",    credentialId: "GCD-LDR-10"     },
  { id: 11, code: "C011", title: "IBM Data Science Professional",        issuer: "IBM",                 year: 2023, category: "Data",     credentialId: "IBM-DS-1104"    },
  { id: 12, code: "C012", title: "Responsive Web Design",                issuer: "freeCodeCamp",        year: 2023, category: "Design",   credentialId: "FCC-RWD-2023"   },
  { id: 13, code: "C013", title: "Python for Data Science",              issuer: "Coursera / IBM",      year: 2023, category: "Data",     credentialId: "CRS-PY-0923"    },
  { id: 14, code: "C014", title: "Ethical Hacking Essentials",           issuer: "EC-Council",          year: 2022, category: "Security", credentialId: "ECC-EHE-22"     },
  { id: 15, code: "C015", title: "JavaScript Algorithms & Structures",   issuer: "freeCodeCamp",        year: 2022, category: "Dev",      credentialId: "FCC-JSA-2022"   },
  { id: 16, code: "C016", title: "Agile Project Management",             issuer: "PMI",                 year: 2022, category: "Other",    credentialId: "PMI-AGL-0056"   },
];

const CATEGORIES = ["Dev", "Design", "Cloud", "Data", "Security", "Other"] as const;
type CatKey = typeof CATEGORIES[number];
const YEARS = [2022, 2023, 2024, 2025];
const LEFT_W = 380;

// Deterministic position jitter so stacked dots spread
function jitter(seed: number, range: number): number {
  return ((seed * 2654435761) % 1000) / 1000 * range - range / 2;
}

// Per-category accent colours
const CAT_COLOR: Record<string, string> = {
  Dev: "#7E8FBE",
  Design: "#BE9A7E",
  Cloud: "#7EAABE",
  Data: "#A27EBE",
  Security: "#BE7E7E",
  Other: "#8ABE7E",
};

export default function Certs() {
  const [isReady, setIsReady]     = useState(false);
  const [filterCat, setFilterCat] = useState<CatKey | "All">("All");
  const [hovered, setHovered]     = useState<Certificate | null>(null);
  const [selected, setSelected]   = useState<Certificate | null>(null);
  const tooltipRef                = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.left = `${e.clientX + 16}px`;
      tooltipRef.current.style.top  = `${e.clientY - 10}px`;
    }
  }, []);

  const visibleCerts = filterCat === "All" ? certs : certs.filter(c => c.category === filterCat);
  const visibleIds   = new Set(visibleCerts.map(c => c.id));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;1,300&family=Work+Sans:wght@300;400;500&display=swap');

        .cs {
          --bg:           #2E2E2E;
          --fg:           #D6D6D6;
          --muted:        #54544F;
          --muted-bright: #8A8A84;
          --rule:         rgba(214,214,214,0.06);
          --rule-bright:  rgba(214,214,214,0.11);
          --ease:         cubic-bezier(0.16,1,0.3,1);
          --margin:       40px;
        }

        /* Shared grid hairlines */
        .cs-rule  { position:absolute; top:0; bottom:0; width:1px; pointer-events:none; z-index:10; }
        .cs-hrule { position:absolute; left:0; right:0; height:1px; pointer-events:none; z-index:10; }

        /* Staggered entrance */
        @keyframes cs-up {
          from { opacity:0; transform:translateY(9px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .cs [data-a] { opacity:0; }
        .cs.ready [data-a="1"] { animation:cs-up .9s var(--ease) .05s forwards; }
        .cs.ready [data-a="2"] { animation:cs-up .9s var(--ease) .18s forwards; }
        .cs.ready [data-a="3"] { animation:cs-up .9s var(--ease) .30s forwards; }
        .cs.ready [data-a="4"] { animation:cs-up .9s var(--ease) .42s forwards; }
        .cs.ready [data-a="5"] { animation:cs-up .9s var(--ease) .54s forwards; }

        /* Scrolling ticker */
        @keyframes cs-scroll { to { transform:translateY(-50%); } }
        .cs-ticker { animation:cs-scroll 20s linear infinite; }
        .cs-ticker:hover { animation-play-state:paused; }

        /* Scatter dot */
        .cs-dot {
          position:absolute;
          width:9px; height:9px;
          border-radius:50%;
          border:1px solid;
          background:transparent;
          transform:translate(-50%,-50%);
          cursor:pointer;
          transition:
            transform .25s var(--ease),
            background .2s ease,
            opacity .4s ease;
        }
        .cs-dot:hover  { transform:translate(-50%,-50%) scale(1.7); }
        .cs-dot.sel    { transform:translate(-50%,-50%) scale(2.1); z-index:30; }
        .cs-dot.dimmed { opacity:0.12; pointer-events:none; }

        /* Filter pill */
        .cs-pill {
          font-family:'Work Sans',sans-serif;
          font-size:7.5px;
          letter-spacing:0.15em;
          text-transform:uppercase;
          padding:5px 11px;
          border:1px solid var(--rule-bright);
          background:transparent;
          color:var(--muted-bright);
          cursor:pointer;
          transition:all .2s ease;
          line-height:1;
        }
        .cs-pill:hover { border-color:rgba(214,214,214,0.3); color:var(--fg); }
        .cs-pill.on { border-color:rgba(214,214,214,0.45); color:var(--fg); background:rgba(214,214,214,0.05); }

        /* Stamp overlay */
        .cs-stamp-overlay {
          position:absolute; inset:0;
          pointer-events:none; opacity:0;
          transition:opacity .35s var(--ease);
          z-index:40;
          display:flex; align-items:center; justify-content:center;
        }
        .cs-stamp-overlay.vis { pointer-events:auto; opacity:1; }

        /* Stamp card — looks like a credential document */
        .cs-stamp-card {
          position:relative;
          width:460px; max-width:92%;
          background:#2E2E2E;
          border:1px solid rgba(214,214,214,0.2);
          padding:44px 48px 40px;
        }
        /* Four registration-mark corners */
        .cs-stamp-card::before { content:''; position:absolute; top:-5px; left:-5px; width:10px; height:10px; border-top:1px solid rgba(214,214,214,0.4); border-left:1px solid rgba(214,214,214,0.4); }
        .cs-stamp-card::after  { content:''; position:absolute; bottom:-5px; right:-5px; width:10px; height:10px; border-bottom:1px solid rgba(214,214,214,0.4); border-right:1px solid rgba(214,214,214,0.4); }

        /* Tooltip */
        .cs-tt {
          position:fixed;
          pointer-events:none;
          z-index:100;
          background:#2E2E2E;
          border:1px solid rgba(214,214,214,0.16);
          padding:8px 13px;
          opacity:0;
          transition:opacity .15s ease;
          max-width:210px;
        }
        .cs-tt.vis { opacity:1; }

        /* Scanline shimmer on field */
        .cs-scanline {
          position:absolute; inset:0; pointer-events:none;
          background:repeating-linear-gradient(
            0deg, transparent 0px, transparent 3px,
            rgba(0,0,0,0.045) 3px, rgba(0,0,0,0.045) 4px
          );
        }
      `}</style>

      <div
        className={`cs relative w-full bg-[#2E2E2E]${isReady ? " ready" : ""}`}
        style={{ minHeight:"100vh" }}
        onMouseMove={handleMouseMove}
      >

        <div className="max-w-7xl mx-auto flex" style={{ minHeight:"100vh" }}>

          {/* ══ LEFT PANEL ══ */}
          <div
            className="shrink-0 flex flex-col justify-between z-10 bg-[#2E2E2E] sticky top-0 h-screen"
            style={{ width:`${LEFT_W}px`, paddingLeft:40, paddingRight:32, paddingTop:40, paddingBottom:40 }}
          >
            {/* Top label */}
            <div data-a="1">
              <span style={{
                fontFamily:"'Work Sans',sans-serif", fontSize:"8px",
                letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--muted)",
              }}>
                004 — Credentials
              </span>
            </div>

            {/* Heading + ticker */}
            <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
              <h2
                data-a="2"
                style={{
                  fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",
                  fontSize:"92px", lineHeight:"0.94em",
                  color:"#D6D6D6", fontWeight:700, margin:0, userSelect:"none",
                }}
              >
                Certi<br/>fied
              </h2>

              <div style={{ height:28 }} />

              {/* Scrolling cert list */}
              <div
                data-a="3"
                style={{
                  height:164, overflow:"hidden", position:"relative",
                  borderTop:"1px solid var(--rule-bright)",
                  borderBottom:"1px solid var(--rule-bright)",
                }}
              >
                <div style={{ position:"absolute", top:0, left:0, right:0, height:28, zIndex:2, pointerEvents:"none",
                  background:"linear-gradient(to bottom,#2E2E2E,transparent)" }} />
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:28, zIndex:2, pointerEvents:"none",
                  background:"linear-gradient(to top,#2E2E2E,transparent)" }} />
                <div className="cs-ticker" style={{ paddingTop:8 }}>
                  {[...certs, ...certs].map((c, i) => (
                    <div
                      key={i}
                      style={{
                        display:"grid", gridTemplateColumns:"2.2rem 1fr",
                        gap:10, padding:"8px 0",
                        borderBottom:"1px solid var(--rule)",
                        cursor:"pointer",
                        opacity: selected?.id === c.id ? 1 : 0.4,
                        transition:"opacity .18s ease",
                      }}
                      onClick={() => setSelected(certs.find(x => x.id === c.id) ?? null)}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = selected?.id === c.id ? "1" : "0.4")}
                    >
                      <span style={{ fontFamily:"'Work Sans',sans-serif", fontSize:"7.5px",
                        letterSpacing:"0.10em", color:"var(--muted)" }}>{c.code}</span>
                      <span style={{ fontFamily:"'Work Sans',sans-serif", fontSize:"10px",
                        letterSpacing:"-0.01em", lineHeight:"1.35em", color:"var(--fg)",
                        overflow:"hidden", display:"-webkit-box",
                        WebkitLineClamp:1, WebkitBoxOrient:"vertical" }}>{c.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ height:24 }} />

              {/* Category filter pills + colour legend */}
              <div data-a="4">
                <span style={{ fontFamily:"'Work Sans',sans-serif", fontSize:"7.5px",
                  letterSpacing:"0.16em", textTransform:"uppercase",
                  color:"var(--muted)", display:"block", marginBottom:10 }}>
                  Filter
                </span>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  <button className={`cs-pill${filterCat === "All" ? " on" : ""}`}
                    onClick={() => { setFilterCat("All"); setSelected(null); }}>All</button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      className={`cs-pill${filterCat === cat ? " on" : ""}`}
                      onClick={() => { setFilterCat(cat); setSelected(null); }}
                      style={{ borderLeftColor: CAT_COLOR[cat], borderLeftWidth:2 }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: count */}
            <div data-a="5" style={{ display:"flex", alignItems:"baseline", gap:8 }}>
              <span style={{ fontFamily:"'Merriweather',Georgia,serif",
                fontSize:"48px", lineHeight:"1em", color:"#D6D6D6", fontWeight:400 }}>
                {String(visibleCerts.length).padStart(2, "0")}
              </span>
              <span style={{ fontFamily:"'Work Sans',sans-serif", fontSize:"8px",
                letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--muted)" }}>
                / {String(certs.length).padStart(2, "0")} total
              </span>
            </div>
          </div>

          {/* ══ RIGHT PANEL: scatter field ══ */}
          <div className="flex-1 relative overflow-hidden" style={{ paddingLeft:48, paddingRight:40 }}>
            <div className="cs-scanline" />
            <ScatterField
              certs={certs}
              visibleIds={visibleIds}
              selected={selected}
              isReady={isReady}
              onSelect={setSelected}
              onHover={setHovered}
            />

            {/* Stamp detail overlay */}
            <div className={`cs-stamp-overlay${selected ? " vis" : ""}`}>
              {selected && (
                <StampDetail
                  cert={selected}
                  allVisible={visibleCerts}
                  onClose={() => setSelected(null)}
                  onSelect={setSelected}
                />
              )}
            </div>
          </div>

        </div>

        {/* Floating tooltip */}
        <div ref={tooltipRef} className={`cs-tt${hovered && !selected ? " vis" : ""}`}>
          {hovered && (
            <>
              <div style={{ fontFamily:"'Work Sans',sans-serif", fontSize:"8.5px",
                letterSpacing:"0.10em", textTransform:"uppercase",
                color:CAT_COLOR[hovered.category] ?? "var(--muted-bright)", marginBottom:3 }}>
                {hovered.code} · {hovered.category}
              </div>
              <div style={{ fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",
                fontSize:"11px", letterSpacing:"-0.01em",
                color:"var(--fg)", lineHeight:"1.4em" }}>
                {hovered.title}
              </div>
              <div style={{ fontFamily:"'Work Sans',sans-serif", fontSize:"8.5px",
                color:"var(--muted)", marginTop:3 }}>
                {hovered.issuer} · {hovered.year}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Scatter field ───────────────────────────────────────────────────────────

interface ScatterFieldProps {
  certs: Certificate[];
  visibleIds: Set<number>;
  selected: Certificate | null;
  isReady: boolean;
  onSelect: (c: Certificate | null) => void;
  onHover: (c: Certificate | null) => void;
}

function ScatterField({ certs, visibleIds, selected, isReady, onSelect, onHover }: ScatterFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(e => {
      setSize({ w: e[0].contentRect.width, h: e[0].contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const PL = 56, PR = 20, PT = 52, PB = 48;
  const fw = size.w - PL - PR;
  const fh = size.h - PT - PB;

  function xOfYear(y: number) {
    return PL + (YEARS.indexOf(y) / (YEARS.length - 1)) * fw;
  }
  function yOfCat(c: string) {
    return PT + (CATEGORIES.indexOf(c as CatKey) / (CATEGORIES.length - 1)) * fh;
  }

  return (
    <div ref={ref} className="absolute inset-0">
      {size.w > 0 && (
        <>
          {/* Gridlines Y (category rows) */}
          {CATEGORIES.map(cat => {
            const y = yOfCat(cat);
            const active = [...visibleIds].some(id => certs.find(c => c.id === id)?.category === cat);
            return (
              <div key={cat}>
                <div style={{ position:"absolute", left:PL, right:PR, top:y, height:1,
                  background:"var(--rule)", pointerEvents:"none" }} />
                <div style={{
                  position:"absolute", right:size.w - PL + 10, top:y,
                  transform:"translateY(-50%)",
                  fontFamily:"'Work Sans',sans-serif", fontSize:"7.5px",
                  letterSpacing:"0.13em", textTransform:"uppercase",
                  color:active ? "var(--muted-bright)" : "var(--muted)",
                  transition:"color .25s ease", userSelect:"none", whiteSpace:"nowrap",
                }}>
                  {cat}
                </div>
                {/* Category accent tick */}
                <div style={{
                  position:"absolute", left:PL - 6, top:y,
                  width:5, height:1,
                  background:active ? CAT_COLOR[cat] : "rgba(214,214,214,0.12)",
                  transition:"background .25s ease",
                }} />
              </div>
            );
          })}

          {/* Gridlines X (year columns) */}
          {YEARS.map(year => {
            const x = xOfYear(year);
            return (
              <div key={year}>
                <div style={{ position:"absolute", left:x, top:PT, bottom:PB, width:1,
                  background:"var(--rule)", pointerEvents:"none" }} />
                <div style={{
                  position:"absolute", left:x, top:PT - 24,
                  transform:"translateX(-50%)",
                  fontFamily:"'Work Sans',sans-serif", fontSize:"7.5px",
                  letterSpacing:"0.14em", color:"var(--muted)", userSelect:"none",
                }}>
                  {year}
                </div>
              </div>
            );
          })}

          {/* Origin corner tick */}
          <div style={{ position:"absolute", left:PL - 4, top:PT - 4, width:8, height:8,
            borderTop:"1px solid rgba(214,214,214,0.18)",
            borderLeft:"1px solid rgba(214,214,214,0.18)", pointerEvents:"none" }} />

          {/* Dots */}
          {certs.map((cert, i) => {
            const x = xOfYear(cert.year) + jitter(cert.id * 3 + 1, 30);
            const y = yOfCat(cert.category) + jitter(cert.id * 7 + 3, 24);
            const isVis = visibleIds.has(cert.id);
            const isSel = selected?.id === cert.id;
            const accent = CAT_COLOR[cert.category];

            return (
              <div
                key={cert.id}
                className={`cs-dot${isSel ? " sel" : ""}${!isVis ? " dimmed" : ""}`}
                style={{
                  left: x, top: y,
                  borderColor: isSel ? accent : `${accent}88`,
                  background: isSel ? accent : "transparent",
                  opacity: isReady ? (isVis ? 1 : 0.1) : 0,
                  transitionDelay: `${i * 0.022}s`,
                  zIndex: isSel ? 30 : undefined,
                }}
                onMouseEnter={() => { if (isVis) onHover(cert); }}
                onMouseLeave={() => onHover(null)}
                onClick={() => { if (isVis) onSelect(isSel ? null : cert); }}
              />
            );
          })}

          {/* Field label — bottom right */}
          <div style={{
            position:"absolute", right:PR, bottom:PB - 32,
            fontFamily:"'Work Sans',sans-serif", fontSize:"7px",
            letterSpacing:"0.12em", textTransform:"uppercase",
            color:"rgba(214,214,214,0.18)", userSelect:"none",
          }}>
            Year × Category
          </div>
        </>
      )}
    </div>
  );
}

// ─── Stamp Detail ────────────────────────────────────────────────────────────

function StampDetail({
  cert, allVisible, onClose, onSelect,
}: {
  cert: Certificate;
  allVisible: Certificate[];
  onClose: () => void;
  onSelect: (c: Certificate) => void;
}) {
  const accent = CAT_COLOR[cert.category] ?? "#BEB8A7";
  const idx    = allVisible.findIndex(c => c.id === cert.id);
  const prev   = allVisible[idx - 1] ?? null;
  const next   = allVisible[idx + 1] ?? null;

  return (
    <>
      {/* Dim backdrop */}
      <div
        style={{ position:"absolute", inset:0, background:"rgba(46,46,46,0.75)",
          backdropFilter:"blur(2px)", cursor:"pointer" }}
        onClick={onClose}
      />

      <div className="cs-stamp-card">
        {/* Extra registration marks (complement ::before/::after) */}
        <div style={{ position:"absolute", top:-5, right:-5, width:10, height:10,
          borderTop:"1px solid rgba(214,214,214,0.4)", borderRight:"1px solid rgba(214,214,214,0.4)" }} />
        <div style={{ position:"absolute", bottom:-5, left:-5, width:10, height:10,
          borderBottom:"1px solid rgba(214,214,214,0.4)", borderLeft:"1px solid rgba(214,214,214,0.4)" }} />

        {/* Close */}
        <button onClick={onClose} style={{
          position:"absolute", top:16, right:18,
          fontFamily:"'Work Sans',sans-serif", fontSize:"8px",
          letterSpacing:"0.18em", textTransform:"uppercase",
          color:"var(--muted-bright)", background:"none", border:"none",
          cursor:"pointer", padding:0, transition:"color .18s ease",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted-bright)")}
        >
          Close ✕
        </button>

        {/* Accent stripe */}
        <div style={{ width:28, height:2, background:accent, marginBottom:18 }} />

        {/* Code · Category */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
          <span style={{ fontFamily:"'Work Sans',sans-serif", fontSize:"8px",
            letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--muted)" }}>
            {cert.code}
          </span>
          <span style={{ width:1, height:11, background:"var(--rule-bright)" }} />
          <span style={{ fontFamily:"'Work Sans',sans-serif", fontSize:"8px",
            letterSpacing:"0.14em", textTransform:"uppercase", color:accent }}>
            {cert.category}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",
          fontSize:"clamp(20px,2.6vw,30px)", lineHeight:"1.12em",
          letterSpacing:"-0.02em", color:"#D6D6D6", fontWeight:700,
          margin:"0 0 6px", maxWidth:360,
        }}>
          {cert.title}
        </h3>

        {/* Issuer — italic serif, softer */}
        <p style={{
          fontFamily:"'Merriweather',Georgia,serif",
          fontSize:"12.5px", fontStyle:"italic", fontWeight:300,
          color:"var(--muted-bright)", margin:"0 0 24px", letterSpacing:"0.01em",
        }}>
          {cert.issuer}
        </p>

        <div style={{ height:1, background:"var(--rule-bright)", marginBottom:18 }} />

        {/* Meta grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 24px" }}>
          {[
            { label:"Year",          value:String(cert.year)          },
            { label:"Credential ID", value:cert.credentialId ?? "—"   },
          ].map(row => (
            <div key={row.label}>
              <div style={{ fontFamily:"'Work Sans',sans-serif", fontSize:"7.5px",
                letterSpacing:"0.16em", textTransform:"uppercase",
                color:"var(--muted)", marginBottom:4 }}>
                {row.label}
              </div>
              <div style={{ fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",
                fontSize:"12px", letterSpacing:"-0.01em", color:"var(--fg)" }}>
                {row.value}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop:28, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          {/* Prev / Next */}
          <div style={{ display:"flex", gap:14 }}>
            {([{ label:"← Prev", cert:prev }, { label:"Next →", cert:next }] as const).map(btn => (
              <button
                key={btn.label}
                disabled={!btn.cert}
                onClick={() => btn.cert && onSelect(btn.cert)}
                style={{
                  fontFamily:"'Work Sans',sans-serif", fontSize:"8px",
                  letterSpacing:"0.16em", textTransform:"uppercase",
                  color:btn.cert ? "var(--muted-bright)" : "var(--muted)",
                  background:"none", border:"none",
                  cursor:btn.cert ? "pointer" : "default",
                  opacity:btn.cert ? 1 : 0.3, padding:0,
                  transition:"color .18s ease",
                }}
                onMouseEnter={e => { if (btn.cert) e.currentTarget.style.color = "var(--fg)"; }}
                onMouseLeave={e => { if (btn.cert) e.currentTarget.style.color = "var(--muted-bright)"; }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button style={{
            fontFamily:"'Work Sans',sans-serif", fontSize:"8px",
            letterSpacing:"0.18em", textTransform:"uppercase",
            color:"var(--fg)", background:"none",
            border:"1px solid rgba(214,214,214,0.22)",
            padding:"10px 20px", cursor:"pointer",
            display:"flex", alignItems:"center", gap:8,
            transition:"border-color .22s ease, background .22s ease",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(214,214,214,0.5)";
              e.currentTarget.style.background  = "rgba(214,214,214,0.05)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(214,214,214,0.22)";
              e.currentTarget.style.background  = "none";
            }}
          >
            View Credential <span style={{ fontSize:10 }}>↗</span>
          </button>
        </div>
      </div>
    </>
  );
}
