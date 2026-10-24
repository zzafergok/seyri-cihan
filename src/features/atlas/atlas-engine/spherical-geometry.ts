import type { BoundaryGeometry } from '@/features/atlas/domain';

/** D3 spherical polygons use clockwise exterior rings, unlike GeoJSON RFC 7946. */
export function clockwiseExterior(coordinates: number[][][]): number[][][] {
  return coordinates.map((ring, index) => {
    const signedArea = ring
      .slice(1)
      .reduce(
        (area, point, i) =>
          area + ring[i][0] * point[1] - point[0] * ring[i][1],
        0,
      );
    const shouldReverse = index === 0 ? signedArea > 0 : signedArea < 0;
    return shouldReverse ? [...ring].reverse() : ring;
  });
}

export function globeGeometry(geometry: BoundaryGeometry): BoundaryGeometry {
  return geometry.type === 'MultiPolygon'
    ? {
        type: 'MultiPolygon',
        coordinates: geometry.coordinates.map(clockwiseExterior),
      }
    : { type: 'Polygon', coordinates: clockwiseExterior(geometry.coordinates) };
}
