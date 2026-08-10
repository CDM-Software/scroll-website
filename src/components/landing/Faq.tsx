import { useTranslations } from 'next-intl';

import { Rise } from './Rise';

export function Faq() {
  const t = useTranslations('faq');
  const items = t.raw('items') as { q: string; a: string }[];
  return (
    <section className="sec" id="faq">
      <div className="wrap faq-wrap">
        <Rise>
          <div className="kicker">{t('kicker')}</div>
          <h2>{t('title')}</h2>
        </Rise>
        <Rise className="faq-list">
          {items.map((item, i) => (
            <details className="faq-item" key={item.q} open={i === 0}>
              <summary>
                {item.q}
                <span className="pl">+</span>
              </summary>
              <div className="ans">{item.a}</div>
            </details>
          ))}
        </Rise>
      </div>
    </section>
  );
}
