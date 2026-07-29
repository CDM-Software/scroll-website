import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://scroll.example';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      alternates: {
        languages: { ru: `${SITE_URL}/`, en: `${SITE_URL}/en` },
      },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      alternates: {
        languages: { ru: `${SITE_URL}/`, en: `${SITE_URL}/en` },
      },
    },
  ];
}
