import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export type LegalDocumentName = 'privacy' | 'terms';

type LegalSection = {
  title: string;
  body: string[];
};

/** Разметка правового документа. Текст целиком живёт в messages/*.json. */
export function LegalDocument({ name }: { name: LegalDocumentName }) {
  const t = useTranslations(`legal.${name}`);
  const tLegal = useTranslations('legal');
  const tFooter = useTranslations('footer');
  const sections = t.raw('sections') as LegalSection[];
  const contactEmail = tFooter('legal.contactEmail');

  return (
    <main className="legal">
      <div className="legal-wrap">
        <Link className="legal-back" href="/">
          ← {tLegal('backToHome')}
        </Link>

        <article className="legal-doc">
          <h1>{t('title')}</h1>
          <p className="legal-updated">{t('updated')}</p>
          <p className="legal-intro">{t('intro')}</p>

          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>

        <div className="legal-imprint">
          <span>{tFooter('legal.operated')}</span>
          <span>{tFooter('legal.address')}</span>
          <span>
            {tFooter('legal.contactLabel')} <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </span>
        </div>
      </div>
    </main>
  );
}
