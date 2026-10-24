import { expect, it } from 'vitest';
import { clockwiseExterior } from '@/features/atlas/atlas-engine/spherical-geometry';

it('converts GeoJSON exterior and hole winding for a spherical renderer without mutating source geometry', () => {
  const exterior = [
    [24, 30],
    [39, 30],
    [39, 44],
    [24, 44],
    [24, 30],
  ];
  const hole = [
    [27, 33],
    [27, 36],
    [30, 36],
    [30, 33],
    [27, 33],
  ];
  const rings = [exterior, hole];
  const original = JSON.stringify(rings);
  expect(clockwiseExterior(rings)).toEqual([
    [...exterior].reverse(),
    [...hole].reverse(),
  ]);
  expect(JSON.stringify(rings)).toBe(original);
  expect(clockwiseExterior(clockwiseExterior(rings))).toEqual(
    clockwiseExterior(rings),
  );
});
