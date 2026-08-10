import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import type { LegalDocumentName } from '@/components/legal/LegalDocument';
import { routing } from '@/i18n/routing';

const LEGAL_PATHS: Record<LegalDocumentName, string> = {
  privacy: '/privacy',
  terms: '/terms',
};

/** Общая обвязка метаданных для правовых страниц — они отличаются только текстом. */
export async function buildLegalMetadata(
  locale: string,
  name: LegalDocumentName,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const path = LEGAL_PATHS[name];

  return {
    title: t(`${name}Title`),
    description: t(`${name}Description`),
    alternates: {
      canonical: locale === routing.defaultLocale ? path : `/${locale}${path}`,
      languages: {
        ru: path,
        en: `/en${path}`,
        'x-default': path,
      },
    },
  };
}
