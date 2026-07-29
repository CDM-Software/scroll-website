import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Всё, кроме внутренних путей Next и статических файлов.
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
