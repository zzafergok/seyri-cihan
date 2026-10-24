import tr from '@/features/routes/public/atlas/i18n/tr.json';
import en from '@/features/routes/public/atlas/i18n/en.json';
import type { Locale } from '@/i18n/routing';

export type AtlasCopy = typeof tr;
const dictionaries: Record<Locale, AtlasCopy> = { tr, en };
export const getAtlasCopy = (locale: Locale): AtlasCopy => dictionaries[locale];
