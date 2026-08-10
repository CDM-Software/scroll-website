import type { Locale } from '@/i18n/routing';
import { SITE_NAME, SITE_PUBLISHER, SITE_URL } from '@/lib/site';

type JsonLdObject = Record<string, unknown>;

const LEGAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '1021 E Lincolnway 10456',
  addressLocality: 'Cheyenne',
  addressRegion: 'WY',
  postalCode: '82001',
  addressCountry: 'US',
};

/** Организация и сайт — одинаковы на всех страницах, живут в layout. */
export function buildSiteSchema(locale: Locale, contactEmail: string): JsonLdObject[] {
  const organizationId = `${SITE_URL}/#organization`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE_NAME,
      legalName: SITE_PUBLISHER,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      email: contactEmail,
      address: LEGAL_ADDRESS,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: locale === 'ru' ? 'ru-RU' : 'en-US',
      publisher: { '@id': organizationId },
    },
  ];
}

/**
 * FAQPage для секции вопросов на лендинге. Google показывает такую разметку
 * в выдаче, но только если те же вопросы и ответы видны на самой странице —
 * поэтому источник тот же, что и у секции: messages/*.json.
 */
export function buildFaqSchema(items: { q: string; a: string }[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
