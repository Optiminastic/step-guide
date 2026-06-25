import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-sm text-paper">
            ✶
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            Stepwise
          </span>
          <span className="hidden text-[11px] uppercase tracking-[0.2em] text-ink-faint sm:inline">
            How-To Guides
          </span>
        </Link>

        <Link
          href="/#subscribe"
          className="inline-flex shrink-0 items-center rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          Subscribe
        </Link>
      </nav>
    </header>
  );
}
