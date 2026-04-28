"use client";

import { type BlogPost, CAT_COLOR } from "@/types/blog";

interface ListProps {
  filtered: BlogPost[];
  totalCount: number;
  isMobile: boolean;
  onHover: (post: BlogPost | null) => void;
  selectedPost: BlogPost | null;
  onOpen: (post: BlogPost) => void;   // ← NEW
}

export default function List({
  filtered,
  totalCount,
  isMobile,
  onHover,
  selectedPost,
  onOpen,
}: ListProps) {
  return (
    <main>
      <div>
        {filtered.length === 0 && (
          <p className="py-12 text-xs text-[rgba(228,228,223,0.3)]">
            No posts in this category yet.
          </p>
        )}

        {filtered.map((post, i) => {
          const accent = CAT_COLOR[post.category];
          const isSelected = selectedPost?.id === post.id;
          return (
            <div
              key={post.id}
              className={`blog-row fade-up border-b border-[var(--rule)] cursor-pointer transition-colors duration-[220ms] ${
                isSelected
                  ? "bg-[rgba(228,228,223,0.04)]"
                  : "hover:bg-[rgba(228,228,223,0.025)]"
              }`}
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
              onClick={() => onOpen(post)}          // ← NEW
            >
              {/* Left accent bar */}
              <div
                className={`blog-row-accent absolute left-0 top-0 bottom-0 w-0.5 transition-opacity duration-[220ms] ${
                  isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                style={{ background: accent }}
              />

              {/* Date column */}
              {!isMobile && (
                <div className="flex flex-col gap-1">
                  <time
                    dateTime={post.dateISO}
                    className="text-[9px] uppercase tracking-[0.12em] text-[rgba(228,228,223,0.3)] font-variant-numeric"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {post.date}
                  </time>
                  <span className="text-[9px] uppercase tracking-[0.1em] text-[rgba(228,228,223,0.2)]">
                    {post.readTime}
                  </span>
                </div>
              )}

              {/* Title + meta */}
              <div className="flex flex-col gap-1.5 min-w-0">
                {isMobile && (
                  <div className="flex items-center gap-2 mb-0.5">
                    <time
                      dateTime={post.dateISO}
                      className="text-[8px] uppercase tracking-[0.12em] text-[rgba(228,228,223,0.25)]"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {post.date}
                    </time>
                    <span className="text-[8px] uppercase tracking-[0.12em] text-[rgba(228,228,223,0.18)]">
                      {post.readTime}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2.5 flex-wrap">
                  <span
                    className="inline-block text-[8px] uppercase tracking-[0.18em] flex-shrink-0"
                    style={{
                      color: accent,
                      border: `1px solid ${accent}30`,
                      background: `${accent}10`,
                      padding: "2px 8px",
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                <h2
                  className={`${
                    isMobile
                      ? "text-[clamp(14px,4vw,16px)]"
                      : "text-[clamp(15px,1.4vw,18px)]"
                  } font-normal leading-[1.3] tracking-[-0.01em] text-[var(--fg)] m-0 transition-colors duration-200`}
                >
                  {post.title}
                </h2>
              </div>

              {/* Arrow CTA */}
              <div className={isMobile ? "pr-1" : "pr-2"}>
                <span
                  className="blog-arrow inline-block leading-none transition-all duration-[220ms]"
                  style={{
                    fontSize: isMobile ? "18px" : "20px",
                    color: "var(--fg)",
                  }}
                >
                  ↗
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Post count footer */}
      <div className="mt-12 flex items-center gap-4">
        <div className="h-px flex-1 bg-[rgba(228,228,223,0.06)]" />
        <span className="text-[8px] uppercase tracking-[0.22em] text-[rgba(228,228,223,0.18)] whitespace-nowrap">
          {filtered.length} of {totalCount} posts
        </span>
        <div className="h-px flex-1 bg-[rgba(228,228,223,0.06)]" />
      </div>
    </main>
  );
}
