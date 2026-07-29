/**
 * Placeholder for a real app screenshot (mirrors the mockup's <image-slot>).
 * Replace with next/image once the screenshot set is captured.
 */
export function ImageSlot({ label }: { label: string }) {
  return (
    <div className="img-slot" role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  );
}
