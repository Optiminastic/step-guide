// Reusable JSON-LD (structured data) renderer. Pass a schema object, or an
// array of them, and it emits a single <script type="application/ld+json">.

type Schema = Record<string, unknown>;

export default function JsonLd({ data }: { data: Schema | Schema[] }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, server-built content — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
