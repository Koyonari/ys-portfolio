"use client";

import { type BlogPost, type Category, CAT_COLOR } from "@/types/blog";
import { POSTS } from "@/data/posts";

interface BlogListProps {
  filtered: BlogPost[];
  totalCount: number;
  isMobile: boolean;
  onHover: (post: BlogPost | null) => void;
}

export default function List({
  filtered,
  totalCount,
  isMobile,
  onHover,
}: BlogListProps) {
  return (
    <main>
      <div>
        {filtered.length === 0 && (
          <p
            style={{
              fontSize: "13px",
              color: "rgba(228,228,223,0.3)",
              padding: "3rem 0",
            }}
          >
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
                gridTemplateColumns: isMobile ? "1fr auto" : "100px 1fr auto",
                columnGap: isMobile ? "16px" : "24px",
                alignItems: "center",
              }}
              onMouseEnter={() => onHover(post)}
              onMouseLeave={() => onHover(null)}
            >
              {/* Left accent bar */}
              <div
                className="blog-row-accent"
                style={{ background: accent }}
              />

              {/* Date column — desktop only */}
              {!isMobile && (
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <time
                    dateTime={post.dateISO}
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      color: "rgba(228,228,223,0.3)",
                      textTransform: "uppercase",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {post.date}
                  </time>
                  <span
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      color: "rgba(228,228,223,0.2)",
                      textTransform: "uppercase",
                    }}
                  >
                    {post.readTime}
                  </span>
                </div>
              )}

              {/* Title + meta */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: 0 }}
              >
                {/* Date row for mobile */}
                {isMobile && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "2px",
                    }}
                  >
                    <time
                      dateTime={post.dateISO}
                      style={{
                        fontSize: "8px",
                        letterSpacing: "0.12em",
                        color: "rgba(228,228,223,0.25)",
                        textTransform: "uppercase",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {post.date}
                    </time>
                    <span
                      style={{
                        fontSize: "8px",
                        letterSpacing: "0.12em",
                        color: "rgba(228,228,223,0.18)",
                        textTransform: "uppercase",
                      }}
                    >
                      {post.readTime}
                    </span>
                  </div>
                )}

                {/* Category pill */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
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

                {/* Title */}
                <h2
                  style={{
                    fontSize: isMobile
                      ? "clamp(14px,4vw,16px)"
                      : "clamp(15px,1.4vw,18px)",
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
              <div
                style={{ paddingRight: isMobile ? "4px" : "8px", flexShrink: 0 }}
              >
                <span
                  className="blog-arrow"
                  style={{
                    fontSize: isMobile ? "18px" : "20px",
                    color: "var(--fg)",
                    display: "block",
                    lineHeight: 1,
                  }}
                >
                  ↗
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Post count footer rule */}
      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{ height: "1px", flex: 1, background: "rgba(228,228,223,0.06)" }}
        />
        <span
          style={{
            fontSize: "8px",
            letterSpacing: "0.22em",
            color: "rgba(228,228,223,0.18)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {filtered.length} of {totalCount} posts
        </span>
        <div
          style={{ height: "1px", flex: 1, background: "rgba(228,228,223,0.06)" }}
        />
      </div>
    </main>
  );
}
