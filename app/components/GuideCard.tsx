import Link from "next/link";
import type { Guide } from "@/app/lib/guides";
import { formatDate } from "@/app/lib/guides";
import CoverArt from "./CoverArt";

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`/blog/${guide.slug}`}
        className="flex flex-1 flex-col focus:outline-none"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line">
          <CoverArt
            slug={guide.slug}
            category={guide.category}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-ink backdrop-blur">
            {guide.category}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-ink-faint">
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-medium text-accent">
            {guide.difficulty}
          </span>
          <span aria-hidden>·</span>
          <time dateTime={guide.date}>{formatDate(guide.date)}</time>
        </div>

        <h3 className="font-display mt-2.5 text-xl font-semibold leading-snug tracking-tight text-ink decoration-from-font underline-offset-4 group-hover:underline sm:text-2xl">
          {guide.title}
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">
          {guide.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink group-hover:text-accent">
            Read the steps →
          </span>
          <span className="text-xs text-ink-faint">
            {guide.steps.length} steps · {guide.readingTime} min
          </span>
        </div>
      </Link>
    </article>
  );
}
