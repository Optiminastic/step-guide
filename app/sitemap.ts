import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/seo";
import { getAllGuides } from "@/app/lib/guides";
import { getPosts } from "@/app/lib/blog-db";

// Enumerates every content URL: the homepage, all local step guides, and any
// published Signalor (DB) posts. A DB fetch failure must never break the build,
// so it is caught and the sitemap still ships the local guides.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const guides = getAllGuides();
  const guideSlugs = new Set(guides.map((g) => g.slug));

  const guideEntries: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${SITE_URL}/${g.slug}`,
    lastModified: new Date(g.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    postEntries = (await getPosts())
      // A guide page wins on a slug clash (see [slug]/page.tsx) — don't dupe it.
      .filter((p) => p.slug && !guideSlugs.has(p.slug))
      .map((p) => ({
        url: `${SITE_URL}/${p.slug}`,
        lastModified: p.published_at ? new Date(p.published_at) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      }));
  } catch (e) {
    console.error("[sitemap] DB post fetch failed:", e);
    postEntries = [];
  }

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...guideEntries,
    ...postEntries,
  ];
}
