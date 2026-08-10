import { useTranslations } from 'next-intl';

import { Rise } from './Rise';

export function DownloadCta() {
  const t = useTranslations('download');
  return (
    <section className="dl" id="download">
      <div className="glow" />
      <div className="wrap">
        <Rise>
          <h2>{t('title')}</h2>
          <p className="lead">{t('lead')}</p>
          <div className="cta">
            <a
              className="btn btn-pri btn-lg"
              href={`mailto:primus@circleofdms.com?subject=${encodeURIComponent(t('ctaSubject'))}`}
            >
              {t('cta')}
            </a>
          </div>
          <div className="fine">{t('fine')}</div>
        </Rise>
      </div>
    </section>
  );
}
