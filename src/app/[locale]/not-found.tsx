import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import '../legal.css';

/**
 * 404 внутри сегмента локали: попадает под layout, поэтому получает шрифты,
 * токены и язык страницы. Переиспользует типографику правовых страниц.
 */
export default function LocaleNotFound() {
  const t = useTranslations('notFound');

  return (
    <main className="legal">
      <div className="legal-wrap">
        <article className="legal-doc">
          <h1>{t('title')}</h1>
          <p className="legal-intro">{t('text')}</p>
        </article>
        <p style={{ marginTop: 32 }}>
          <Link className="legal-back" href="/">
            ← {t('cta')}
          </Link>
        </p>
      </div>
    </main>
  );
}
