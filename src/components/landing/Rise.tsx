'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/** Scroll-in animation from the mockup: .rise → .rise.in on first intersection. */
export function Rise({
  children,
  className,
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('in');
            io.disconnect();
          }
        }),
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}s` } : undefined;

  return (
    <div ref={ref} className={className ? `rise ${className}` : 'rise'} style={style}>
      {children}
    </div>
  );
}
