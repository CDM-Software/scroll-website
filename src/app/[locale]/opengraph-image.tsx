import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

import { routing } from '@/i18n/routing';
import { SITE_NAME, SITE_URL } from '@/lib/site';

/** Прибивает картинку к билду: иначе fs-чтение иконки уедет в serverless-рантайм. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${SITE_NAME} — the tabletop RPG platform`;

/** Текст держим латиницей: дефолтный шрифт ImageResponse не покрывает кириллицу. */
const TAGLINE = 'Tabletop RPG platform';

async function readIconDataUri() {
  const file = await readFile(join(process.cwd(), 'src/app/icon.png'));
  return `data:image/png;base64,${file.toString('base64')}`;
}

export default async function OpengraphImage() {
  const icon = await readIconDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 44,
          background: '#000000',
        }}
      >
        <img
          src={icon}
          width={224}
          height={224}
          alt=""
          style={{ borderRadius: 48, border: '1px solid #27272a' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 88, fontWeight: 700, color: '#fafafa', letterSpacing: -3 }}>
            {SITE_NAME}
          </div>
          <div style={{ fontSize: 34, color: '#a1a1aa' }}>{TAGLINE}</div>
          <div style={{ fontSize: 26, color: '#22c55e' }}>{new URL(SITE_URL).host}</div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 10,
            background: '#15803d',
          }}
        />
      </div>
    ),
    size,
  );
}
