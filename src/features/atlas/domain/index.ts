import type { AtlasLocale, Localized } from '@/features/atlas/domain/types';

export type {
  AtlasLocale,
  Localized,
  HistoricalEvent,
  EventFootprint,
  HistoricalSource,
  Period,
  Territory,
  BoundaryGeometry,
} from '@/features/atlas/domain/types';
export {
  atlasDatasetSchema,
  historicalEventSchema,
  territorySchema,
} from '@/features/atlas/domain/schemas';

export const MIN_YEAR = 552;
export const MAX_YEAR = 1923;
export const DEFAULT_YEAR = 1453;

export function localized<T>(value: Localized<T>, locale: AtlasLocale): T {
  return value[locale];
}

export function formatYear(year: number, locale: AtlasLocale = 'tr'): string {
  if (!Number.isInteger(year) || year === 0) {
    throw new RangeError('Historical years must be nonzero integers.');
  }
  return year < 0
    ? `${locale === 'tr' ? 'MÖ' : 'BCE'} ${Math.abs(year)}`
    : String(year);
}
