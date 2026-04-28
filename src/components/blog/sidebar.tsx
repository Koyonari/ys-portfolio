"use client";

import { type Category, type BlogPost, CATEGORIES, CAT_COLOR } from "@/types/blog";
import { POSTS } from "@/data/posts";
import PatternCanvas from "@/components/blog/patterncanvas";

interface BlogSidebarProps {
  activeFilter: Category;
  onFilterChange: (cat: Category) => void;
  hoveredPost: BlogPost | null;
  isMobile: boolean;
}

export default function BlogSidebar({
  activeFilter,
  onFilterChange,
  hoveredPost,
  isMobile,
}: BlogSidebarProps) {
  const patternPost = hoveredPost ?? null;
  const patternColor = patternPost ? CAT_COLOR[patternPost.category] : "#7E7E78";

  return (
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
        <p
          style={{
            fontSize: "8px",
            letterSpacing: "0.22em",
            color: "var(--muted)",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Filter
        </p>

        {isMobile ? (
          // Horizontal chips on mobile
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => {
              const active = activeFilter === cat;
              const color =
                cat === "All" ? "#D6D6D6" : CAT_COLOR[cat as Exclude<Category, "All">];
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
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {CATEGORIES.map((cat) => {
              const active = activeFilter === cat;
              const color =
                cat === "All" ? "#D6D6D6" : CAT_COLOR[cat as Exclude<Category, "All">];
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
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "7px 0",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
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
                  <span
                    style={{
                      fontSize: "9px",
                      color: "rgba(228,228,223,0.18)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* Pattern canvas — desktop only */}
      {!isMobile && (
        <div
          style={{
            width: "100%",
            height: "180px",
            border: `1px solid ${patternPost ? `${patternColor}30` : "rgba(228,228,223,0.07)"}`,
            overflow: "hidden",
            position: "relative",
            transition: "border-color 0.4s ease",
          }}
        >
          {/* Pattern type label */}
          <div style={{ position: "absolute", top: "8px", left: "10px", zIndex: 2 }}>
            <span
              style={{
                fontSize: "7px",
                letterSpacing: "0.2em",
                color: "rgba(228,228,223,0.2)",
                textTransform: "uppercase",
              }}
            >
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

      {/* Hovered post excerpt — desktop only */}
      {!isMobile && hoveredPost && (
        <div
          style={{
            marginTop: "16px",
            padding: "14px",
            border: "1px solid rgba(228,228,223,0.07)",
            animation: "fadeUp 0.3s ease forwards",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              lineHeight: 1.65,
              color: "rgba(228,228,223,0.4)",
              margin: 0,
              fontWeight: 300,
            }}
          >
            {hoveredPost.excerpt}
          </p>
        </div>
      )}
    </aside>
  );
}
