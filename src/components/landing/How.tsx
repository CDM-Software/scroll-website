import { useTranslations } from 'next-intl';

import { Rise } from './Rise';
import { Screenshot } from './Screenshot';

// Скрины из Figma-макетов (2x): порядок совпадает с шагами how.steps.
const STEP_SCREENS = ['/screens/filters.png', '/screens/game.png', '/screens/chat.png'];

export function How() {
  const t = useTranslations('how');
  const steps = t.raw('steps') as { title: string; text: string; slot: string }[];
  return (
    <section className="how" id="how">
      <div className="wrap">
        <Rise>
          <div className="kicker">{t('kicker')}</div>
          <h2>{t('title')}</h2>
          <p className="lead">{t('lead')}</p>
        </Rise>
        <div className="steps">
          {steps.map((step, i) => (
            <Rise key={step.title} className="step" delay={i * 0.08}>
              <div className="num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <div className="shot">
                <div className="frame">
                  <Screenshot
                    src={STEP_SCREENS[i]}
                    alt={step.slot}
                    sizes="(max-width: 900px) 100vw, 360px"
                  />
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
