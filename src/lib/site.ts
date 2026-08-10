/**
 * Канонический адрес сайта. На превью-деплоях Vercel переопределяется
 * через NEXT_PUBLIC_SITE_URL, чтобы canonical и sitemap не врали.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.circleofdms.com';

export const SITE_NAME = 'ScRoll';

// Юрлицо. Прежние названия (Circle of DMs, CDMS) в текстах запрещены —
// см. docs/PRODUCT-CONTEXT.md §5.
export const SITE_PUBLISHER = 'CDM Software LLC';

/**
 * Токен подтверждения прав в Google Search Console (способ «HTML tag»).
 * Значение публичное — оно и так уходит в разметку каждой страницы.
 * Пустая строка = тег не выводится.
 *
 * Где взять: Search Console → Add property → URL prefix →
 * https://www.circleofdms.com/ → HTML tag → скопировать содержимое content.
 */
export const GOOGLE_SITE_VERIFICATION = '';
