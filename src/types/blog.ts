export type Category = "All" | "Tech" | "Projects" | "Thoughts" | "Travel";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  category: Exclude<Category, "All">;
  readTime: string;
  excerpt: string;
  content?: string;
  patternType: "grid" | "wave" | "noise" | "circuit" | "dots" | "lines" | "helix" | "morse";
}

export const CATEGORIES: Category[] = ["All", "Tech", "Projects", "Thoughts", "Travel"];

export const CAT_COLOR: Record<Exclude<Category, "All">, string> = {
  Tech: "#7EAABE",
  Projects: "#7EBE8F",
  Thoughts: "#A27EBE",
  Travel: "#BE7E7E",
};
