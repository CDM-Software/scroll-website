import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

import { routing } from '@/i18n/routing';
import { SITE_NAME, SITE_URL } from '@/lib/site';

/** Прибивает картинку к билду: иначе fs-чтение ассетов уедет в serverless-рантайм. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${SITE_NAME} — the tabletop RPG platform`;

/** Текст держим латиницей: дефолтный шрифт ImageResponse не покрывает кириллицу. */
const TAGLINE = 'Find a party, apply to a game, play with verified GMs';

async function readAssetDataUri(relativePath: string) {
  const file = await readFile(join(process.cwd(), relativePath));
  return `data:image/png;base64,${file.toString('base64')}`;
}

export default async function OpengraphImage() {
  const [icon, screen] = await Promise.all([
    readAssetDataUri('src/app/icon.png'),
    readAssetDataUri('public/screens/feed.png'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#000000',
        }}
      >
        {/* Зелёное свечение бренда из-под скриншота. */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -120,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(34,197,94,0.22) 0%, rgba(0,0,0,0) 70%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 28,
            width: 700,
            padding: '0 0 0 76px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <img
              src={icon}
              width={96}
              height={96}
              alt=""
              style={{ borderRadius: 22, border: '1px solid #27272a' }}
            />
            <div style={{ fontSize: 78, fontWeight: 700, color: '#fafafa', letterSpacing: -3 }}>
              {SITE_NAME}
            </div>
          </div>

          <div style={{ fontSize: 34, lineHeight: 1.35, color: '#d4d4d4' }}>{TAGLINE}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: '#22c55e' }} />
            <div style={{ fontSize: 26, color: '#22c55e' }}>{new URL(SITE_URL).host}</div>
          </div>
        </div>

        {/* Экран приложения уходит за нижний край — намекает на продолжение ленты. */}
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', paddingTop: 72 }}>
          <img
            src={screen}
            width={380}
            height={826}
            alt=""
            style={{ borderRadius: 36, border: '1px solid #27272a' }}
          />
        </div>
      </div>
    ),
    size,
  );
}
