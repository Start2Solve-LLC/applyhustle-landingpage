/**
 * Renders one or more JSON-LD schema objects into a script tag. Server-only,
 * static data — safe to inline. Pass an array to emit multiple schemas at once.
 */
export function JsonLd({
  schema,
}: {
  schema: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
