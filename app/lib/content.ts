// Unified card list for the Stepwise homepage grid.
//
// Merges the locally-authored step guides with any published Signalor (DB)
// posts for this site into one list, newest-first — so a freshly published
// Signalor post becomes the first card, and the grid is always latest-first.

import type { Category, Guide } from "./guides";
import { getAllGuides } from "./guides";
import { getPosts, type BlogRow } from "./blog-db";

const CATEGORY_LIST: Category[] = [
  "Technology",
  "Cooking",
  "Creator",
  "Career",
  "Money",
  "Lifestyle",
];

export interface CardItem {
  slug: string;
  title: string;
  excerpt: string;
  /** Used for the generative cover art theming. */
  category: Category;
  /** ISO date string, or null. */
  date: string | null;
  source: "guide" | "db";
  /** Real image (DB posts) when available. */
  imageUrl: string | null;
  /** Guide-only meta. */
  difficulty: string | null;
  steps: number | null;
  readingTime: number;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Map a free-form DB category onto a guide category for cover-art theming. */
function matchCategory(raw: string): Category {
  return CATEGORY_LIST.find((c) => c.toLowerCase() === raw.trim().toLowerCase()) ?? "Technology";
}

/** Keep only genuine published Signalor rows — never placeholder/test rows.
 *  The list endpoint returns summaries WITHOUT content_html, so only gate on
 *  body length when a body is actually present (never drop a valid summary). */
function isRealDbPost(r: BlogRow): boolean {
  const title = (r.title ?? "").trim();
  if (!title || /^test\b/i.test(title)) return false;
  const text = stripHtml(r.content_html ?? "");
  if (text && text.length < 140) return false;
  return true;
}

function guideToCard(g: Guide): CardItem {
  return {
    slug: g.slug,
    title: g.title,
    excerpt: g.excerpt,
    category: g.category,
    date: g.date,
    source: "guide",
    imageUrl: null,
    difficulty: g.difficulty,
    steps: g.steps.length,
    readingTime: g.readingTime,
  };
}

function dbToCard(r: BlogRow): CardItem {
  const text = stripHtml(r.content_html ?? "");
  return {
    slug: r.slug,
    title: r.title,
    excerpt: (r.description?.trim() || text).slice(0, 160),
    category: matchCategory(r.category ?? ""),
    date: r.published_at,
    source: "db",
    imageUrl: r.image_url?.trim() || null,
    difficulty: null,
    steps: null,
    readingTime: estimateReadingTime(text),
  };
}

function timeOf(date: string | null): number {
  return date ? new Date(date).getTime() || 0 : 0;
}

/** Guides + published Signalor posts, newest first. DB wins on slug clash. */
export async function getAllCards(): Promise<CardItem[]> {
  const dbCards = (await getPosts()).filter(isRealDbPost).map(dbToCard);
  const seen = new Set(dbCards.map((c) => c.slug));
  const guideCards = getAllGuides()
    .map(guideToCard)
    .filter((c) => !seen.has(c.slug));
  return [...dbCards, ...guideCards].sort((a, b) => timeOf(b.date) - timeOf(a.date));
}

/** Stable date formatter handling both ISO (DB) and date-only (guides). */
export function formatCardDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}
