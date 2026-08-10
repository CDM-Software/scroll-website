# ScRoll — сайт продукта

Промо-сайт платформы для настольных ролевых игр **ScRoll**. Одностраничный
лендинг на двух языках плюс правовые страницы. Прод: **https://www.circleofdms.com**

Для работы с ИИ-агентами в этом репозитории есть отдельный файл правил —
[CLAUDE.md](CLAUDE.md). Прочитайте его, если пишете код через агента.

---

## Стек

| Что | Версия | Зачем |
|---|---|---|
| Next.js | 16.2.12 | App Router, сборка через Turbopack |
| React | 19.2.4 | |
| next-intl | ^4.13.4 | локализация ru/en, локале-осознанная навигация |
| Tailwind CSS | v4 | только токены через `@theme`, утилиты почти не используются |
| TypeScript | ^5 | strict |
| geist | ^1.7.2 | шрифты Geist Sans / Mono через `next/font` |

Node: на Vercel собирается на **24.x**, локально проверено на 22.14. Поле
`engines` в `package.json` не задано.

## Быстрый старт

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # прод-сборка, она же проверка типов
npm run lint     # eslint
```

Отдельного `typecheck` нет — типы проверяет `next build`. Перед коммитом
прогоняйте **и `build`, и `lint`**: они ловят разные вещи.

## Структура

```
src/
  app/
    [locale]/
      layout.tsx            корневой layout + generateMetadata для всего сайта
      page.tsx              лендинг (композиция секций)
      opengraph-image.tsx   генерация OG-картинки 1200×630 на билде
      privacy/page.tsx      политика конфиденциальности
      terms/page.tsx        условия использования
    globals.css             дизайн-токены в @theme + базовые стили
    landing.css             стили лендинга, портированы 1:1 из макета
    legal.css               стили правовых страниц
    robots.ts, sitemap.ts   генерируются из SITE_URL
    favicon.ico, icon.png, apple-icon.png
  components/
    landing/sections.tsx    все секции лендинга одним файлом
    landing/Rise.tsx        появление по скроллу (единственный 'use client')
    landing/Screenshot.tsx  обёртка next/image для скринов приложения
    legal/LegalDocument.tsx разметка правового документа
  i18n/
    routing.ts              локали, дефолтная, схема префиксов
    navigation.ts           Link/redirect/usePathname — использовать ВМЕСТО next/link
    request.ts              загрузка messages
  lib/
    site.ts                 SITE_URL, SITE_NAME, SITE_PUBLISHER
    legal.ts                метаданные правовых страниц
  middleware.ts             next-intl middleware + matcher

