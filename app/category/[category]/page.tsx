import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import GuideCard from "@/app/components/GuideCard";
import {
  CATEGORIES,
  CATEGORY_META,
  getGuidesByCategory,
  type Category,
} from "@/app/lib/guides";

// Pre-render a page for every category.
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.toLowerCase() }));
}

/** Resolve a lowercased URL slug back to the canonical Category value. */
function resolveCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.toLowerCase() === slug.toLowerCase());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const resolved = resolveCategory(category);
  if (!resolved) return { title: "Not found — Stepwise" };
  return {
    title: `${resolved} guides — Stepwise`,
    description: `Step-by-step ${resolved.toLowerCase()} how-to guides on Stepwise.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const resolved = resolveCategory(category);

  if (!resolved) notFound();

  const guides = getGuidesByCategory(resolved);
  const meta = CATEGORY_META.find((c) => c.name === resolved);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
            <Link
              href="/#guides"
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              ← All guides
            </Link>
            <div className="mt-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-3xl">
                {meta?.icon}
              </span>
              <div>
                <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  {resolved}
                </h1>
                <p className="mt-1 text-ink-soft">
                  {meta?.blurb} · {guides.length}{" "}
                  {guides.length === 1 ? "guide" : "guides"}
                </p>
              </div>
            </div>

            {/* Other categories */}
            <div className="mt-8 flex flex-wrap gap-2">
              {CATEGORY_META.map((c) => {
                const isActive = c.name === resolved;
                return (
                  <Link
                    key={c.name}
                    href={`/category/${c.name.toLowerCase()}`}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "border-ink bg-ink text-paper"
                        : "border-line text-ink-soft hover:border-ink hover:text-ink"
                    }`}
                  >
                    <span aria-hidden>{c.icon}</span>
                    {c.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          {guides.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-ink-faint">
              No guides in this topic yet — check back soon.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
