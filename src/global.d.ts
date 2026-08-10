import type { routing } from '@/i18n/routing';
import type messages from '../messages/ru.json';

/**
 * Типизация next-intl. Делает ключи переводов проверяемыми: опечатка или
 * забытый ключ становятся ошибкой сборки, а не строкой MISSING_MESSAGE
 * в логе. Эталон — русский файл, английский обязан повторять его структуру.
 */
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
