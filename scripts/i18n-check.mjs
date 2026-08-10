/**
 * Сверяет структуру файлов переводов с эталонной локалью.
 *
 * Типизация next-intl (src/global.d.ts) строится по ru.json, поэтому опечатки
 * в ключах ловит компилятор. А вот расхождение ru и en он не видит: забытый
 * ключ в en.json превратится в MISSING_MESSAGE только в рантайме. Этот скрипт
 * закрывает разрыв.
 */
import { readFileSync } from 'node:fs';

const REFERENCE_LOCALE = 'ru';
const LOCALES = ['ru', 'en'];

function flatten(value, prefix = '') {
  if (Array.isArray(value)) {
    // Массивы сравниваем по длине: порядок элементов несёт смысл (шаги, карточки).
    return { [`${prefix}[]`]: value.length };
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).reduce(
      (acc, [key, nested]) => ({ ...acc, ...flatten(nested, prefix ? `${prefix}.${key}` : key) }),
      {},
    );
  }
  return { [prefix]: typeof value };
}

const reference = flatten(
  JSON.parse(readFileSync(`messages/${REFERENCE_LOCALE}.json`, 'utf-8')),
);
const referenceKeys = Object.keys(reference);

let failed = false;

for (const locale of LOCALES.filter((item) => item !== REFERENCE_LOCALE)) {
  const current = flatten(JSON.parse(readFileSync(`messages/${locale}.json`, 'utf-8')));
  const currentKeys = Object.keys(current);

  const missing = referenceKeys.filter((key) => !(key in current));
  const extra = currentKeys.filter((key) => !(key in reference));
  const mismatched = referenceKeys
    .filter((key) => key in current && current[key] !== reference[key])
    .map((key) => `${key}: ${REFERENCE_LOCALE}=${reference[key]}, ${locale}=${current[key]}`);

  console.log(`${locale}.json — ключей ${currentKeys.length}, эталон ${referenceKeys.length}`);
  for (const key of missing) console.log(`  ✗ отсутствует: ${key}`);
  for (const key of extra) console.log(`  ✗ лишний: ${key}`);
  for (const note of mismatched) console.log(`  ✗ не совпал тип или длина — ${note}`);

  if (missing.length || extra.length || mismatched.length) failed = true;
}

if (failed) {
  console.log('\nФайлы переводов разошлись.');
  process.exit(1);
}
console.log('\nСтруктура переводов совпадает.');
