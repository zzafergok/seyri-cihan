import { describe, expect, it } from 'vitest';
import {
  atlasSearch,
  parseAtlasLocation,
} from '@/features/atlas/store/url-state';
import { events } from '@/features/atlas/data';
import tr from '@/features/routes/public/atlas/i18n/tr.json';
import en from '@/features/routes/public/atlas/i18n/en.json';

describe('atlas share links', () => {
  it('roundtrips each event through its stable slug and year', () => {
    for (const event of events) {
      const location = { year: event.year, eventId: event.id };
      const query = atlasSearch(location);
      expect(query).toContain(event.slug);
      expect(parseAtlasLocation(new URLSearchParams(query))).toEqual(location);
    }
  });
  it('rejects invalid years without passing NaN or an out-of-range year to the renderer', () => {
    for (const year of ['0', '-5', 'garbage', '1453.5', '1924', 'Infinity']) {
      expect(parseAtlasLocation(new URLSearchParams({ year })).year).toBe(1453);
    }
  });
  it('does not show a selected event at an unrelated year', () => {
    const result = parseAtlasLocation(
      new URLSearchParams({ year: '1454', event: 'istanbulun-fethi' }),
    );
    expect(result).toEqual({ year: 1454, eventId: undefined });
    expect(atlasSearch({ year: 1454, eventId: 'istanbul-1453' })).toBe(
      'year=1454',
    );
  });
  it('uses the event year when only a known event slug is shared', () => {
    expect(
      parseAtlasLocation(new URLSearchParams({ event: events[0].slug })).year,
    ).toBe(events[0].year);
  });
  it('keeps atlas interface translations structurally aligned', () => {
    expect(Object.keys(tr).sort()).toEqual(Object.keys(en).sort());
  });
});
