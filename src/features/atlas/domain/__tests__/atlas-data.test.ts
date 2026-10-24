import { describe, expect, it } from 'vitest';
import {
  events,
  periods,
  sources,
  territories,
  findEvent,
  getEventsForYear,
  getPeriodForYear,
  getTerritoriesForYear,
} from '@/features/atlas/data';
import {
  atlasDatasetSchema,
  DEFAULT_YEAR,
  formatYear,
  localized,
  MAX_YEAR,
  MIN_YEAR,
  territorySchema,
} from '@/features/atlas/domain';

const dataset = { events, periods, sources, territories };

describe('historical atlas data', () => {
  it('validates the curated dataset and covers every selectable year with exactly one chapter', () => {
    expect(atlasDatasetSchema.safeParse(dataset).success).toBe(true);
    for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
      expect(
        periods.filter(
          (period) => year >= period.startYear && year <= period.endYear,
        ),
      ).toHaveLength(1);
    }
    expect(events[0].year).toBe(MIN_YEAR);
    expect(events.at(-1)?.year).toBe(MAX_YEAR);
  });

  it('does not silently substitute nearby events for empty years', () => {
    expect(getEventsForYear(DEFAULT_YEAR).map((event) => event.id)).toEqual([
      'istanbul-1453',
    ]);
    expect(getEventsForYear(1454)).toEqual([]);
    expect(findEvent('istanbulun-fethi')?.year).toBe(1453);
    expect(findEvent('missing')).toBeUndefined();
    expect(getPeriodForYear(MIN_YEAR - 1)).toBeUndefined();
    expect(getPeriodForYear(MAX_YEAR + 1)).toBeUndefined();
  });

  it('only exposes sourced January 1 boundaries inside the reviewed pilot', () => {
    expect(getTerritoriesForYear(1453)).toEqual([]);
    expect(getTerritoriesForYear(1885)).toEqual([]);
    expect(getTerritoriesForYear(1915)).toEqual([]);
    for (let year = 1886; year <= 1914; year++) {
      const matches = getTerritoriesForYear(year);
      expect(matches).toHaveLength(1);
      expect(matches[0].validFrom <= `${year}-01-01`).toBe(true);
      expect(matches[0].validTo >= `${year}-01-01`).toBe(true);
    }
    expect(getTerritoriesForYear(1912)).toEqual(getTerritoriesForYear(1886));
    expect(getTerritoriesForYear(1913)).not.toEqual(
      getTerritoriesForYear(1912),
    );
    expect(getTerritoriesForYear(1914)).not.toEqual(
      getTerritoriesForYear(1913),
    );
    expect(getTerritoriesForYear(MAX_YEAR + 1)).toEqual([]);
    expect(
      territories.every(
        (territory) =>
          territory.status === 'generalized' &&
          territory.sourceId === 'cshapes-2',
      ),
    ).toBe(true);
  });

  it('rejects missing evidence and unknown chapter references', () => {
    expect(
      atlasDatasetSchema.safeParse({
        ...dataset,
        events: [{ ...events[0], sourceIds: ['missing'] }],
      }).success,
    ).toBe(false);
    expect(
      atlasDatasetSchema.safeParse({
        ...dataset,
        events: [{ ...events[0], sourceIds: [] }],
      }).success,
    ).toBe(false);
    expect(
      atlasDatasetSchema.safeParse({
        ...dataset,
        events: [{ ...events[0], periodId: 'missing' }],
      }).success,
    ).toBe(false);
  });

  it('rejects duplicate permalink slugs, impossible coordinates and mismatched chronology', () => {
    expect(
      atlasDatasetSchema.safeParse({
        ...dataset,
        events: [events[0], { ...events[1], slug: events[0].slug }],
      }).success,
    ).toBe(false);
    expect(
      atlasDatasetSchema.safeParse({
        ...dataset,
        events: [
          { ...events[0], location: { ...events[0].location, lat: 91 } },
        ],
      }).success,
    ).toBe(false);
    expect(
      atlasDatasetSchema.safeParse({
        ...dataset,
        events: [{ ...events[0], year: 1923 }],
      }).success,
    ).toBe(false);
    expect(
      atlasDatasetSchema.safeParse({
        ...dataset,
        periods: [{ ...periods[0], endYear: 744 }, ...periods.slice(1)],
      }).success,
    ).toBe(false);
  });

  it('rejects open, empty-area and out-of-range polygons', () => {
    const territory = territories[0];
    for (const coordinates of [
      [
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
        ],
      ],
      [
        [
          [0, 0],
          [1, 1],
          [2, 2],
          [0, 0],
        ],
      ],
      [
        [
          [181, 0],
          [1, 0],
          [1, 1],
          [181, 0],
        ],
      ],
    ]) {
      expect(
        territorySchema.safeParse({
          ...territory,
          geometry: { type: 'Polygon', coordinates },
        }).success,
      ).toBe(false);
    }
  });
});

describe('historical date presentation', () => {
  it('preserves BCE dates and disallows year zero or non-integer dates', () => {
    expect(formatYear(-1)).toBe('MÖ 1');
    expect(formatYear(-1, 'en')).toBe('BCE 1');
    expect(formatYear(1453)).toBe('1453');
    expect(() => formatYear(0)).toThrow(RangeError);
    expect(() => formatYear(1.5)).toThrow(RangeError);
    expect(() => formatYear(NaN)).toThrow(RangeError);
    expect(localized({ tr: 'Tarih', en: 'History' }, 'en')).toBe('History');
  });
});
