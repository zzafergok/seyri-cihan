import { z } from 'zod';
import { events } from '@/features/atlas/data';
import { DEFAULT_YEAR, MAX_YEAR, MIN_YEAR } from '@/features/atlas/domain';

const yearSchema = z.coerce.number().int().min(MIN_YEAR).max(MAX_YEAR);
export type AtlasLocation = { year: number; eventId?: string };

export function parseAtlasLocation(params: URLSearchParams): AtlasLocation {
  const selected = events.find((event) => event.slug === params.get('event'));
  const yearResult = yearSchema.safeParse(params.get('year'));
  const year = yearResult.success
    ? yearResult.data
    : (selected?.year ?? DEFAULT_YEAR);
  const event =
    selected?.year === year
      ? selected
      : events.find((item) => item.year === year);
  return { year, eventId: event?.id };
}

export function atlasSearch(location: AtlasLocation): string {
  const params = new URLSearchParams({ year: String(location.year) });
  const event = events.find(
    (item) => item.id === location.eventId && item.year === location.year,
  );
  if (event) params.set('event', event.slug);
  return params.toString();
}
