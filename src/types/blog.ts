export type Category = "All" | "Tech" | "Projects" | "Thoughts" | "Travel";

/**
 * Content blocks for blog posts.
 *
 * Usage in posts.ts:
 *   { type: "p",      text: "Paragraph text here." }
 *   { type: "spacer" }                                 // blank line gap
 *   { type: "h2",     text: "Section heading" }
 *   { type: "h3",     text: "Sub-heading" }
 *   { type: "img",    src: "/images/foo.jpg", alt: "description", caption: "optional caption" }
 *   { type: "hr" }                                     // horizontal rule
 *   { type: "quote",  text: "Quoted text." }
 */
export type ContentBlock =
  | { type: "p";     text: string }
  | { type: "spacer" }
  | { type: "h2";    text: string }
  | { type: "h3";    text: string }
  | { type: "img";   src: string; alt?: string; caption?: string }
  | { type: "hr" }
  | { type: "quote"; text: string };

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  category: Exclude<Category, "All">;
  readTime: string;
  excerpt: string;
  content?: ContentBlock[];
  patternType: "grid" | "wave" | "noise" | "circuit" | "dots" | "lines" | "helix" | "morse";
}

export const CATEGORIES: Category[] = ["All", "Tech", "Projects", "Thoughts", "Travel"];

export const CAT_COLOR: Record<Exclude<Category, "All">, string> = {
  Tech: "#7EAABE",
  Projects: "#7EBE8F",
  Thoughts: "#A27EBE",
  Travel: "#BE7E7E",
};
