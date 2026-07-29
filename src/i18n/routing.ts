import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
  // ru живёт на корне (scroll.app/), en — с префиксом (scroll.app/en)
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
