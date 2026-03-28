"use client";
import { useEffect, useRef, useState } from "react";

const stackLang: string[] = [
  "Python",
  "C#",
  "C++",
  "Node.js",
  "React.js",
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
    <section className="max-w-7xl px-[64px] mt-4">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left */}
        <div className="lg:w-[55%]">
          <h2 className="font-general-sans text-5xl md:text-6xl lg:text-8xl text-[#D6D6D6] font-semibold mb-6">
            Digital Toolkit.
          </h2>
          <p className="text-base md:text-xl lg:text-xl leading-relaxed text-[#9E9E9E] font-semibold"
  style={{ fontFamily: "'Euclid Circular A', 'DM Sans', sans-serif" }}>
            My digital toolkit includes a diverse range of programming languages,
            markup languages and frameworks. I am proficient in and have
            experience with the following technologies.
          </p>
        </div>

        {/* Right */}
        <div ref={ref} className="lg:w-1/2">
          <ul
            className="text-2xl md:text-4xl lg:text-6xl leading-tighter text-[#D6D6D6]"
            style={{ fontFamily: "ClashDisplay-Bold" }}
          >
            {stackLang.map((lang, index) => (
              <li
                key={index}
                className={`transform transition-all duration-500 ease-out
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {lang}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
