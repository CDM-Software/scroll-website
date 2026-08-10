import { useTranslations } from 'next-intl';

import { Rise } from './Rise';

const FEATURE_ICONS = [
  <svg key="search" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></svg>,
  <svg key="check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>,
  <svg key="chat" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-9 8.4 8.5 8.5 0 01-3.9-.9L3 21l2-5.1a8.38 8.38 0 01-.9-3.9 8.5 8.5 0 018.4-9 8.38 8.38 0 018.5 8.5z" /></svg>,
  <svg key="star" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" /></svg>,
];

export function Players() {
  const t = useTranslations('players');
  const cards = t.raw('cards') as { title: string; text: string }[];
  return (
    <section className="sec" id="players">
      <div className="wrap">
        <Rise>
          <div className="kicker">{t('kicker')}</div>
          <h2>{t('title')}</h2>
          <p className="lead">{t('lead')}</p>
        </Rise>
        <div className="grid4">
          {cards.map((card, i) => (
            <Rise key={card.title} className="fcard" delay={i * 0.06}>
              <div className="ico">{FEATURE_ICONS[i]}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </Rise>
          ))}
        </div>
        <Rise className="gcrow">
          <div>
            <div className="game-card">
              <div className="cover">
                <span className="badge">{t('gameCard.badge')}</span>
                <span className="status">{t('gameCard.status')}</span>
              </div>
              <div className="body">
                <h4>{t('gameCard.title')}</h4>
                <div className="dt">{t('gameCard.datetime')}</div>
                <div className="meta">
                  <span>{t('gameCard.meta')}</span>
                  <span className="price">{t('gameCard.price')}</span>
                </div>
              </div>
            </div>
            <div className="gc-note">{t('gameCard.note')}</div>
          </div>
          <div className="gc-detail">
            <h3>{t('detail.title')}</h3>
            <p>{t('detail.text')}</p>
            <a className="more" href="#download">{t('detail.link')}</a>
          </div>
        </Rise>
      </div>
    </section>
  );
}
