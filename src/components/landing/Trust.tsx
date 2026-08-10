import { useTranslations } from 'next-intl';

import { Rise } from './Rise';

export function Trust() {
  const t = useTranslations('trust');
  const items = t.raw('items') as { bold: string; text: string }[];
  const facts = t.raw('facts') as { value: string; accent: string; label: string }[];
  return (
    <section className="sec trust">
      <div className="wrap">
        <div className="tgrid">
          <Rise>
            <div className="kicker">{t('kicker')}</div>
            <h2>{t('title')}</h2>
            <ul className="tlist">
              {items.map((item) => (
                <li key={item.bold}>
                  <span className="tick">✓</span>
                  <span>
                    <b>{item.bold}</b> {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </Rise>
          <Rise className="facts" delay={0.1}>
            {facts.map((fact) => (
              <div className="fact" key={fact.label}>
                <div className="fv">
                  {fact.value}
                  {fact.accent && <b>{fact.accent}</b>}
                </div>
                <div className="fl">{fact.label}</div>
              </div>
            ))}
          </Rise>
        </div>
      </div>
    </section>
  );
}
