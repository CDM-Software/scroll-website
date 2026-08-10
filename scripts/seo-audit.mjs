/**
 * SEO-аудит собранных страниц. Запускать после `npm run build`:
 *   node scripts/seo-audit.mjs
 *
 * Разбирает пререндеренный HTML из .next/server/app и проверяет то, что можно
 * проверить статически. Падает с кодом 1, если найдены ошибки; предупреждения
 * код возврата не меняют. Правила и обоснования — в docs/SEO.md.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const BUILD_DIR = '.next/server/app';
const SKIP = ['_not-found.html', '_global-error.html'];

const TITLE_MAX = 60;
const DESCRIPTION_MIN = 70;
const DESCRIPTION_MAX = 160;

const errors = [];
const warnings = [];

function collectPages(dir, pages = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) collectPages(path, pages);
    else if (entry.name.endsWith('.html') && !SKIP.includes(entry.name)) pages.push(path);
  }
  return pages;
}

function decode(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function attr(html, pattern) {
  const match = html.match(pattern);
  return match ? decode(match[1]) : null;
}

function checkMetadata(page, html) {
  const title = attr(html, /<title>([^<]*)<\/title>/);
  if (!title) errors.push(`${page}: нет <title>`);
  else if (title.length > TITLE_MAX)
    warnings.push(`${page}: title ${title.length} симв. — длиннее ${TITLE_MAX}, обрежется в выдаче`);

  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  if (!description) errors.push(`${page}: нет meta description`);
  else if (description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX)
    warnings.push(
      `${page}: description ${description.length} симв. — вне диапазона ${DESCRIPTION_MIN}–${DESCRIPTION_MAX}`,
    );

  if (!/<link rel="canonical"/.test(html)) errors.push(`${page}: нет canonical`);
  if (!/hrefLang="x-default"/i.test(html)) errors.push(`${page}: нет hreflang x-default`);
  if (!/<meta property="og:image"/.test(html)) errors.push(`${page}: нет og:image`);
  if (!/<meta property="og:title"/.test(html)) errors.push(`${page}: нет og:title`);

  const lang = attr(html, /<html[^>]*lang="([^"]*)"/);
  if (!lang) errors.push(`${page}: у <html> нет атрибута lang`);
}

function checkHeadings(page, html) {
  const h1 = html.match(/<h1[^>]*>/g) ?? [];
  if (h1.length === 0) errors.push(`${page}: нет h1`);
  if (h1.length > 1) errors.push(`${page}: ${h1.length} тегов h1, должен быть ровно один`);

  const levels = [...html.matchAll(/<h([1-6])[^>]*>/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] - levels[i - 1] > 1) {
      warnings.push(`${page}: разрыв в иерархии заголовков — h${levels[i - 1]} → h${levels[i]}`);
      break;
    }
  }
}

function checkImages(page, html) {
  for (const img of html.match(/<img[^>]*>/g) ?? []) {
    const alt = img.match(/alt="([^"]*)"/);
    if (!alt) errors.push(`${page}: <img> без атрибута alt`);
    else if (!alt[1].trim() && !/aria-hidden|role="presentation"/.test(img))
      warnings.push(`${page}: <img> с пустым alt и без aria-hidden`);
  }
}

function checkLinks(page, html) {
  const placeholders = (html.match(/href="#"/g) ?? []).length;
  if (placeholders) warnings.push(`${page}: ${placeholders} ссылок-заглушек href="#"`);

  for (const [, href, inner] of html.matchAll(/<a [^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gs)) {
    if (!inner.replace(/<[^>]+>/g, '').trim() && !/aria-label=/.test(inner))
      warnings.push(`${page}: ссылка без текста и aria-label — ${href}`);
  }
}

function checkStructuredData(page, html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  if (blocks.length === 0) {
    warnings.push(`${page}: нет структурированных данных JSON-LD`);
    return;
  }

  for (const [, raw] of blocks) {
    try {
      const parsed = JSON.parse(raw.replace(/\\u003c/g, '<'));
      if (!parsed['@context'] || !parsed['@type'])
        errors.push(`${page}: в JSON-LD нет @context или @type`);
    } catch {
      errors.push(`${page}: JSON-LD не парсится`);
    }
  }
}

if (!existsSync(BUILD_DIR)) {
  console.error(`Нет каталога ${BUILD_DIR}. Сначала выполните: npm run build`);
  process.exit(1);
}

const pages = collectPages(BUILD_DIR);
for (const page of pages) {
  const html = readFileSync(page, 'utf-8');
  const label = page.replace(`${BUILD_DIR}/`, '').replace(/\.html$/, '');
  checkMetadata(label, html);
  checkHeadings(label, html);
  checkImages(label, html);
  checkLinks(label, html);
  checkStructuredData(label, html);
}

console.log(`Проверено страниц: ${pages.length}`);
for (const warning of warnings) console.log(`  ⚠ ${warning}`);
for (const error of errors) console.log(`  ✗ ${error}`);

if (errors.length) {
  console.log(`\nОшибок: ${errors.length}, предупреждений: ${warnings.length}`);
  process.exit(1);
}
console.log(`\nОшибок нет, предупреждений: ${warnings.length}`);
