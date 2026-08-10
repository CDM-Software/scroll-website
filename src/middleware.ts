import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Всё, кроме внутренних путей Next и статических файлов.
  //
  // opengraph-image исключён отдельно: у него нет расширения, поэтому под
  // общий фильтр по точке он не попадает, а при localePrefix: 'as-needed'
  // middleware редиректит /ru/opengraph-image на /opengraph-image. Краулеры
  // соцсетей по редиректу для og:image не ходят и показывают карточку без
  // картинки.
  matcher: '/((?!api|trpc|_next|_vercel|.*opengraph-image|.*\\..*).*)',
};
