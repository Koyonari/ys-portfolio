"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = "All" | "Tech" | "Life" | "Projects" | "Cybersecurity" | "Thoughts";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  category: Exclude<Category, "All">;
  readTime: string;
  excerpt: string;
  // Each post has a unique pattern type for the animated canvas
  patternType: "grid" | "wave" | "noise" | "circuit" | "dots" | "lines" | "helix" | "morse";
}

// ─── Data ────────────────────────────────────────────────────────────────────

const POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "building-my-home-lab",
    title: "Building My First Home Lab from Scratch",
    date: "Apr 12, 2025",
    dateISO: "2025-04-12",
    category: "Tech",
    readTime: "8 min",
    excerpt: "A deep dive into how I set up my first home lab with recycled hardware, pfSense, and a few sleepless nights.",
    patternType: "circuit",
  },
  {
    id: 2,
    slug: "lessons-from-brainhack-2024",
    title: "What BrainHack 2024 Taught Me About Pressure",
    date: "Mar 28, 2025",
    dateISO: "2025-03-28",
    category: "Cybersecurity",
    readTime: "6 min",
    excerpt: "CTF competitions are chaos. Here's how we placed and what I'd do differently next time.",
    patternType: "helix",
  },
  {
    id: 3,
    slug: "next-js-portfolio-lessons",
    title: "Five Things I Learned Building This Portfolio",
    date: "Feb 14, 2025",
    dateISO: "2025-02-14",
    category: "Projects",
    readTime: "5 min",
    excerpt: "Scroll-jacking, clip-path animations, and why I'll never use a CSS framework blindly again.",
    patternType: "wave",
  },
  {
    id: 4,
    slug: "linux-distro-hopping",
    title: "I Distro-Hopped for 6 Months — Here's Where I Landed",
    date: "Jan 03, 2025",
    dateISO: "2025-01-03",
    category: "Tech",
    readTime: "7 min",
    excerpt: "Arch, NixOS, Fedora, EndeavourOS. The journey, the config grief, and my final daily driver.",
    patternType: "grid",
  },
  {
    id: 5,
    slug: "year-in-review-2024",
    title: "2024 In Review: Certifications, Code & Chaos",
    date: "Dec 31, 2024",
    dateISO: "2024-12-31",
    category: "Life",
    readTime: "10 min",
    excerpt: "Looking back at everything I shipped, learned, and broke across 12 months of a final year at NP.",
    patternType: "dots",
  },
  {
    id: 6,
    slug: "on-being-a-generalist",
    title: "On Being a Generalist in a World of Specialists",
    date: "Nov 19, 2024",
    dateISO: "2024-11-19",
    category: "Thoughts",
    readTime: "4 min",
    excerpt: "Do I focus on security? Frontend? Backend? The honest answer I eventually arrived at.",
    patternType: "lines",
  },
  {
    id: 7,
    slug: "scrum-master-exam",
    title: "Passing the PSM I on the First Try",
    date: "Oct 05, 2024",
    dateISO: "2024-10-05",
    category: "Projects",
    readTime: "5 min",
    excerpt: "Resources, strategy, and the two questions I almost got wrong. A no-fluff study guide.",
    patternType: "morse",
  },
  {
    id: 8,
    slug: "why-i-write",
    title: "Why I Started Writing Again",
    date: "Sep 01, 2024",
    dateISO: "2024-09-01",
    category: "Thoughts",
    readTime: "3 min",
    excerpt: "It wasn't about an audience. It was about slowing down long enough to actually think.",
    patternType: "noise",
  },
];

const CATEGORIES: Category[] = ["All", "Tech", "Life", "Projects", "Cybersecurity", "Thoughts"];

const CAT_COLOR: Record<Exclude<Category, "All">, string> = {
  Tech: "#7EAABE",
  Life: "#BE7E7E",
  Projects: "#7EBE8F",
  Cybersecurity: "#C8AA6E",
  Thoughts: "#A27EBE",
};

// ─── Pattern Canvas ───────────────────────────────────────────────────────────

