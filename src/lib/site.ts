/**
 * Канонический адрес сайта. На превью-деплоях Vercel переопределяется
 * через NEXT_PUBLIC_SITE_URL, чтобы canonical и sitemap не врали.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.circleofdms.com';

export const SITE_NAME = 'ScRoll';

// Юрлицо. Прежние названия (Circle of DMs, CDMS) в текстах запрещены —
// см. docs/PRODUCT-CONTEXT.md §5.
export const SITE_PUBLISHER = 'CDM Software LLC';
