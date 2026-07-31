import { useTranslations } from 'next-intl';

import { Rise } from './Rise';
import { Screenshot } from './Screenshot';

const PLAY_ICON = (
  <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 1.5v13l10.5-6.5z" fill="currentColor" />
  </svg>
);

const FEATURE_ICONS = [
  <svg key="search" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></svg>,
  <svg key="check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>,
  <svg key="chat" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-9 8.4 8.5 8.5 0 01-3.9-.9L3 21l2-5.1a8.38 8.38 0 01-.9-3.9 8.5 8.5 0 018.4-9 8.38 8.38 0 018.5 8.5z" /></svg>,
  <svg key="star" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" /></svg>,
];

const COMMUNITY_BADGE_COLORS = ['var(--color-badge-event)', 'var(--color-badge-guide)', 'var(--color-badge-news)'];

// Скрины из Figma-макетов (2x): порядок совпадает с шагами how.steps.
const STEP_SCREENS = ['/screens/filters.png', '/screens/game.png', '/screens/chat.png'];

export function Nav() {
  const t = useTranslations('nav');
  return (
    <nav className="nav">
      <div className="wrap">
        <a className="logo" href="#">
          <span className="mark">🎲</span>ScRoll
        </a>
        <span className="sp" />
        <a className="nl" href="#how">{t('how')}</a>
        <a className="nl" href="#players">{t('players')}</a>
        <a className="nl" href="#masters">{t('masters')}</a>
        <a className="nl" href="#faq">{t('faq')}</a>
        <a className="btn btn-pri" href="#download" style={{ padding: '9px 18px', fontSize: 14 }}>
          {t('download')}
        </a>
      </div>
    </nav>
  );
}

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
              <h4>{rank}</h4>
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
            <a className="btn btn-pri btn-lg" href="#">{PLAY_ICON}{t('cta')}</a>
          </div>
          <div className="fine">{t('fine')}</div>
        </Rise>
      </div>
    </section>
  );
}

export function Footer() {
  const tNav = useTranslations('nav');
  const t = useTranslations('footer');
  const helpLinks = t.raw('helpLinks') as string[];
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="fgrid">
          <div className="fbrand">
            <a className="logo" href="#">
              <span className="mark">🎲</span>ScRoll
            </a>
            <p>{t('tagline')}</p>
          </div>
          <div className="fcol">
            <h5>{t('product')}</h5>
            <ul>
              <li><a href="#how">{tNav('how')}</a></li>
              <li><a href="#players">{tNav('players')}</a></li>
              <li><a href="#masters">{tNav('masters')}</a></li>
              <li><a href="#faq">{tNav('faq')}</a></li>
            </ul>
          </div>
          <div className="fcol">
            <h5>{t('help')}</h5>
            <ul>
              {helpLinks.map((link) => (
                <li key={link}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>
          <div className="fcol">
            <h5>{t('social')}</h5>
            <ul>
              <li><a href="#">Telegram</a></li>
              <li><a href="#">VK</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <span>{t('rights', { year: new Date().getFullYear() })}</span>
          <span className="sp" />
          <span>{t('madeWith')}</span>
        </div>
        <div className="flegal">
          <span>{t('legal.operated')}</span>
          <span>{t('legal.address')}</span>
          <span>
            {t('legal.contactLabel')}{' '}
            <a href={`mailto:${t('legal.contactEmail')}`}>{t('legal.contactEmail')}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
