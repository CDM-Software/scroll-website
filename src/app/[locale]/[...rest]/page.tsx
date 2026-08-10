import { notFound } from 'next/navigation';

/**
 * Ловит любой несуществующий путь внутри локали и отдаёт not-found.tsx
 * этого сегмента. Без этого Next показал бы глобальную 404 — без layout,
 * без шрифтов и без языка страницы.
 */
export default function CatchAllPage() {
  notFound();
}
