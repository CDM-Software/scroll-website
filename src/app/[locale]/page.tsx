import { getTranslations, setRequestLocale } from 'next-intl/server';

import {
  Community,
  DownloadCta,
  Faq,
  Footer,
  Hero,
  How,
  Masters,
  Nav,
  Players,
  Roadmap,
  Trust,
} from '@/components/landing';
import { JsonLd } from '@/components/seo/JsonLd';
import { resolveLocale } from '@/i18n/params';
import { buildFaqSchema } from '@/lib/schema';
import '../landing.css';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'faq' });
  const faqItems = t.raw('items') as { q: string; a: string }[];

  return (
    <>
      <JsonLd data={[buildFaqSchema(faqItems)]} />
      <Nav />
      <main>
        <Hero />
        <How />
        <Players />
        <Trust />
        <Masters />
        <Roadmap />
        <Community />
        <Faq />
        <DownloadCta />
      </main>
      <Footer />
    </>
  );
}
