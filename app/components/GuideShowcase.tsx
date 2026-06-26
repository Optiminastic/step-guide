import type { CardItem } from "@/app/lib/content";
import GuideCard from "./GuideCard";
import Sidebar from "./Sidebar";

export default function GuideShowcase({ items }: { items: CardItem[] }) {
  return (
    <section id="guides" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="border-b border-line pb-6">
        <span className="text-[11px] uppercase tracking-[0.25em] text-ink-faint">
          The library
        </span>
        <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Latest guides
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Card grid — newest first, so freshly published posts lead. */}
        <div>
          {items.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
              {items.map((item) => (
                <GuideCard key={item.slug} item={item} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-ink-faint">
              No guides yet — check back soon.
            </p>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </section>
  );
}
