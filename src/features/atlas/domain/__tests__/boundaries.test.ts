import { describe, expect, it } from 'vitest';
import {
  territories,
  getTerritoriesForYear,
  events,
  periods,
  sources,
} from '@/features/atlas/data';
import {
  atlasDatasetSchema,
  territorySchema,
  type BoundaryGeometry,
} from '@/features/atlas/domain';
import { globeGeometry } from '@/features/atlas/atlas-engine/spherical-geometry';

function inRing([x, y]: number[], ring: number[][]) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
      inside = !inside;
  }
  return inside;
}
function contains(geometry: BoundaryGeometry, position: number[]) {
  const polygons =
    geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  return polygons.some(
    ([exterior, ...holes]) =>
      inRing(position, exterior) &&
      !holes.some((hole) => inRing(position, hole)),
  );
}

describe('source-derived historical boundaries', () => {
  it('preserves source multipart coastlines instead of navigation rectangles', () => {
    expect(territories).toHaveLength(3);
    expect(territories.map((t) => t.geometry.type)).toEqual([
      'MultiPolygon',
      'MultiPolygon',
      'MultiPolygon',
    ]);
    expect(territories.map((t) => t.geometry.coordinates.length)).toEqual([
      26, 25, 12,
    ]);
    const early = getTerritoriesForYear(1886)[0].geometry;
    const late = getTerritoriesForYear(1914)[0].geometry;
    expect(contains(early, [32.85, 39.93])).toBe(true); // Ankara
    expect(contains(late, [32.85, 39.93])).toBe(true);
    expect(contains(early, [13.19, 32.89])).toBe(true); // Tripoli in source's early record
    expect(contains(late, [13.19, 32.89])).toBe(false);
    expect(contains(early, [20, 34])).toBe(false); // Open Mediterranean
  });
  it('adapts every multipart ring without mutating the archived source', () => {
    const before = JSON.stringify(territories[0].geometry);
    const adapted = globeGeometry(territories[0].geometry);
    expect(adapted.type).toBe('MultiPolygon');
    expect(adapted.coordinates).toHaveLength(26);
    expect(JSON.stringify(territories[0].geometry)).toBe(before);
    expect(contains(adapted, [32.85, 39.93])).toBe(true);
  });
  it('rejects source-less boundaries, invalid dates and fabricated coverage', () => {
    const sample = territories[0];
    expect(
      territorySchema.safeParse({ ...sample, sourceId: undefined }).success,
    ).toBe(false);
    expect(
      territorySchema.safeParse({ ...sample, validFrom: '1886-02-31' }).success,
    ).toBe(false);
    expect(
      territorySchema.safeParse({ ...sample, startYear: 1453 }).success,
    ).toBe(false);
    expect(
      territorySchema.safeParse({ ...sample, status: 'schematic' }).success,
    ).toBe(false);
    expect(
      territorySchema.safeParse({
        ...sample,
        geometry: { type: 'MultiPolygon', coordinates: [] },
      }).success,
    ).toBe(false);
    expect(
      atlasDatasetSchema.safeParse({
        events,
        periods,
        sources,
        territories: [{ ...sample, sourceId: 'missing' }],
      }).success,
    ).toBe(false);
  });
});
