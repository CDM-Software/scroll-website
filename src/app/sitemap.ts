import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

// ru живёт на корне, en — с префиксом: см. localePrefix: 'as-needed' в routing.
const PATHS = ['', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PATHS.flatMap((path) => {
    const languages = { ru: `${SITE_URL}${path || '/'}`, en: `${SITE_URL}/en${path}` };

    return [
      { url: languages.ru, lastModified, alternates: { languages } },
      { url: languages.en, lastModified, alternates: { languages } },
    ];
  });
}
