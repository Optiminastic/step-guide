import Link from "next/link";
import { getFeaturedGuides } from "@/app/lib/guides";
import CoverArt from "./CoverArt";

export default function Sidebar() {
  const featured = getFeaturedGuides();

  return (
    <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
      {/* About */}
      <section className="rounded-2xl border border-line bg-paper-raised p-6">
        <h3 className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">
          About Stepwise
        </h3>
        <div className="mt-4 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg text-paper">
            ✶
          </span>
          <div>
            <div className="font-display text-base font-semibold text-ink">
              The Stepwise Team
            </div>
            <div className="text-xs text-ink-faint">Makers &amp; explainers</div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          We write the guide we wish we&apos;d had — every project broken into
          plain, do-able steps. From first lines of code to first loaves of
          bread.
        </p>
        <div className="mt-5 flex gap-2 text-xs">
          <span className="rounded-full border border-line px-2.5 py-1 text-ink-soft">
            🌍 Remote-first
          </span>
          <span className="rounded-full border border-line px-2.5 py-1 text-ink-soft">
            ✏️ 100% original
          </span>
        </div>
      </section>

      {/* Featured guides */}
      <section className="rounded-2xl border border-line bg-paper-raised p-6">
        <h3 className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">
          Featured guides
        </h3>
        <ul className="mt-4 space-y-4">
          {featured.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/${g.slug}`}
                className="group flex items-center gap-3"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-line">
                  <CoverArt
                    slug={g.slug}
                    category={g.category}
                    className="h-full w-full"
                  />
                </div>
                <div className="text-sm font-medium leading-snug text-ink group-hover:underline">
                  {g.title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Newsletter mini */}
      <section className="rounded-2xl border border-accent/30 bg-accent-soft/50 p-6">
        <h3 className="font-display text-lg font-semibold text-ink">
          Get one guide a week
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          Join readers learning something new every Sunday.
        </p>
        <Link
          href="/#subscribe"
          className="mt-4 inline-flex items-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          Subscribe free
        </Link>
      </section>
    </aside>
  );
}
