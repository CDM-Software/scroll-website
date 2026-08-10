import { useTranslations } from 'next-intl';

import { Rise } from './Rise';

const COMMUNITY_BADGE_COLORS = ['var(--color-badge-event)', 'var(--color-badge-guide)', 'var(--color-badge-news)'];

export function Community() {
  const t = useTranslations('community');
  const cards = t.raw('cards') as { badge: string; title: string; text: string }[];
  return (
    <section className="sec" id="community">
      <div className="wrap">
        <Rise>
          <div className="kicker">{t('kicker')}</div>
          <h2>{t('title')}</h2>
          <p className="lead">{t('lead')}</p>
        </Rise>
        <div className="cgrid">
          {cards.map((card, i) => (
            <Rise key={card.title} className="ccard" delay={i * 0.08}>
              <span className="cbadge" style={{ background: COMMUNITY_BADGE_COLORS[i] }}>
                {card.badge}
              </span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