function PatternCanvas({ type, color }: { type: BlogPost["patternType"]; color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const hex = color;
    const toRgb = (h: string) => {
      const r = parseInt(h.slice(1, 3), 16);
      const g = parseInt(h.slice(3, 5), 16);
      const b = parseInt(h.slice(5, 7), 16);
      return { r, g, b };
    };
    const { r, g, b } = toRgb(hex);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const t = tRef.current;

      if (type === "grid") {
        const spacing = 28;
        ctx.lineWidth = 0.6;
        for (let x = 0; x <= W; x += spacing) {
          for (let y = 0; y <= H; y += spacing) {
            const dist = Math.sqrt((x - W / 2) ** 2 + (y - H / 2) ** 2);
            const alpha = 0.08 + 0.1 * Math.sin(dist / 25 - t * 0.04);
            ctx.strokeStyle = `rgba(${r},${g},${b},${Math.max(0, alpha)})`;
            ctx.beginPath();
            ctx.arc(x + Math.sin(t * 0.03 + y / 40) * 2, y, 1.2, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      } else if (type === "wave") {
        for (let row = 0; row < 8; row++) {
          ctx.beginPath();
          ctx.lineWidth = 0.8;
          for (let x = 0; x <= W; x += 2) {
            const y = (H / 9) * (row + 1) + Math.sin((x / W) * Math.PI * 4 + t * 0.05 + row * 0.6) * 14;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.04 + row * 0.015})`;
          ctx.stroke();
        }
      } else if (type === "noise") {
        const size = 5;
        for (let x = 0; x < W; x += size) {
          for (let y = 0; y < H; y += size) {
            const n = Math.sin(x * 0.05 + t * 0.02) * Math.cos(y * 0.05 + t * 0.015);
            const alpha = Math.max(0, n * 0.12);
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.fillRect(x, y, size, size);
          }
        }
      } else if (type === "circuit") {
        const nodes: [number, number][] = [];
        for (let i = 0; i < 12; i++) {
          nodes.push([
            (W / 12) * i + W / 24,
            H / 2 + Math.sin(i * 1.3 + t * 0.02) * (H * 0.3),
          ]);
        }
        ctx.lineWidth = 0.7;
        for (let i = 0; i < nodes.length - 1; i++) {
          const [x1, y1] = nodes[i];
          const [x2, y2] = nodes[i + 1];
          const alpha = 0.06 + 0.08 * Math.sin(t * 0.04 + i);
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1, y2);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 1.5})`;
          ctx.beginPath();
          ctx.arc(x1, y1, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === "dots") {
        const cols = 18;
        const rows = 6;
        for (let c = 0; c < cols; c++) {
          for (let rw = 0; rw < rows; rw++) {
            const x = (W / cols) * c + W / (cols * 2);
            const y = (H / rows) * rw + H / (rows * 2);
            const pulse = Math.sin(t * 0.06 + c * 0.4 + rw * 0.7);
            const radius = 1.5 + pulse * 1.5;
            const alpha = 0.05 + Math.max(0, pulse) * 0.12;
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, Math.max(0.3, radius), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (type === "lines") {
        const count = 12;
        ctx.lineWidth = 0.6;
        for (let i = 0; i < count; i++) {
          const y = (H / count) * i + (H / count) * 0.5;
          const offset = Math.sin(t * 0.03 + i * 0.5) * 20;
          const alpha = 0.04 + 0.06 * Math.abs(Math.sin(t * 0.025 + i * 0.4));
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(0, y + offset);
          for (let x = 0; x <= W; x += 4) {
            ctx.lineTo(x, y + Math.sin(x / 60 + t * 0.03 + i) * 8 + offset);
          }
          ctx.stroke();
        }
      } else if (type === "helix") {
        ctx.lineWidth = 0.8;
        for (let strand = 0; strand < 2; strand++) {
          ctx.beginPath();
          for (let x = 0; x <= W; x += 2) {
            const phase = strand * Math.PI;
            const y = H / 2 + Math.sin((x / W) * Math.PI * 6 + t * 0.04 + phase) * (H * 0.35);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(${r},${g},${b},${strand === 0 ? 0.12 : 0.07})`;
          ctx.stroke();
        }
        for (let i = 0; i < 10; i++) {
          const x = (W / 10) * i + (W / 20);
          const y1 = H / 2 + Math.sin((x / W) * Math.PI * 6 + t * 0.04) * (H * 0.35);
          const y2 = H / 2 + Math.sin((x / W) * Math.PI * 6 + t * 0.04 + Math.PI) * (H * 0.35);
          ctx.strokeStyle = `rgba(${r},${g},${b},0.05)`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();
        }
      } else if (type === "morse") {
        const rows = 5;
        const dashW = 16;
        const dotR = 3;
        const gap = 8;
        const patterns = [
          [1, 0, 1, 1, 1, 0, 1],
          [1, 1, 1, 0, 1, 1, 1],
          [1, 0, 1, 0, 1, 1, 1, 0, 1],
          [1, 1, 1, 0, 1, 0, 1, 1, 1],
          [1, 0, 0, 1, 1, 1, 0, 1],
        ];
        for (let rw = 0; rw < rows; rw++) {
          const y = (H / rows) * rw + H / (rows * 2);
          const pat = patterns[rw % patterns.length];
          let x = 12;
          const rowOffset = Math.sin(t * 0.02 + rw * 1.1) * 10;
          for (let pi = 0; pi < pat.length; pi++) {
            const alpha = 0.07 + 0.1 * Math.abs(Math.sin(t * 0.04 + pi + rw));
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            if (pat[pi] === 1) {
              const w = pat[pi + 1] === 1 ? dashW : dotR * 2;
              if (w === dotR * 2) {
                ctx.beginPath();
                ctx.arc(x + dotR + rowOffset, y, dotR, 0, Math.PI * 2);
                ctx.fill();
                x += dotR * 2 + gap;
              } else {
                ctx.fillRect(x + rowOffset, y - 1.5, dashW, 3);
                x += dashW + gap;
                pi++;
              }
            } else {
              x += gap * 2;
            }
          }
        }
      }

      tRef.current += 1;
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [type, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

// ─── Footer (inline, matches Footer.tsx) ────────────────────────────────────

function BlogFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [singaporeTime, setSingaporeTime] = useState("");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setEntered(true); observer.disconnect(); }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Singapore",
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false,
      }).formatToParts(now);
      const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
      setSingaporeTime(`${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")}`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const fade = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`;

  return (
    <>
      <style>{`
        .link-hover { position: relative; display: inline-block; width: fit-content; }
        .link-hover::after { content: ""; position: absolute; bottom: -1px; left: 0; width: 0; height: 1px; background-color: #f0ede8; transition: width 0.45s ease-in-out; }
        .link-hover:hover::after { width: 100%; }
      `}</style>
      <section ref={sectionRef} className="w-full bg-[#111] text-[#f0ede8] font-sans">
        <div className="mx-auto max-w-7xl px-[clamp(1.25rem,4vw,4rem)] py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className={`text-xs ${fade("delay-[0ms]")}`}>
              <p className="lg:text-xs text-sm font-bold uppercase tracking-widest mb-4">Pages</p>
              <nav className="flex flex-col gap-2.5">
                {["Portfolio", "Blog"].map((item) => (
                  <a key={item} href="#" className="lg:text-sm text-[#f0ede8]/55 hover:text-[#f0ede8] transition-colors duration-200 link-hover">{item}</a>
                ))}
              </nav>
            </div>
            <div className={`text-xs ${fade("delay-[80ms]")}`}>
              <p className="lg:text-xs text-sm font-bold uppercase tracking-widest mb-4">Social</p>
              <nav className="flex flex-col gap-2.5">
                {["LinkedIn", "Github", "Monkeytype"].map((item) => (
                  <a key={item} href="#" className="lg:text-sm text-[#f0ede8]/55 hover:text-[#f0ede8] transition-colors duration-200 link-hover">{item}</a>
                ))}
              </nav>
            </div>
            <div className={`text-xs ${fade("delay-[160ms]")}`}>
              <p className="lg:text-xs text-sm font-bold uppercase tracking-widest mb-4">Contact</p>
              <nav className="flex flex-col gap-2.5">
                {["yongshyan.an@gmail.com", "+65 9711 2702"].map((item) => (
                  <a key={item} className="lg:text-sm text-[#f0ede8]/55 transition-colors duration-200 break-all">{item}</a>
                ))}
              </nav>
            </div>
            <div className={`text-xs col-span-2 md:col-span-1 ${fade("delay-[240ms]")}`}>
              <p className="lg:text-xs text-sm font-bold uppercase tracking-widest mb-4">Background</p>
              <p className="lg:text-sm text-[#f0ede8]/55 leading-relaxed mb-3">Final-year Software Engineering student at Ngee Ann Polytechnic.</p>
              <p className="lg:text-sm text-[#f0ede8]/55 leading-relaxed mb-6">Based in Singapore.</p>
              <div className={`flex gap-4 ${fade("delay-[320ms]")}`}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-5 h-5 lg:w-7 lg:h-7 flex items-center justify-center text-[#f0ede8]/55 hover:text-[#f0ede8] transition-colors duration-200">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-5 h-5 lg:w-7 lg:h-7 flex items-center justify-center text-[#f0ede8]/55 hover:text-[#f0ede8] transition-colors duration-200">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden w-full">
          <div className={`font-black uppercase leading-none tracking-tight transition-all duration-[1100ms] ease-out delay-300 text-center mb-2 lg:mb-0 ${entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ fontSize: "clamp(40px, 13vw, 180px)" }}>
            YONG SHYAN
          </div>
        </div>
        <div className="border-t border-[#f0ede8]/10 px-[clamp(1.25rem,4vw,4rem)] py-5">
          <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
            <span className="text-[10px] lg:text-xs text-[#f0ede8]/40">Last Updated in April 2026</span>
            <span className="text-[10px] lg:text-xs text-[#f0ede8]/40">Local Time: <span className="font-mono">{singaporeTime || "—"}</span></span>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [hoveredPost, setHoveredPost] = useState<BlogPost | null>(null);
  const [entered, setEntered] = useState(false);
  const [vw, setVw] = useState(1440);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = vw < 640;

  const filtered = activeFilter === "All"
    ? POSTS
    : POSTS.filter((p) => p.category === activeFilter);

  // Active pattern = hovered post, else first visible post
  const patternPost = hoveredPost ?? filtered[0] ?? null;
  const patternColor = patternPost
    ? CAT_COLOR[patternPost.category]
    : "#7E7E78";

  return (
    <>
      <style>{`
        :root {
          --bg:    #2F2F2F;
          --fg:    #D6D6D6;
          --muted: #54544F;
          --dim:   #3A3A3A;
          --rule:  rgba(228,228,223,0.07);
          --ease:  cubic-bezier(0.16, 1, 0.3, 1);
        }
        * { box-sizing: border-box; }
        body { margin: 0; background: var(--bg); }

        .blog-row {
          position: relative;
          border-bottom: 1px solid var(--rule);
          cursor: pointer;
          transition: background 0.22s ease;
        }
        .blog-row:first-child { border-top: 1px solid var(--rule); }
        .blog-row:hover { background: rgba(228,228,223,0.025); }

        .blog-row-accent {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          opacity: 0;
          transition: opacity 0.22s ease;
        }
        .blog-row:hover .blog-row-accent { opacity: 1; }

        .blog-arrow {
          transition: transform 0.22s var(--ease), opacity 0.22s ease;
          opacity: 0.25;
        }
        .blog-row:hover .blog-arrow {
          transform: translateX(4px) translateY(-4px);
          opacity: 1;
        }

        .filter-btn {
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          cursor: pointer;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(228,228,223,0.4);
          text-decoration: none;
          transition: color 0.2s ease;
          border: none;
          background: none;
          cursor: pointer;
          padding: 0;
        }
        .back-btn:hover { color: rgba(228,228,223,0.85); }
        .back-btn-arrow {
          display: inline-block;
          transition: transform 0.22s var(--ease);
        }
        .back-btn:hover .back-btn-arrow { transform: translateX(-4px); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s var(--ease) forwards; opacity: 0; }
      `}</style>

      <div ref={pageRef} style={{ backgroundColor: "var(--bg)", minHeight: "100vh", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

        {/* ── Page Title ── */}
        <div
          className="mx-auto max-w-7xl"
          style={{ padding: "clamp(2.5rem,6vw,5rem) clamp(1.25rem,4vw,4rem) clamp(2rem,4vw,3rem)" }}
        >
          <button className="back-btn mb-8">
            <span className="back-btn-arrow">←</span>
            <span>Portfolio</span>
          </button>
          <div style={{ maxWidth: "640px" }}>
            <p
              className="fade-up"
              style={{ animationDelay: "0.05s", fontSize: "9px", letterSpacing: "0.22em", color: "var(--muted)", textTransform: "uppercase", marginBottom: "16px" }}
            >
              Writing / Notes / Ideas
            </p>
            <h1
              className="fade-up"
              style={{
                animationDelay: "0.12s",
                fontSize: "clamp(36px, 7vw, 80px)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "var(--fg)",
                margin: 0,
              }}
            >
              Blog
            </h1>
            <p
              className="fade-up"
              style={{
                animationDelay: "0.22s",
                fontSize: "clamp(13px, 1.2vw, 15px)",
                lineHeight: 1.7,
                color: "rgba(228,228,223,0.45)",
                marginTop: "16px",
                fontWeight: 300,
                maxWidth: "480px",
              }}
            >
              Thoughts on software, security, and the process of building things. Irregular, honest, unedited.
            </p>
          </div>
        </div>

        {/* ── Main Layout ── */}
        <div
          className="mx-auto max-w-7xl"
          style={{
            padding: "0 clamp(1.25rem,4vw,4rem) clamp(4rem,8vw,8rem)",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "180px 1fr",
            gap: isMobile ? "2rem" : "clamp(2rem,5vw,6rem)",
            alignItems: "start",
          }}
        >
          {/* ── Left: Filters + Pattern ── */}
          <aside
            style={{
              position: isMobile ? "static" : "sticky",
              top: "72px",
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {/* Filter nav */}
            <nav style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "8px", letterSpacing: "0.22em", color: "var(--muted)", textTransform: "uppercase", marginBottom: "12px" }}>
                Filter
              </p>

              {isMobile ? (
                // Horizontal scroll on mobile
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {CATEGORIES.map((cat) => {
                    const active = activeFilter === cat;
                    const color = cat === "All" ? "#D6D6D6" : CAT_COLOR[cat as Exclude<Category, "All">];
                    const count = cat === "All" ? POSTS.length : POSTS.filter((p) => p.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className="filter-btn"
                        style={{
                          padding: "5px 12px",
                          fontSize: "9px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: active ? color : "rgba(228,228,223,0.35)",
                          border: active ? `1px solid ${color}50` : "1px solid rgba(228,228,223,0.1)",
                          background: active ? `${color}12` : "transparent",
                        }}
                      >
                        {cat} ({count})
                      </button>
                    );
                  })}
                </div>
              ) : (
                // Vertical sidebar on desktop
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {CATEGORIES.map((cat) => {
                    const active = activeFilter === cat;
                    const color = cat === "All" ? "#D6D6D6" : CAT_COLOR[cat as Exclude<Category, "All">];
                    const count = cat === "All" ? POSTS.length : POSTS.filter((p) => p.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className="filter-btn"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "7px 0",
                          background: "none",
                          border: "none",
                          textAlign: "left",
                        }}
                      >
                        <span
                          style={{
                            display: "block",
                            height: "1px",
                            width: active ? "20px" : "10px",
                            background: active ? color : "rgba(228,228,223,0.18)",
                            transition: "width 0.25s ease, background 0.25s ease",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: "10px",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: active ? color : "rgba(228,228,223,0.38)",
                            transition: "color 0.25s ease",
                            flex: 1,
                          }}
                        >
                          {cat}
                        </span>
                        <span style={{ fontSize: "9px", color: "rgba(228,228,223,0.18)", fontVariantNumeric: "tabular-nums" }}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </nav>

            {/* Pattern canvas — hidden on mobile */}
            {!isMobile && (
              <div
                style={{
                  width: "100%",
                  height: "180px",
                  border: "1px solid rgba(228,228,223,0.07)",
                  overflow: "hidden",
                  position: "relative",
                  transition: "border-color 0.4s ease",
                  borderColor: patternPost ? `${patternColor}30` : "rgba(228,228,223,0.07)",
                }}
              >
                {/* Pattern label */}
                <div style={{ position: "absolute", top: "8px", left: "10px", zIndex: 2 }}>
                  <span style={{ fontSize: "7px", letterSpacing: "0.2em", color: "rgba(228,228,223,0.2)", textTransform: "uppercase" }}>
                    {patternPost?.patternType ?? "—"}
                  </span>
                </div>

                {patternPost && (
                  <PatternCanvas
                    key={`${patternPost.patternType}-${patternColor}`}
                    type={patternPost.patternType}
                    color={patternColor}
                  />
                )}
              </div>
            )}

            {/* Hovering post excerpt — desktop only */}
            {!isMobile && hoveredPost && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "14px",
                  border: "1px solid rgba(228,228,223,0.07)",
                  animation: "fadeUp 0.3s ease forwards",
                }}
              >
                <p style={{ fontSize: "10px", lineHeight: 1.65, color: "rgba(228,228,223,0.4)", margin: 0, fontWeight: 300 }}>
                  {hoveredPost.excerpt}
                </p>
              </div>
            )}
          </aside>

          {/* ── Right: Posts list ── */}
          <main>
            <div>
              {filtered.length === 0 && (
                <p style={{ fontSize: "13px", color: "rgba(228,228,223,0.3)", padding: "3rem 0" }}>
                  No posts in this category yet.
                </p>
              )}

              {filtered.map((post, i) => {
                const accent = CAT_COLOR[post.category];
                return (
                  <div
                    key={post.id}
                    className="blog-row fade-up"
                    style={{
                      animationDelay: `${0.1 + i * 0.06}s`,
                      padding: isMobile ? "20px 0 20px 14px" : "22px 0 22px 20px",
                      display: "grid",
                      gridTemplateColumns: isMobile
                        ? "1fr auto"
                        : "100px 1fr auto",
                      columnGap: isMobile ? "16px" : "24px",
                      alignItems: "center",
                    }}
                    onMouseEnter={() => setHoveredPost(post)}
                    onMouseLeave={() => setHoveredPost(null)}
                  >
                    {/* Accent bar */}
                    <div className="blog-row-accent" style={{ background: accent }} />

                    {/* Date — hidden on mobile, shown as inline on mobile below */}
                    {!isMobile && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <time
                          dateTime={post.dateISO}
                          style={{ fontSize: "9px", letterSpacing: "0.12em", color: "rgba(228,228,223,0.3)", textTransform: "uppercase", fontVariantNumeric: "tabular-nums" }}
                        >
                          {post.date}
                        </time>
                        <span style={{ fontSize: "9px", letterSpacing: "0.1em", color: "rgba(228,228,223,0.2)", textTransform: "uppercase" }}>
                          {post.readTime}
                        </span>
                      </div>
                    )}

                    {/* Title + meta */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: 0 }}>
                      {isMobile && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                          <time dateTime={post.dateISO} style={{ fontSize: "8px", letterSpacing: "0.12em", color: "rgba(228,228,223,0.25)", textTransform: "uppercase", fontVariantNumeric: "tabular-nums" }}>
                            {post.date}
                          </time>
                          <span style={{ fontSize: "8px", letterSpacing: "0.12em", color: "rgba(228,228,223,0.18)", textTransform: "uppercase" }}>
                            {post.readTime}
                          </span>
                        </div>
                      )}

                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontSize: "8px",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: accent,
                            border: `1px solid ${accent}30`,
                            background: `${accent}10`,
                            padding: "2px 8px",
                            flexShrink: 0,
                          }}
                        >
                          {post.category}
                        </span>
                      </div>

                      <h2
                        style={{
                          fontSize: isMobile ? "clamp(14px,4vw,16px)" : "clamp(15px,1.4vw,18px)",
                          fontWeight: 400,
                          lineHeight: 1.3,
                          letterSpacing: "-0.01em",
                          color: "var(--fg)",
                          margin: 0,
                          transition: "color 0.2s ease",
                        }}
                      >
                        {post.title}
                      </h2>
                    </div>

                    {/* Arrow CTA */}
                    <div style={{ paddingRight: isMobile ? "4px" : "8px", flexShrink: 0 }}>
                      <span
                        className="blog-arrow"
                        style={{ fontSize: isMobile ? "18px" : "20px", color: "var(--fg)", display: "block", lineHeight: 1 }}
                      >
                        ↗
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Post count bottom */}
            <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ height: "1px", flex: 1, background: "rgba(228,228,223,0.06)" }} />
              <span style={{ fontSize: "8px", letterSpacing: "0.22em", color: "rgba(228,228,223,0.18)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                {filtered.length} of {POSTS.length} posts
              </span>
              <div style={{ height: "1px", flex: 1, background: "rgba(228,228,223,0.06)" }} />
            </div>
          </main>
        </div>

        {/* ── Footer ── */}
        <BlogFooter />
      </div>
    </>
  );
}
