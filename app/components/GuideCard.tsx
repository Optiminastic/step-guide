import Link from "next/link";
import type { CardItem } from "@/app/lib/content";
import { formatCardDate } from "@/app/lib/content";
import CoverArt from "./CoverArt";

/** A homepage card — renders either a local step guide or a published Signalor post. */
export default function GuideCard({ item }: { item: CardItem }) {
  const isGuide = item.source === "guide";

  return (
    <article className="group flex flex-col">
      <Link href={`/${item.slug}`} className="flex flex-1 flex-col focus:outline-none">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt={`Cover image for ${item.title}`}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <CoverArt
              slug={item.slug}
              category={item.category}
              className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
            />
          )}
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-ink-faint">
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-medium text-accent">
            {isGuide ? item.difficulty : "New"}
          </span>
          {item.date ? (
            <>
              <span aria-hidden>·</span>
              <time dateTime={item.date}>{formatCardDate(item.date)}</time>
            </>
          ) : null}
        </div>

        <h3 className="font-display mt-2.5 text-xl font-semibold leading-snug tracking-tight text-ink decoration-from-font underline-offset-4 group-hover:underline sm:text-2xl">
          {item.title}
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">
          {item.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink group-hover:text-accent">
            {isGuide ? "Read the steps →" : "Read more →"}
          </span>
          <span className="text-xs text-ink-faint">
            {isGuide ? `${item.steps} steps · ${item.readingTime} min` : `${item.readingTime} min read`}
          </span>
        </div>
      </Link>
    </article>
  );
}
