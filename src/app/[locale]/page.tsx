import { setRequestLocale } from 'next-intl/server';

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
} from '@/components/landing/sections';
import '../landing.css';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <How />
        <Players />
        <Masters />
        <Trust />
        <Community />
        <Roadmap />
        <Faq />
        <DownloadCta />
      </main>
      <Footer />
    </>
  );
}
