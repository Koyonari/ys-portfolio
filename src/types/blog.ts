export type Category = "All" | "Tech" | "Life" | "Projects" | "Cybersecurity" | "Thoughts";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  category: Exclude<Category, "All">;
  readTime: string;
  excerpt: string;
  patternType: "grid" | "wave" | "noise" | "circuit" | "dots" | "lines" | "helix" | "morse";
}

export const CATEGORIES: Category[] = ["All", "Tech", "Life", "Projects", "Cybersecurity", "Thoughts"];

export const CAT_COLOR: Record<Exclude<Category, "All">, string> = {
  Tech: "#7EAABE",
  Life: "#BE7E7E",
  Projects: "#7EBE8F",
  Cybersecurity: "#C8AA6E",
  Thoughts: "#A27EBE",
};
