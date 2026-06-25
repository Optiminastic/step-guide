"use client";

import { useMemo, useState } from "react";
import type { Guide } from "@/app/lib/guides";
import { CATEGORIES } from "@/app/lib/guides";
import GuideCard from "./GuideCard";
import Sidebar from "./Sidebar";

const ALL = "All" as const;

export default function GuideShowcase({ guides }: { guides: Guide[] }) {
  const [active, setActive] = useState<string>(ALL);

  const filtered = useMemo(
    () =>
      active === ALL ? guides : guides.filter((g) => g.category === active),
    [active, guides]
  );

  const filters = [ALL, ...CATEGORIES];

  return (
    <section id="guides" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-ink-faint">
            The library
          </span>
          <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Latest guides
          </h2>
        </div>

        {/* Category filter */}
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by topic"
        >
          {filters.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Card grid */}
        <div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
              {filtered.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-ink-faint">
              No guides in this topic yet — check back soon.
            </p>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </section>
  );
}
