import type { Category } from "@/app/lib/guides";
import { categoryIcon } from "@/app/lib/guides";

// Deterministic generative cover art. Each guide gets a distinct, colorful
// composition derived from its slug, themed by a category palette, with the
// category emoji floated on top — so the grid reads like a friendly how-to
// magazine with zero external image dependencies.

const PALETTES: Record<Category, { from: string; to: string; shapes: string[] }> = {
  Technology: { from: "#4f46e5", to: "#06b6d4", shapes: ["#a5b4fc", "#67e8f9", "#ffffff", "#c4b5fd"] },
  Cooking: { from: "#f97316", to: "#e11d48", shapes: ["#fdba74", "#fda4af", "#fff7ed", "#fbbf24"] },
  Creator: { from: "#db2777", to: "#7c3aed", shapes: ["#f9a8d4", "#c4b5fd", "#fef3c7", "#f0abfc"] },
  Career: { from: "#0d9488", to: "#2563eb", shapes: ["#5eead4", "#93c5fd", "#ecfeff", "#a7f3d0"] },
  Money: { from: "#16a34a", to: "#65a30d", shapes: ["#86efac", "#d9f99d", "#f0fdf4", "#fde047"] },
  Lifestyle: { from: "#0891b2", to: "#7c3aed", shapes: ["#a5f3fc", "#c4b5fd", "#f5f3ff", "#5eead4"] },
};

/** Tiny deterministic hash → 0..1 generator seeded by a string. */
function seeded(slug: string) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function CoverArt({
  slug,
  category,
  className = "",
  showIcon = true,
}: {
  slug: string;
  category: Category;
  className?: string;
  showIcon?: boolean;
}) {
  const palette = PALETTES[category];
  const rand = seeded(slug);
  const variant = Math.floor(rand() * 3);
  const pick = () => palette.shapes[Math.floor(rand() * palette.shapes.length)];
  const gid = `g-${slug}`;
  const icon = categoryIcon(category);

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${category} guide cover artwork`}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#${gid})`} />

      {variant === 0 &&
        // Soft floating blobs
        Array.from({ length: 6 }).map((_, i) => {
          const cx = 40 + rand() * 320;
          const cy = 30 + rand() * 240;
          const rr = 26 + rand() * 70;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={rr}
              fill={pick()}
              opacity={0.35 + rand() * 0.4}
            />
          );
        })}

      {variant === 1 &&
        // Rounded confetti rectangles
        Array.from({ length: 7 }).map((_, i) => {
          const w = 36 + rand() * 90;
          const h = 18 + rand() * 40;
          const x = rand() * (400 - w);
          const y = 30 + rand() * 220;
          const r = (rand() - 0.5) * 50;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height={h}
              rx="10"
              fill={pick()}
              opacity={0.45 + rand() * 0.4}
              transform={`rotate(${r} ${x + w / 2} ${y + h / 2})`}
            />
          );
        })}

      {variant === 2 &&
        // Concentric arcs / rings
        Array.from({ length: 5 }).map((_, i) => {
          const cx = 60 + rand() * 280;
          const cy = 40 + rand() * 220;
          const rr = 20 + i * 16 + rand() * 16;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={rr}
              fill="none"
              stroke={pick()}
              strokeWidth={4 + rand() * 6}
              opacity={0.5 + rand() * 0.4}
            />
          );
        })}

      {showIcon && (
        <>
          <circle cx="200" cy="150" r="52" fill="#ffffff" opacity="0.92" />
          <text
            x="200"
            y="150"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="52"
          >
            {icon}
          </text>
        </>
      )}
    </svg>
  );
}
