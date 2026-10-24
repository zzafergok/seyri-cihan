import type { Locale } from '@/i18n/routing';
import tr from '@/features/routes/public/archive/locales/tr.json';
import en from '@/features/routes/public/archive/locales/en.json';

export const archiveCopy = (locale: Locale) => (locale === 'tr' ? tr : en);
