import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { LegalDocument } from '@/components/legal/LegalDocument';
import { resolveLocale } from '@/i18n/params';
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
  const locale = await resolveLocale(params);
  return buildLegalMetadata(locale, 'csae');
}

export default async function CsaePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  return <LegalDocument name="csae" />;
}
