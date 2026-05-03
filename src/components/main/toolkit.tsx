"use client";
import { useEffect, useRef, useState } from "react";

const stackLang: string[] = [
  "Python",
  "C#",
  "C++",
  "Nvim",
  "Arch Linux",
  "Node.js",
  "Next.js",
  "TailwindCSS",
];

export default function Toolkit() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-[#2F2F2F]">
      <div className="mx-auto max-w-7xl px-[clamp(1.5rem,5vw,64px)] py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left */}
          <div className="lg:w-[55%]">
            <h2
              className="text-[#D6D6D6] font-semibold mb-6"
              style={{
                fontFamily: "'Euclid Circular A', 'DM Sans', sans-serif",
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                lineHeight: 1.1,
              }}
            >
              Digital Toolkit.
            </h2>
            <p
              className="leading-relaxed text-[#9E9E9E] font-semibold"
              style={{
                fontFamily: "'Euclid Circular A', 'DM Sans', sans-serif",
                fontSize: "clamp(0.95rem, 1.3vw, 1.25rem)",
              }}
            >
              My digital toolkit includes a diverse range of programming languages,
              markup languages, frameworks and tools. I am proficient in and have
              experience with the following technologies.
            </p>
          </div>

          {/* Right */}
          <div ref={ref} className="lg:w-1/2">
            <ul
              className="text-[#D6D6D6] leading-tight"
              style={{
                fontFamily: "ClashDisplay-Bold",
                fontSize: "clamp(1.5rem, 5vw, 4rem)",
              }}
            >
              {stackLang.map((lang, index) => (
                <li
                  key={index}
                  className={`transform transition-all duration-500 ease-out ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {lang}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
