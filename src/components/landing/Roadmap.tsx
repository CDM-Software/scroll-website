import { useTranslations } from 'next-intl';

import { Rise } from './Rise';

export function Roadmap() {
  const t = useTranslations('roadmap');
  const ranks = t.raw('ranks') as string[];
  const extras = t.raw('extras') as string[];
  return (
    <section className="sec road">
      <div className="wrap">
        <Rise className="head">
          <div className="kicker">{t('kicker')}</div>
          <h2>{t('title')}</h2>
          <p className="lead">{t('lead')}</p>
        </Rise>
        <Rise className="ranks">
          {ranks.map((rank, i) => (
            <div className={i === 0 ? 'rank lit' : 'rank'} key={rank}>
              <div className="dot" />
              <div className="rn">{t('rankLabel', { num: String(i + 1).padStart(2, '0') })}</div>
              <h3>{rank}</h3>
            </div>
          ))}
        </Rise>
        <Rise className="rfoot">
          {extras.map((extra) => (
            <span key={extra}>{extra}</span>
          ))}
        </Rise>
      </div>
    </section>
  );
}
