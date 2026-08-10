/**
 * Вставка JSON-LD. `<` экранируется, чтобы строка из переводов не смогла
 * закрыть тег script и выйти в разметку.
 */
export function JsonLd({ data }: { data: Record<string, unknown>[] }) {
  return (
    <>
      {data.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
