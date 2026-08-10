import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';

import { routing, type Locale } from './routing';

/**
 * Достаёт локаль из параметров роута и сужает её тип со `string` до `Locale`.
 * Next отдаёт params нетипизированными, а next-intl после типизации сообщений
 * требует узкий тип — вместо приведения проверяем по-настоящему.
 */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}
