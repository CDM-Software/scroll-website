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
 * Официальные аккаунты бренда. Названия площадок не переводятся, поэтому
 * лежат здесь, а не в messages: один список кормит и футер, и `sameAs`
 * в разметке организации — иначе адреса разъедутся между ними.
 *
 * Порядок = порядок вывода в футере: сначала то, где живёт сообщество.
 */
export const SOCIAL_LINKS = [
  { name: 'Telegram', url: 'https://t.me/circleofdms' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCKZm6OqhTa7eZFn3X27svRQ' },
  { name: 'Twitch', url: 'https://www.twitch.tv/cmdshows' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@cdmshows' },
  { name: 'Instagram', url: 'https://www.instagram.com/cdmshows/' },
] as const;

/**
 * Токен подтверждения прав в Google Search Console (способ «HTML tag»).
 * Значение публичное — оно и так уходит в разметку каждой страницы.
 * Пустая строка = тег не выводится.
 *
 * Где взять: Search Console → Add property → URL prefix →
 * https://www.circleofdms.com/ → HTML tag → скопировать содержимое content.
 */
export const GOOGLE_SITE_VERIFICATION = '';
