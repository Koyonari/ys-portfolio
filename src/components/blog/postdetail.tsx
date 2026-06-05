"use client";

import { useEffect, useRef } from "react";
import { type BlogPost, type ContentBlock, CAT_COLOR } from "@/types/blog";
import Header from "@/components/blog/header";
import Pattern from "@/components/blog/patterncanvas";
import Footer from "@/components/main/footer";

function renderBlocks(blocks: ContentBlock[]) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "p":
        return <p key={i}>{block.text}</p>;
      case "spacer":
        return <div key={i} className="post-spacer" />;
      case "h2":
        return <h2 key={i}>{block.text}</h2>;
      case "h3":
        return <h3 key={i}>{block.text}</h3>;
      case "img":
        return (
          <figure key={i}>
            <img src={block.src} alt={block.alt ?? ""} loading="lazy" />
            {block.caption && <figcaption>{block.caption}</figcaption>}
          </figure>
        );
      case "hr":
        return <hr key={i} />;
      case "quote":
        return <blockquote key={i}><p>{block.text}</p></blockquote>;
    }
  });
}

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export default function PostDetail({ post, onBack }: PostDetailProps) {
  const accent = CAT_COLOR[post.category];
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <style>{`
        :root {
          --bg:    #2F2F2F;
          --fg:    #D6D6D6;
          --muted: #54544F;
          --rule:  rgba(228,228,223,0.07);
          --ease:  cubic-bezier(0.16, 1, 0.3, 1);
        }
        * { box-sizing: border-box; }
        body { margin: 0; background: var(--bg); }

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

        .post-body {
          font-size: clamp(14px, 1.2vw, 16px);
          font-weight: 300;
          line-height: 1.85;
          color: rgba(228,228,223,0.65);
        }
        .post-body h2 {
          font-size: clamp(16px, 1.6vw, 20px);
          font-weight: 400;
          letter-spacing: -0.01em;
          color: var(--fg);
          margin: 2.5rem 0 0.75rem;
        }
        .post-body h3 {
          font-size: clamp(13px, 1.2vw, 15px);
          font-weight: 400;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(228,228,223,0.5);
          margin: 2rem 0 0.5rem;
        }
        .post-body p { margin: 0; }
        .post-spacer { height: 1.4rem; }
        .post-body figure { margin: 2rem 0; }
        .post-body figure img { width: 100%; display: block; border: 1px solid var(--rule); }
        .post-body figcaption {
          margin-top: 0.5rem;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-align: center;
          color: rgba(228,228,223,0.3);
        }
        .post-body a {
          color: var(--fg);
          text-decoration: underline;
          text-decoration-color: rgba(228,228,223,0.2);
          text-underline-offset: 3px;
          transition: text-decoration-color 0.2s ease;
        }
        .post-body a:hover { text-decoration-color: rgba(228,228,223,0.6); }
        .post-body blockquote {
          margin: 1.75rem 0;
          padding: 0 0 0 1.25rem;
          border-left: 2px solid rgba(228,228,223,0.12);
          color: rgba(228,228,223,0.4);
          font-style: normal;
        }
        .post-body pre {
          margin: 1.5rem 0;
          padding: 1.25rem 1.5rem;
          background: rgba(228,228,223,0.04);
          border: 1px solid var(--rule);
          overflow-x: auto;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          line-height: 1.7;
          color: rgba(228,228,223,0.5);
        }
        .post-body code {
          font-family: 'Courier New', monospace;
          font-size: 0.88em;
          color: rgba(228,228,223,0.55);
          background: rgba(228,228,223,0.06);
          padding: 1px 5px;
        }
        .post-body pre code { background: none; padding: 0; }
        .post-body ul, .post-body ol {
          margin: 0 0 1.4rem;
          padding-left: 1.25rem;
        }
        .post-body li { margin-bottom: 0.4rem; }
        .post-body hr {
          border: none;
          border-top: 1px solid var(--rule);
          margin: 2.5rem 0;
        }

        .progress-bar {
          position: fixed;
          top: 0; left: 0;
          height: 1px;
          background: var(--accent-color);
          transition: width 0.1s linear;
          z-index: 100;
        }

        /* Layout */
        .post-layout {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: clamp(2rem, 5vw, 6rem);
          align-items: start;
          padding: 0 clamp(1.25rem, 4vw, 4rem) clamp(4rem, 8vw, 8rem);
        }

        .post-aside {
          position: sticky;
          top: 72px;
        }

        /* Mobile meta strip */
        .post-meta-strip {
          display: none;
        }

        /* Pattern preview: hidden on mobile by default, shown in sidebar on desktop */
        .pattern-preview-sidebar {
          display: block;
        }

        .post-back-top {
          display:none;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .post-layout {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .post-aside {
            position: static;
            display: none; /* hide full sidebar; meta shown via strip instead */
          }

          .post-meta-strip {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: clamp(1.25rem, 3vw, 2rem);
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--rule);
          }

          .post-back-top {
            display: flex;
            margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
          }
        }

        /* Mobile */
        @media (max-width: 560px) {
          .post-layout {
            padding-left: 1.1rem;
            padding-right: 1.1rem;
            padding-bottom: 4rem;
          }

          .post-body {
            font-size: 15px;
          }

          .post-body pre {
            padding: 1rem;
            font-size: 11px;
          }
        }
      `}</style>

      <div
        style={{
          backgroundColor: "var(--bg)",
          minHeight: "100vh",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        <Header onBack={onBack} />

        <div className="mx-auto max-w-7xl post-layout">

          {/* Sidebar */}
          <aside className="fade-up post-aside flex flex-col gap-6" style={{ animationDelay: "0.1s" }}>
            <button className="back-btn" onClick={onBack}>
              <span className="back-btn-arrow">←</span>
              <span>All posts</span>
            </button>

            <div className="flex flex-col gap-3">
              <span
                className="inline-block text-[8px] uppercase tracking-[0.18em] self-start"
                style={{
                  color: accent,
                  border: `1px solid ${accent}30`,
                  background: `${accent}10`,
                  padding: "2px 8px",
                }}
              >
                {post.category}
              </span>

              <div className="flex flex-col gap-1.5">
                <time
                  dateTime={post.dateISO}
                  className="text-[9px] uppercase tracking-[0.12em] text-[rgba(228,228,223,0.3)]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {post.date}
                </time>
                <span className="text-[9px] uppercase tracking-[0.1em] text-[rgba(228,228,223,0.2)]">
                  {post.readTime}
                </span>
              </div>
            </div>

            <div style={{ height: "1px", background: "var(--rule)" }} />

            <div
              className="relative w-full overflow-hidden"
              style={{ height: "120px", border: `1px solid ${accent}20` }}
            >
              <div className="absolute top-2 left-2.5 z-10">
                <span className="text-[7px] uppercase tracking-[0.2em] text-[rgba(228,228,223,0.2)]">
                  {post.patternType}
                </span>
              </div>
              <Pattern type={post.patternType} color={accent} />
            </div>

            <p className="m-0 text-[10px] font-light leading-[1.65] text-[rgba(228,228,223,0.35)]">
              {post.excerpt}
            </p>
          </aside>

          {/* Main content */}
          <main ref={contentRef}>

            {/* Back button */}
            <div className="post-back-top fade-up" style={{ animationDelay: "0.05s" }}>
              <button className="back-btn" onClick={onBack}>
                <span className="back-btn-arrow">←</span>
                <span>All posts</span>
              </button>
            </div>

            {/* Meta strip */}
            <div className="post-meta-strip fade-up" style={{ animationDelay: "0.08s" }}>
              <span
                className="inline-block text-[8px] uppercase tracking-[0.18em]"
                style={{
                  color: accent,
                  border: `1px solid ${accent}30`,
                  background: `${accent}10`,
                  padding: "2px 8px",
                }}
              >
                {post.category}
              </span>
              <time
                dateTime={post.dateISO}
                className="text-[9px] uppercase tracking-[0.12em] text-[rgba(228,228,223,0.3)]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {post.date}
              </time>
              <span className="text-[9px] uppercase tracking-[0.1em] text-[rgba(228,228,223,0.2)]">
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1
              className="fade-up m-0 font-normal leading-[1.1] tracking-[-0.02em] text-[var(--fg)]"
              style={{
                fontSize: "clamp(24px, 4vw, 52px)",
                animationDelay: "0.08s",
                borderLeft: `2px solid ${accent}`,
                paddingLeft: "clamp(0.75rem, 2vw, 1.75rem)",
                marginBottom: "clamp(1.5rem, 4vw, 3.5rem)",
              }}
            >
              {post.title}
            </h1>

            {/* Rule */}
            <div
              className="fade-up"
              style={{
                height: "1px",
                background: "var(--rule)",
                marginBottom: "clamp(1.5rem, 4vw, 3.5rem)",
                animationDelay: "0.18s",
              }}
            />

            {/* Body */}
            <div
              className="post-body fade-up"
              style={{ animationDelay: "0.26s" }}
            >
              {post.content ? renderBlocks(post.content) : <p>{post.excerpt}</p>}
            </div>

            {/* Footer */}
            <div
              className="fade-up"
              style={{
                marginTop: "clamp(2rem, 6vw, 5rem)",
                paddingTop: "2rem",
                borderTop: "1px solid var(--rule)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                animationDelay: "0.34s",
              }}
            >
              <button className="back-btn" onClick={onBack}>
                <span className="back-btn-arrow">←</span>
                <span>All posts</span>
              </button>

              <span
                className="text-[8px] uppercase tracking-[0.22em]"
                style={{ color: accent }}
              >
                {post.category}
              </span>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}
