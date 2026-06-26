import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CoverArt from "@/app/components/CoverArt";
import { getAllGuides, getGuideBySlug, formatDate } from "@/app/lib/guides";
import {
  getPosts,
  getPostBySlug,
  formatDate as formatDbDate,
} from "@/app/lib/blog-db";

export const revalidate = 300;

export async function generateStaticParams() {
  const guideSlugs = getAllGuides().map((g) => ({ slug: g.slug }));
  const dbSlugs = (await getPosts()).map((p) => ({ slug: p.slug }));
  return [...guideSlugs, ...dbSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (guide) return { title: `${guide.title} — Stepwise`, description: guide.excerpt };
  const post = await getPostBySlug(slug);
  if (post) return { title: post.title, description: post.description };
  return { title: "Not found" };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  // Locally-authored step guide → render the full long-form how-to.
  if (guide) {
    return (
      <>
        <Navbar />
        <main className="flex-1">
          <article className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
            <Link href="/" className="text-sm text-ink-soft transition-colors hover:text-ink">
              ← All guides
            </Link>

            <header className="mt-8">
              <div className="flex flex-wrap items-center gap-2 text-xs text-ink-faint">
                <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-medium text-accent">
                  {guide.difficulty}
                </span>
                <span aria-hidden>·</span>
                <time dateTime={guide.date}>{formatDate(guide.date)}</time>
                <span aria-hidden>·</span>
                <span>{guide.duration}</span>
              </div>

              <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                {guide.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{guide.excerpt}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-b border-line pb-8 text-sm text-ink-faint">
                <span className="text-ink-soft">{guide.author}</span>
                <span aria-hidden>·</span>
                <span>{guide.authorRole}</span>
                <span aria-hidden>·</span>
                <span>{guide.steps.length} steps · {guide.readingTime} min read</span>
              </div>
            </header>

            <div className="mt-10 overflow-hidden rounded-xl border border-line">
              <CoverArt slug={guide.slug} category={guide.category} className="aspect-[16/9] w-full" />
            </div>

            {/* Intro */}
            <div className="mt-10">
              {guide.intro.map((para, i) => (
                <p key={i} className="mt-4 text-lg leading-relaxed text-ink-soft first:mt-0">
                  {para}
                </p>
              ))}
            </div>

            {/* Requirements */}
            <section className="mt-10 rounded-2xl border border-line bg-paper-raised p-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                {guide.requirementsLabel}
              </h2>
              <ul className="mt-4 space-y-2">
                {guide.requirements.map((req, i) => (
                  <li key={i} className="flex gap-3 text-ink-soft">
                    <span aria-hidden className="mt-1 text-accent">▸</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Steps */}
            <section className="mt-12">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                The steps
              </h2>
              <ol className="mt-6 space-y-8">
                {guide.steps.map((step, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg font-semibold text-paper">
                      {i + 1}
                    </span>
                    <div className="pt-1">
                      <h3 className="font-display text-xl font-semibold leading-snug text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-lg leading-relaxed text-ink-soft">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Tips */}
            <section className="mt-12 rounded-2xl border border-accent/30 bg-accent-soft/40 p-6">
              <h2 className="font-display text-xl font-semibold text-ink">Pro tips</h2>
              <ul className="mt-4 space-y-2.5">
                {guide.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-ink-soft">
                    <span aria-hidden className="mt-1 text-accent">★</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Otherwise fall back to a published Signalor post (DB), if one matches.
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
          <Link href="/" className="text-sm text-ink-soft transition-colors hover:text-ink">
            ← Home
          </Link>
          <header className="mt-8 border-b border-line pb-10">
            <time className="text-xs uppercase tracking-wide text-ink-faint">
              {formatDbDate(post.published_at)}
            </time>
            <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {post.title}
            </h1>
            {post.description ? (
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{post.description}</p>
            ) : null}
          </header>
          {post.image_url ? (
            <div className="mt-10 overflow-hidden rounded-xl border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image_url} alt={post.title} className="w-full object-cover" />
            </div>
          ) : null}
          <div
            className="mt-10 [&_a]:text-accent [&_a]:underline [&_h2]:font-display [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_li]:text-ink-soft [&_p]:mt-4 [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-ink-soft [&_ul]:mt-4"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
