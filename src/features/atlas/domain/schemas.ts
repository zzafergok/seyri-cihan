import { z } from 'zod';

const text = z.string().trim().min(1);
const translated = z.object({ tr: text, en: text });
const translatedList = z.object({
  tr: z.array(text).min(1),
  en: z.array(text).min(1),
});
const year = z
  .number()
  .int()
  .refine((value) => value !== 0, 'There is no year zero.');
const identifier = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const interval = { startYear: year, endYear: year };

export const historicalEventSchema = z.object({
  id: identifier,
  slug: identifier,
  year,
  title: translated,
  summary: translated,
  body: translated,
  consequences: translatedList,
  category: z.enum(['state', 'battle', 'culture', 'diplomacy']),
  periodId: identifier,
  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    name: translated,
    footprint: z.object({
      radiusKm: z.number().min(3).max(150),
      elongation: z.number().min(1).max(2.5),
      bearing: z.number().min(0).max(359),
      roughness: z.number().min(0.05).max(0.35),
      basis: translated,
    }),
  }),
  actors: translatedList,
  sourceIds: z.array(identifier).min(1),
});

const periodSchema = z
  .object({
    id: identifier,
    title: translated,
    ...interval,
    color: z.string().regex(/^#[0-9a-f]{6}$/i),
  })
  .refine(
    (value) => value.startYear <= value.endYear,
    'Invalid period interval.',
  );

const position = z.tuple([
  z.number().min(-180).max(180),
  z.number().min(-90).max(90),
]);
const ring = z
  .array(position)
  .min(4)
  .refine((points) => {
    const first = points[0];
    const last = points.at(-1);
    return first?.[0] === last?.[0] && first?.[1] === last?.[1];
  }, 'GeoJSON rings must be closed.')
  .refine((points) => {
    let area = 0;
    for (let index = 1; index < points.length; index++) {
      const previous = points[index - 1];
      const current = points[index];
      area += previous[0] * current[1] - current[0] * previous[1];
    }
    return Math.abs(area) > 0;
  }, 'Polygon must have a nonzero area.');

export const territorySchema = z
  .object({
    id: identifier,
    periodId: identifier,
    name: translated,
    ...interval,
    geometry: z.discriminatedUnion('type', [
      z.object({
        type: z.literal('Polygon'),
        coordinates: z.array(ring).min(1),
      }),
      z.object({
        type: z.literal('MultiPolygon'),
        coordinates: z.array(z.array(ring).min(1)).min(1),
      }),
    ]),
    note: translated,
    status: z.literal('generalized'),
    sourceId: identifier,
    validFrom: z.string().date(),
    validTo: z.string().date(),
  })
  .refine(
    (value) =>
      value.startYear <= value.endYear &&
      value.validFrom <= `${value.startYear}-01-01` &&
      value.validTo >= `${value.endYear}-01-01`,
    'Invalid territory interval.',
  );

const sourceSchema = z.object({
  id: identifier,
  title: text,
  publisher: text,
  url: z
    .string()
    .url()
    .refine((url) => url.startsWith('https://'), 'Sources require HTTPS.'),
});

export const atlasDatasetSchema = z
  .object({
    events: z.array(historicalEventSchema).min(1),
    periods: z.array(periodSchema).min(1),
    sources: z.array(sourceSchema).min(1),
    territories: z.array(territorySchema),
  })
  .superRefine((dataset, context) => {
    const issue = (message: string) =>
      context.addIssue({ code: z.ZodIssueCode.custom, message });
    for (const [key, records] of Object.entries(dataset)) {
      if (new Set(records.map((record) => record.id)).size !== records.length)
        issue(`Duplicate IDs: ${key}`);
    }
    if (
      new Set(dataset.events.map((event) => event.slug)).size !==
      dataset.events.length
    )
      issue('Duplicate event slugs.');
    const sourceIds = new Set(dataset.sources.map((source) => source.id));
    const periods = new Map(
      dataset.periods.map((period) => [period.id, period]),
    );
    for (const event of dataset.events) {
      const period = periods.get(event.periodId);
      if (
        !period ||
        event.year < period.startYear ||
        event.year > period.endYear
      )
        issue(`Invalid event period: ${event.id}`);
      if (event.sourceIds.some((id) => !sourceIds.has(id)))
        issue(`Unknown source: ${event.id}`);
      if (new Set(event.sourceIds).size !== event.sourceIds.length)
        issue(`Duplicate sources: ${event.id}`);
    }
    for (const territory of dataset.territories) {
      if (!sourceIds.has(territory.sourceId))
        issue(`Unknown boundary source: ${territory.id}`);
      const period = periods.get(territory.periodId);
      if (
        !period ||
        territory.startYear < period.startYear ||
        territory.endYear > period.endYear
      )
        issue(`Invalid territory period: ${territory.id}`);
    }
    const ordered = [...dataset.periods].sort(
      (a, b) => a.startYear - b.startYear,
    );
    for (let index = 1; index < ordered.length; index++) {
      if (ordered[index].startYear !== ordered[index - 1].endYear + 1)
        issue('Editorial periods must be contiguous and non-overlapping.');
    }
  });
