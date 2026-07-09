// Shared SEO constants and structured-data (JSON-LD) builders for Guide
// Factories. Pure helpers — no data fetching lives here, so this never touches
// the content layer (guides.ts / blog-db.ts / content.ts).

import type { Guide } from "./guides";
import type { BlogRow } from "./blog-db";

export const SITE_URL = "https://guidefactories.com";
export const SITE_NAME = "Guide Factories";
export const SITE_TAGLINE = "Practical, step-by-step how-to guides";
export const SITE_TITLE =
  "Guide Factories — Practical, Step-by-Step How-To Guides";
export const SITE_DESCRIPTION =
  "Guide Factories publishes practical, step-by-step how-to guides on technology, cooking, creating, careers, money and life — learn to make and do anything.";

/** The default social-share image, generated at /opengraph-image. */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: SITE_TAGLINE,
} as const;

/** Strip HTML tags and collapse whitespace to plain text. */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Trim text to ~max chars on a word boundary for meta descriptions. */
export function truncate(text: string, max = 155): string {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

const publisher = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/icon.svg`,
  },
};

/** WebSite schema for the homepage. */
export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_TAGLINE,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

/** Organization schema for the homepage. */
export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: SITE_DESCRIPTION,
  };
}

/** HowTo schema built from a step-by-step guide. */
export function howToSchema(guide: Guide): Record<string, unknown> {
  const url = `${SITE_URL}/${guide.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: truncate(guide.excerpt, 300),
    image: `${SITE_URL}${OG_IMAGE.url}`,
    totalTime: undefined,
    datePublished: guide.date,
    author: { "@type": "Person", name: guide.author },
    publisher,
    mainEntityOfPage: url,
    supply: guide.requirements.map((name) => ({
      "@type": "HowToSupply",
      name,
    })),
    step: guide.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.detail,
      url: `${url}#step-${i + 1}`,
    })),
  };
}

/** BlogPosting schema for a plain (non-step) DB post. */
export function blogPostingSchema(post: BlogRow): Record<string, unknown> {
  const url = `${SITE_URL}/${post.slug}`;
  const description =
    post.description?.trim() || truncate(stripHtml(post.content_html), 300);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: post.image_url?.trim() || `${SITE_URL}${OG_IMAGE.url}`,
    datePublished: post.published_at ?? undefined,
    dateModified: post.published_at ?? undefined,
    url,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher,
  };
}
