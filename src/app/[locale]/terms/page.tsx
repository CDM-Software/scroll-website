import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { LegalDocument } from '@/components/legal/LegalDocument';
import { routing } from '@/i18n/routing';
import { buildLegalMetadata } from '@/lib/legal';
import '../../legal.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildLegalMetadata(locale, 'terms');
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalDocument name="terms" />;
}
