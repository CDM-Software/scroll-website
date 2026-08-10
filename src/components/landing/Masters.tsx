import { useTranslations } from 'next-intl';

import { Rise } from './Rise';

export function Masters() {
  const t = useTranslations('masters');
  const cards = t.raw('cards') as { num: string; title: string; text: string }[];
  return (
    <section className="sec masters" id="masters">
      <div className="wrap">
        <Rise>
          <div className="kicker">{t('kicker')}</div>
          <h2>{t('title')}</h2>
          <p className="lead">{t('lead')}</p>
        </Rise>
        <div className="mgrid">
          {cards.map((card, i) => (
            <Rise key={card.title} className="mcard" delay={i * 0.08}>
              <div className="mnum">{card.num}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </Rise>
          ))}
        </div>
        <Rise className="soon">
          <span className="tag">{t('soonTag')}</span>
          <p>{t('soonText')}</p>
        </Rise>
      </div>
    </section>
  );
}
