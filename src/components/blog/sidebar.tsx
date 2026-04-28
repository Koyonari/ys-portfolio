"use client";

import {
  type Category,
  type BlogPost,
  CATEGORIES,
  CAT_COLOR,
} from "@/types/blog";
import { POSTS } from "@/data/posts";
import Pattern from "@/components/blog/patterncanvas";

interface SidebarProps {
  activeFilter: Category;
  onFilterChange: (cat: Category) => void;
  hoveredPost: BlogPost | null;
  isMobile: boolean;
}

export default function Sidebar({
  activeFilter,
  onFilterChange,
  hoveredPost,
  isMobile,
}: SidebarProps) {
  const patternPost = hoveredPost ?? null;
  const patternColor = patternPost
    ? CAT_COLOR[patternPost.category]
    : "#7E7E78";

  return (
    <aside
      className={`flex flex-col gap-0 ${isMobile ? "static" : "sticky"}`}
      style={{ top: isMobile ? "auto" : "72px" }}
    >
      {/* Filter nav */}
      <nav className="mb-8">
        <p className="mb-3 text-[8px] uppercase tracking-[0.22em] text-[var(--muted)]">
          Filter
        </p>

        {isMobile ? (
          // Horizontal chips on mobile
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = activeFilter === cat;
              const color =
                cat === "All"
                  ? "#D6D6D6"
                  : CAT_COLOR[cat as Exclude<Category, "All">];
              const count =
                cat === "All"
                  ? POSTS.length
                  : POSTS.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => onFilterChange(cat)}
                  className="filter-btn"
                  style={{
                    padding: "5px 12px",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: active ? color : "rgba(228,228,223,0.35)",
                    border: active
                      ? `1px solid ${color}50`
                      : "1px solid rgba(228,228,223,0.1)",
                    background: active ? `${color}12` : "transparent",
                    cursor: "pointer",
                  }}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        ) : (
          // Vertical sidebar on desktop
          <div className="flex flex-col gap-0.5">
            {CATEGORIES.map((cat) => {
              const active = activeFilter === cat;
              const color =
                cat === "All"
                  ? "#D6D6D6"
                  : CAT_COLOR[cat as Exclude<Category, "All">];
              const count =
                cat === "All"
                  ? POSTS.length
                  : POSTS.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => onFilterChange(cat)}
                  className="filter-btn flex items-center gap-2.5 bg-none border-none text-left px-0 py-1.5 cursor-pointer"
                >
                  <span
                    className="block h-px shrink-0 transition-all duration-250"
                    style={{
                      width: active ? "20px" : "10px",
                      background: active ? color : "rgba(228,228,223,0.18)",
                    }}
                  />
                  <span
                    className="flex-1 text-[10px] uppercase tracking-[0.14em] transition-colors duration-250"
                    style={{
                      color: active ? color : "rgba(228,228,223,0.38)",
                    }}
                  >
                    {cat}
                  </span>
                  <span
                    className="text-[9px] text-[rgba(228,228,223,0.18)]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* Pattern canvas */}
      {!isMobile && (
        <div
          className="relative w-full h-[180px] border overflow-hidden transition-colors duration-400"
          style={{
            border: `1px solid ${patternPost ? `${patternColor}30` : "rgba(228,228,223,0.07)"}`,
          }}
        >
          {/* Pattern type label */}
          <div className="absolute top-2 left-2.5 z-10">
            <span className="text-[7px] uppercase tracking-[0.2em] text-[rgba(228,228,223,0.2)]">
              {patternPost?.patternType ?? "—"}
            </span>
          </div>

          {patternPost && (
            <Pattern
              key={`${patternPost.patternType}-${patternColor}`}
              type={patternPost.patternType}
              color={patternColor}
            />
          )}
        </div>
      )}

      {/* Hovered post */}
      {!isMobile && hoveredPost && (
        <div className="mt-4 p-3.5 border border-[rgba(228,228,223,0.07)] animate-fadeUp">
          <p className="m-0 text-[10px] font-light leading-[1.65] text-[rgba(228,228,223,0.4)]">
            {hoveredPost.excerpt}
          </p>
        </div>
      )}
    </aside>
  );
}
