'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';

const position = z.tuple([
  z.number().min(-180).max(180),
  z.number().min(-90).max(90),
]);
const polygon = z.array(z.array(position));
const geometry = z.discriminatedUnion('type', [
  z.object({ type: z.literal('Polygon'), coordinates: polygon }),
  z.object({ type: z.literal('MultiPolygon'), coordinates: z.array(polygon) }),
]);
const landSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(z.object({ type: z.literal('Feature'), geometry })),
});

export type LandFeature = z.infer<typeof landSchema>['features'][number];

export function useLand(onFailure: () => void) {
  const [land, setLand] = useState<LandFeature[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch('/data/atlas-land.json', {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Land data unavailable');
        const value: unknown = await response.json();
        setLand(landSchema.parse(value).features);
      } catch {
        if (!controller.signal.aborted) onFailure();
      }
    }
    void load();
    return () => controller.abort();
  }, [onFailure]);
  return land;
}
