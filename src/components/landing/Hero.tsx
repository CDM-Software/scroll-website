import { useTranslations } from 'next-intl';

import { Rise } from './Rise';
import { Screenshot } from './Screenshot';

const PLAY_ICON = (
  <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 1.5v13l10.5-6.5z" fill="currentColor" />
  </svg>
);

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="hero">
      <div className="glow" />
      <div className="wrap">
        <Rise>
          <div className="kicker">{t('kicker')}</div>
          <h1>{t('slogan')}</h1>
          <p className="sub">{t('subtitle')}</p>
          <div className="cta">
            <a className="btn btn-pri btn-lg" href="#download">{PLAY_ICON}{t('ctaPrimary')}</a>
            <a className="btn btn-sec btn-lg" href="#masters">{t('ctaSecondary')}</a>
          </div>
          <div className="fine">{t('fine')}</div>
        </Rise>
        <Rise delay={0.12}>
          <div className="phone">
            <div className="cam" />
            <div className="screen">
              <Screenshot
                src="/screens/feed.png"
                alt={t('phoneSlot')}
                sizes="(max-width: 720px) 74vw, 310px"
                priority
              />
            </div>
            <div className="home" />
          </div>
        </Rise>
      </div>
    </section>
  );
}
