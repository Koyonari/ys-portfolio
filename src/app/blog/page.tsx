"use client";

import { useEffect, useState } from "react";

import { type Category, type BlogPost } from "@/types/blog";
import { POSTS } from "@/data/posts";

import Header from "@/components/blog/header";
import Sidebar from "@/components/blog/sidebar";
import List from "@/components/blog/list";
import PostDetail from "@/components/blog/postdetail";
import Footer from "@/components/main/footer";

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [openPost, setOpenPost] = useState<BlogPost | null>(null);
  const [vw, setVw] = useState(1440);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = vw < 640;

  const filtered =
    activeFilter === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === activeFilter);

  useEffect(() => {
    if (filtered.length > 0) setSelectedPost(filtered[0]);
  }, []);

  useEffect(() => {
    if (filtered.length > 0) setSelectedPost(filtered[0]);
    else setSelectedPost(null);
  }, [activeFilter]);

  const handleHover = (post: BlogPost | null) => {
    if (post !== null) setSelectedPost(post);
  };

  if (openPost) {
    return (
      <PostDetail
        post={openPost}
        onBack={() => {
          setOpenPost(null);
          // Restore scroll position to top of list
          window.scrollTo({ top: 0, behavior: "instant" });
        }}
      />
    );
  }

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

        .blog-row {
          position: relative;
          border-bottom: 1px solid var(--rule);
          cursor: pointer;
          transition: background 0.22s ease;
        }
        .blog-row:first-child { border-top: 1px solid var(--rule); }
        .blog-row:hover { background: rgba(228,228,223,0.025); }

        .blog-row-accent {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          opacity: 0;
          transition: opacity 0.22s ease;
        }
        .blog-row:hover .blog-row-accent { opacity: 1; }

        .blog-arrow {
          transition: transform 0.22s var(--ease), opacity 0.22s ease;
          opacity: 0.25;
        }
        .blog-row:hover .blog-arrow {
          transform: translateX(4px) translateY(-4px);
          opacity: 1;
        }

        .filter-btn {
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          cursor: pointer;
        }

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
      `}</style>

      <div
        style={{
          backgroundColor: "var(--bg)",
          minHeight: "100vh",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        <Header />

        <div
          className="mx-auto max-w-7xl"
          style={{
            padding: "0 clamp(1.25rem,4vw,4rem) clamp(4rem,8vw,8rem)",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "180px 1fr",
            gap: isMobile ? "2rem" : "clamp(2rem,5vw,6rem)",
            alignItems: "start",
          }}
        >
          <Sidebar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            hoveredPost={selectedPost}
            isMobile={isMobile}
          />

          <List
            filtered={filtered}
            totalCount={POSTS.length}
            isMobile={isMobile}
            onHover={handleHover}
            selectedPost={selectedPost}
            onOpen={setOpenPost}
          />
        </div>

        <Footer />
      </div>
    </>
  );
}
