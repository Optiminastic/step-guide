import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/app/lib/seo";

// Default social-share card, generated at /opengraph-image (1200×630 PNG).
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #06b6d4 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          Practical, step-by-step how-to guides
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 34,
            opacity: 0.9,
          }}
        >
          Learn to make, build and do anything.
        </div>
      </div>
    ),
    { ...size },
  );
}
