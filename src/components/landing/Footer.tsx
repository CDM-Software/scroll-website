import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const tNav = useTranslations('nav');
  const t = useTranslations('footer');
  const supportEmail = t('legal.contactEmail');
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="fgrid">
          <div className="fbrand">
            <Link className="logo" href="/">
              <span className="mark">🎲</span>ScRoll
            </Link>
            <p>{t('tagline')}</p>
          </div>
          <div className="fcol">
            <h3>{t('product')}</h3>
            <ul>
              <li><a href="#how">{tNav('how')}</a></li>
              <li><a href="#players">{tNav('players')}</a></li>
              <li><a href="#masters">{tNav('masters')}</a></li>
              <li><a href="#faq">{tNav('faq')}</a></li>
            </ul>
          </div>
          <div className="fcol">
            <h3>{t('help')}</h3>
            <ul>
              <li><a href={`mailto:${supportEmail}`}>{t('helpLinks.support')}</a></li>
              <li><Link href="/terms">{t('helpLinks.terms')}</Link></li>
              <li><Link href="/privacy">{t('helpLinks.privacy')}</Link></li>
            </ul>
          </div>
          <div className="fcol">
            <h3>{t('social')}</h3>
            <ul>
              <li><a href="#">Telegram</a></li>
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
