"use client";

import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fade = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${
      entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
    }`;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#111] text-[#f0ede8] font-sans"
    >
      {/* ── Upper grid ── */}
      <div className="mx-auto max-w-6xl px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[auto_auto_auto_1fr] gap-10 md:gap-16">

          {/* PAGES */}
          <div className={fade("delay-[0ms]")}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4">
              Pages
            </p>
            <nav className="flex flex-col gap-2.5">
              {["Portfolio", "Blog"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-[#f0ede8]/55 hover:text-[#f0ede8] transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* SOCIAL */}
          <div className={fade("delay-[80ms]")}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4">
              Social
            </p>
            <nav className="flex flex-col gap-2.5">
              {["LinkedIn", "Github", "Monkeytype"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-[#f0ede8]/55 hover:text-[#f0ede8] transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div className={fade("delay-[160ms]")}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4">
              Contact
            </p>
            <nav className="flex flex-col gap-2.5">
              {["yongshyan.an@gmail.com", "+65 9711 2702"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-[#f0ede8]/55 hover:text-[#f0ede8] transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* BACKGROUND */}
          <div className={`md:justify-self-end md:max-w-xs ${fade("delay-[240ms]")}`}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4">
              Background
            </p>
            <p className="text-sm text-[#f0ede8]/55 leading-relaxed mb-3">
              BALLS BALLS BALLS
            </p>
            <p className="text-sm text-[#f0ede8]/55 leading-relaxed mb-6">
              BALLS BALLS
            </p>

            {/* Social icons */}
            <div className={`flex gap-3 ${fade("delay-[320ms]")}`}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[#f0ede8]/40 flex items-center justify-center text-[#f0ede8]/55 hover:border-[#f0ede8] hover:text-[#f0ede8] transition-colors duration-200"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full border border-[#f0ede8]/40 flex items-center justify-center text-[#f0ede8]/55 hover:border-[#f0ede8] hover:text-[#f0ede8] transition-colors duration-200"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Wordmark ── */}
      <div className="overflow-hidden px-1 mx-auto">
        <div
          className={`font-black uppercase leading-none tracking-tight transition-all duration-[1100ms] ease-out delay-300 text-center ${
            entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ fontSize: "clamp(72px, 13vw, 180px)" }}
        >
          YONG SHYAN
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#f0ede8]/10 px-8 md:px-16 py-5">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-[#f0ede8]/40">
            ©2026 Yong Shyan All Rights Reserved.
          </span>
          <nav className="flex flex-wrap gap-6">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-[#f0ede8]/40 hover:text-[#f0ede8]/70 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
