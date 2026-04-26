"use client";

import { useEffect, useRef, useState } from "react";

export default function Footer() {
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
        .link-hover {
          position: relative;
          display: inline-block;
          width: fit-content;
        }
        .link-hover::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #f0ede8;
          transition: width 0.45s ease-in-out;
        }
        .link-hover:hover::after { width: 100%; }
      `}</style>

      <section ref={sectionRef} className="w-full bg-[#111] text-[#f0ede8] font-sans">
        <div className="mx-auto max-w-7xl px-[clamp(1.25rem,4vw,4rem)] py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">

            {/* Pages */}
            <div className={`text-xs ${fade("delay-[0ms]")}`}>
              <p className="lg:text-xs text-sm font-bold uppercase tracking-widest mb-4">Pages</p>
              <nav className="flex flex-col gap-2.5">
                {["Portfolio", "Blog"].map((item) => (
                  <a key={item} href="#" className="lg:text-sm text-[#f0ede8]/55 hover:text-[#f0ede8] transition-colors duration-200 link-hover">{item}</a>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div className={`text-xs ${fade("delay-[80ms]")}`}>
              <p className="lg:text-xs text-sm font-bold uppercase tracking-widest mb-4">Social</p>
              <nav className="flex flex-col gap-2.5">
                {["LinkedIn", "Github", "Monkeytype"].map((item) => (
                  <a key={item} href="#" className="lg:text-sm text-[#f0ede8]/55 hover:text-[#f0ede8] transition-colors duration-200 link-hover">{item}</a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className={`text-xs ${fade("delay-[160ms]")}`}>
              <p className="lg:text-xs text-sm font-bold uppercase tracking-widest mb-4">Contact</p>
              <nav className="flex flex-col gap-2.5">
                {["yongshyan.an@gmail.com", "+65 9711 2702"].map((item) => (
                  <a key={item} className="lg:text-sm text-[#f0ede8]/55 transition-colors duration-200 break-all">{item}</a>
                ))}
              </nav>
            </div>

            {/* Background */}
            <div className={`text-xs col-span-2 md:col-span-1 ${fade("delay-[240ms]")}`}>
              <p className="lg:text-xs text-sm font-bold uppercase tracking-widest mb-4">Background</p>
              <p className="lg:text-sm text-[#f0ede8]/55 leading-relaxed mb-3">BALLS BALLS BALLS</p>
              <p className="lg:text-sm text-[#f0ede8]/55 leading-relaxed mb-6">BALLS BALLS</p>

              <div className={`flex gap-4 ${fade("delay-[320ms]")}`}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-5 h-5 lg:w-7 lg:h-7 flex items-center justify-center text-[#f0ede8]/55 hover:text-[#f0ede8] transition-colors duration-200">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <title>LinkedIn</title>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-5 h-5 lg:w-7 lg:h-7 flex items-center justify-center text-[#f0ede8]/55 hover:text-[#f0ede8] transition-colors duration-200">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
                <a href="https://monkeytype.com" target="_blank" rel="noopener noreferrer" aria-label="Monkeytype" className="w-5 h-5 lg:w-7 lg:h-7 flex items-center justify-center text-[#f0ede8]/55 hover:text-[#f0ede8] transition-colors duration-200">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <title>Monkeytype</title>
                    <path d="M20 14.4a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6ZM8.8 14.4h4.8a.8.8 0 1 1 0 1.6H8.8a.8.8 0 1 1 0-1.6ZM7.2 9.6a.8.8 0 0 1 .8.8V12a.8.8 0 1 1-1.6 0v-1.6a.8.8 0 0 1 .8-.8Z M3.201 10.359A2.4 2.4 0 0 1 7.2 8.612a2.4 2.4 0 0 1 4 1.788V12a.8.8 0 1 1-1.6 0v-1.6a.8.8 0 1 0-1.6 0V12a.8.8 0 1 1-1.6 0v-1.6a.8.8 0 1 0-1.6 0V12a.8.8 0 1 1-1.6 0v-1.6l.001-.041ZM17.6 12.8v2.4a.8.8 0 1 1-1.6 0v-2.4h-2.306c-.493 0-.894-.358-.894-.8 0-.442.401-.8.894-.8h6.212c.493 0 .894.358.894.8 0 .442-.401.8-.894.8H17.6ZM16.8 8H20a.8.8 0 1 1 0 1.6h-3.2a.8.8 0 1 1 0-1.6ZM4 14.4h1.6a.8.8 0 1 1 0 1.6H4a.8.8 0 1 1 0-1.6ZM13.2 8h.4a.8.8 0 1 1 0 1.6h-.4a.8.8 0 1 1 0-1.6Z M1.6 14.4H0V8.8c0-2.208 1.792-4 4-4h16c2.208 0 4 1.792 4 4v6.4c0 2.208-1.792 4-4 4H4c-2.208 0-4-1.792-4-4v-1.6h1.6v1.6A2.4 2.4 0 0 0 4 17.6h16a2.4 2.4 0 0 0 2.4-2.4V8.8A2.4 2.4 0 0 0 20 6.4H4a2.4 2.4 0 0 0-2.4 2.4v5.6Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="overflow-hidden w-full">
          <div
            className={`font-black uppercase leading-none tracking-tight transition-all duration-[1100ms] ease-out delay-300 text-center mb-2 lg:mb-0 ${entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            style={{ fontSize: "clamp(40px, 13vw, 180px)" }}
          >
            YONG SHYAN
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#f0ede8]/10 px-[clamp(1.25rem,4vw,4rem)] py-5">
          <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
            <span className="text-[10px] lg:text-xs text-[#f0ede8]/40">Last Updated in April 2026</span>
            <span className="text-[10px] lg:text-xs text-[#f0ede8]/40">
              Local Time: <span className="font-mono">{singaporeTime || "—"}</span>
            </span>
          </div>
        </div>

      </section>
    </>
  );
}
