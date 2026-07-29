import { getTranslations, setRequestLocale } from 'next-intl/server';

/**
 * Каркас главной. Секции сайта реализуются по макетам из Claude Design;
 * hero ниже — проверка темы (токены, шрифт, glow), не финальный дизайн.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('hero');
  const tFooter = await getTranslations('footer');

  return (
    <main className="flex min-h-screen flex-col">
      <section className="brand-glow flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          {t('slogan')}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground-secondary md:text-lg">
          {t('subtitle')}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#download"
            className="rounded-button bg-brand-primary px-8 py-4 font-semibold text-white transition-colors hover:bg-brand-hover active:bg-brand-pressed"
          >
            {t('ctaPrimary')}
          </a>
          <a
            href="#masters"
            className="rounded-button border border-edge bg-surface px-8 py-4 font-semibold text-foreground transition-colors hover:border-edge-strong"
          >
            {t('ctaSecondary')}
          </a>
        </div>
      </section>

      <footer className="border-t border-edge-subtle bg-canvas px-6 py-10 text-center text-sm text-foreground-muted">
        {tFooter('rights', { year: new Date().getFullYear() })}
      </footer>
    </main>
  );
}
