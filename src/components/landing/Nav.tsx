import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Nav() {
  const t = useTranslations('nav');
  return (
    <nav className="nav">
      <div className="wrap">
        <Link className="logo" href="/">
          <span className="mark">🎲</span>ScRoll
        </Link>
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
