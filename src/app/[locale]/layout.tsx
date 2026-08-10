import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { routing } from '@/i18n/routing';
import { SITE_NAME, SITE_PUBLISHER, SITE_URL } from '@/lib/site';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const path = locale === routing.defaultLocale ? '/' : `/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: `%s · ${SITE_NAME}`,
    },
    description: t('description'),
    applicationName: SITE_NAME,
    keywords: t.raw('keywords') as string[],
    publisher: SITE_PUBLISHER,
    creator: SITE_PUBLISHER,
    category: 'games',
    formatDetection: { telephone: false, address: false, email: false },
    appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: 'black-translucent' },
    alternates: {
      canonical: path,
      languages: {
        ru: '/',
        en: '/en',
        'x-default': '/',
      },
    },
    // og:image и twitter:image подставляет файловая конвенция opengraph-image.tsx.
    openGraph: {
      type: 'website',
      url: path,
      siteName: SITE_NAME,
      title: t('title'),
      description: t('description'),
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      alternateLocale: locale === 'ru' ? 'en_US' : 'ru_RU',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Включает статический рендеринг локализованных страниц.
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      {/* suppressHydrationWarning: защитные расширения (Bitdefender и т.п.)
          штампуют DOM атрибутами до гидрейшна — это их шум, не наш баг. */}
      <body suppressHydrationWarning>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
