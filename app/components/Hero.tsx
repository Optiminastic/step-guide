import { getAllGuides } from "@/app/lib/guides";

export default function Hero() {
  const total = getAllGuides().length;

  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* faint grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-16 text-center sm:px-8 sm:pb-20 sm:pt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          {total} step-by-step guides and counting
        </div>

        <h1 className="font-display mt-7 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Learn to make, build &amp;{" "}
          <span className="italic text-accent">do anything</span>, one step at a
          time
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
          Clear, beginner-friendly how-to guides — from starting a YouTube
          channel to coding with an AI agent to nailing paneer tikka. No fluff,
          just steps that work.
        </p>
      </div>
    </section>
  );
}
