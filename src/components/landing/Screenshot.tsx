import Image from 'next/image';

/**
 * App screenshot exported from Figma at 2x (public/screens/*).
 * Parent must be position:relative with overflow:hidden (.phone .screen, .shot .frame).
 */
export function Screenshot({
  src,
  alt,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectFit: 'cover', objectPosition: 'top' }}
    />
  );
}
