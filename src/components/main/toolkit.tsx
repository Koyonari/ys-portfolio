"use client";

import { useEffect, useRef, useState } from "react";

const stackLang: string[] = [
  "Python",
  "C#",
  "C++",
  "Java",
  "HTML",
  "CSS",
  "JavaScript",
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
    <section className="w-full px-[64px] mb-24 mt-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left */}
        <div className="lg:w-1/2">
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-semibold mb-6">
            Digital Toolkit.
          </h2>
          <p className="text-base md:text-2xl lg:text-3xl leading-relaxed">
            My digital toolkit includes a diverse range of programming
            languages, markup languages and frameworks. I am proficient in and
            have experience with the following technologies.
          </p>
        </div>

        {/* Right */}
        <div ref={ref} className="lg:w-1/2">
          <ul className="text-2xl md:text-4xl lg:text-6xl opacity-80 leading-tight space-y-2">
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
