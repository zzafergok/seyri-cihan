import { earlyEvents } from '@/features/atlas/data/events-early';
import { medievalEvents } from '@/features/atlas/data/events-medieval';
import { modernEvents } from '@/features/atlas/data/events-modern';
import { periods } from '@/features/atlas/data/periods';
import { sources } from '@/features/atlas/data/sources';
import { territories } from '@/features/atlas/data/territories';
import { atlasDatasetSchema } from '@/features/atlas/domain/schemas';

// Validation runs for the shared static dataset on both build and first import.
const dataset = atlasDatasetSchema.parse({
  events: [...earlyEvents, ...medievalEvents, ...modernEvents].sort(
    (a, b) => a.year - b.year,
  ),
  periods,
  sources,
  territories,
});

export const events = dataset.events;
export { periods, sources, territories };

export function getEventsForYear(year: number) {
  return events.filter((event) => event.year === year);
}

export function getPeriodForYear(year: number) {
  return periods.find(
    (period) => year >= period.startYear && year <= period.endYear,
  );
}

export function getTerritoriesForYear(year: number) {
  return territories.filter(
    (territory) => year >= territory.startYear && year <= territory.endYear,
  );
}

export function findEvent(slug: string) {
  return events.find((event) => event.slug === slug);
}