messages/ru.json, messages/en.json   — весь текст сайта
public/screens/*.png                 — скрины приложения из Figma (2x)
assets/app-icon.png                  — исходник иконки 1024×1024
docs/                                — продуктовый контекст и дизайн-модель
design-system/                       — выгрузка дизайн-системы (HTML-превью)
```

## Локализация

Русский живёт на корне, английский — с префиксом:

| Локаль | Лендинг | Политика | Условия |
|---|---|---|---|
| ru (дефолт) | `/` | `/privacy` | `/terms` |
| en | `/en` | `/en/privacy` | `/en/terms` |

Это `localePrefix: 'as-needed'` в `src/i18n/routing.ts`. Префикс `/ru/...`
существует, но middleware редиректит его на путь без префикса.

**Определение языка включено** (`localeDetection` по умолчанию `true`): заход
на `/` с `Accept-Language: en` редиректит на `/en`. Из-за этого краулер Telegram
показывает превью ссылки на английском. Это осознанное решение; выключается
одной строкой `localeDetection: false` в `routing.ts`.

Весь текст — в `messages/ru.json` и `messages/en.json`. Хардкодить строки
в компонентах нельзя. Ключи должны существовать в обоих файлах, причём забыть
ключ легко: сборка на этом **не падает**, она завершается успешно и лишь пишет
`MISSING_MESSAGE` в лог. После правки переводов проверяйте
`npm run build 2>&1 | grep -i MISSING_MESSAGE`.

## Стили

Три слоя, не смешивать:

1. **`globals.css`** — дизайн-токены ScRoll в блоке `@theme`, синхронизированы
   с `docs/DESIGN-MODEL.md` (источник — `mobile/src/theme` в монорепо продукта).
   Сайт тёмный, светлой темы нет.
2. **`landing.css`** — стили лендинга, перенесены один в один из утверждённого
   макета Claude Design. В начале файла шорткаты (`--t1`, `--acc`, `--bd`…),
   которые алиасят глобальные токены — так CSS остаётся сравнимым с макетом.
3. **`legal.css`** — правовые страницы, опираются напрямую на `--color-*`.

Цвета хардкодить нельзя, только токены.

## SEO и метаданные

- **`src/lib/site.ts`** — единственное место, где задан адрес сайта.
  Дефолт `https://www.circleofdms.com`, переопределяется переменной
  `NEXT_PUBLIC_SITE_URL`. Отсюда берутся `metadataBase`, canonical, hreflang,
  `sitemap.xml` и `robots.txt`.
- **`opengraph-image.tsx`** генерирует карточку 1200×630 (иконка, название,
  описание, домен, скрин приложения) на этапе сборки. `generateStaticParams`
  обязателен: без него роут станет динамическим, а чтение ассетов через `fs`
  уедет в serverless-рантайм, где файлов может не быть.
- Текст на OG-картинке **только латиницей** — дефолтный шрифт `ImageResponse`
  не покрывает кириллицу, вместо букв будут квадраты.
- Иконки собраны из `assets/app-icon.png` через `sips`, теги проставляет
  файловая конвенция Next.

## Правовые страницы

`/privacy` и `/terms`. Текст лежит в `messages/*.json` (`legal.privacy`,
`legal.terms`), разметку рисует общий `LegalDocument`, метаданные собирает
`buildLegalMetadata`. Реквизиты юрлица берутся из `footer.legal`, чтобы адрес
и почта не разъезжались между футером и документами.

> **Внимание.** Тексты шаблонные и юристом не проверялись. Часть утверждений —
> предположения, а не факты о продукте: возраст 16+, аналитические cookies,
> комиссия сервиса, правила возврата, модерация всех игр, удаление данных
> за 30 дней. Право штата Вайоминг выведено из адреса регистрации
> CDM Software LLC. Перед серьёзным запуском вычитайте с юристом.

## Деплой

| Что | Значение |
|---|---|
| Хостинг | Vercel |
| Аккаунт | `demesne-1229` |
| Команда | `CircleOfdDMs' projects` (`circleofddms-projects`) |
| Проект | `scroll-website` (`prj_CHFb0up6OH0nPsC0lXEJVyZnuKZr`) |
| Репозиторий | `CDM-Software/scroll-website` |
| Продакшн-ветка | `main` |

**GitHub-интеграция включена: пуш в `main` сразу катится в продакшн.** Пул-реквесты
получают preview-деплой. Отдельного стейджинга нет.

Локальная папка не залинкована (`.vercel/project.json` отсутствует), поэтому
CLI-командам нужен скоуп:

```bash
vercel projects ls --scope circleofddms-projects
vercel domains inspect circleofdms.com --scope circleofddms-projects
```

## Домен и DNS

Домен `circleofdms.com` куплен на **squarespace.com**, нейм-серверы остались
`ns-cloud-a{1..4}.googledomains.com`. DNS управляется у регистратора, на Vercel
нейм-серверы **не переносили** — на домене живёт рабочая почта Google Workspace.

Записи в Squarespace → Domains → circleofdms.com → DNS → DNS Settings:

| Тип | Host | Значение |
|---|---|---|
| `A` | `@` | `216.198.79.1` |
| `A` | `@` | `64.29.17.1` |
| `CNAME` | `www` | `4f85ac78978822ab.vercel-dns-017.com` |

CNAME персональный для аккаунта Vercel, не общий `cname.vercel-dns.com`.

**Не трогать:** `MX → smtp.google.com`, `TXT` с SPF и `google-site-verification`.
Это почта Google Workspace, она отвалится.

В Vercel `www.circleofdms.com` подключён к Production, а apex `circleofdms.com`
редиректит на него постоянным редиректом 308.

## Грабли

- **`opengraph-image` исключён из matcher'а middleware** в `src/middleware.ts`.
  Общий фильтр там отсеивает пути с точкой в имени, а у этого роута расширения
  нет — без явного исключения middleware редиректит `/ru/opengraph-image`
  на `/opengraph-image`, краулеры соцсетей за редиректом не идут, и превью
  ссылки остаётся без картинки.
- **Только локале-осознанные `Link` и `redirect`** из `@/i18n/navigation`.
  Обычный `next/link` не подставит префикс локали, и с `/en` ссылка уведёт
  на русскую страницу.
- **Telegram кеширует превью ссылок надолго.** После правки метаданных карточка
  не обновится сама — сбрасывать через бота `@WebpageBot`.
- **`docs/` и `design-system/docs/` — побайтово одинаковые копии.** Правите одну,
  правьте и вторую, либо оставьте одну.

## Связанные материалы

- [docs/PRODUCT-CONTEXT.md](docs/PRODUCT-CONTEXT.md) — что за продукт, аудитория,
  реальные фичи, терминология. Термины обязательны к соблюдению в текстах.
- [docs/DESIGN-MODEL.md](docs/DESIGN-MODEL.md) — палитра, типографика, motion.
  Сайт обязан выглядеть как продолжение приложения.
- [CDM-Software/ScRoll](https://github.com/CDM-Software/ScRoll) — монорепо
  продукта (backend + mobile). Токены сайта производны от `mobile/src/theme/`
  и должны обновляться вслед за ним.
