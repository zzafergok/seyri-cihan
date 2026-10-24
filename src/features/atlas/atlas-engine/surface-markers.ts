import type {
  BoundaryGeometry,
  HistoricalEvent,
  Territory,
} from '@/features/atlas/domain';
import { clockwiseExterior } from '@/features/atlas/atlas-engine/spherical-geometry';

export const LAND_ALTITUDE = 0.003;
export const BOUNDARY_ALTITUDE = 0.012;
export const EVENT_RELIEF = LAND_ALTITUDE * 0.18;
export const EVENT_CORE_RELIEF = LAND_ALTITUDE * 0.14;
export const SURFACE_OFFSET = 0.0001;
const EARTH_RADIUS_KM = 6371;

export type SurfaceMarker = {
  event: HistoricalEvent;
  layer: 'area' | 'core';
  altitude: number;
  geometry: { type: 'Polygon'; coordinates: number[][][] };
};

function containsRing(lat: number, lng: number, ring: number[][]) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
    )
      inside = !inside;
  }
  return inside;
}

function contains(lat: number, lng: number, geometry: BoundaryGeometry) {
  const polygons =
    geometry.type === 'MultiPolygon'
      ? geometry.coordinates
      : [geometry.coordinates];
  return polygons.some(
    ([outer, ...holes]) =>
      containsRing(lat, lng, outer) &&
      !holes.some((hole) => containsRing(lat, lng, hole)),
  );
}

function eventSupportAltitude(
  event: HistoricalEvent,
  territories: Territory[],
) {
  const { lat, lng } = event.location;
  return territories.some((item) => contains(lat, lng, item.geometry))
    ? BOUNDARY_ALTITUDE
    : LAND_ALTITUDE;
}

export function eventSurfaceAltitude(
  event: HistoricalEvent,
  territories: Territory[],
) {
  return (
    eventSupportAltitude(event, territories) + EVENT_RELIEF + SURFACE_OFFSET
  );
}

function hash(value: string) {
  return [...value].reduce(
    (result, character) => (result * 31 + character.charCodeAt(0)) >>> 0,
    2166136261,
  );
}

function destination(
  latDegrees: number,
  lngDegrees: number,
  distanceKm: number,
  bearingDegrees: number,
) {
  const lat = (latDegrees * Math.PI) / 180;
  const lng = (lngDegrees * Math.PI) / 180;
  const bearing = (bearingDegrees * Math.PI) / 180;
  const distance = distanceKm / EARTH_RADIUS_KM;
  const nextLat = Math.asin(
    Math.sin(lat) * Math.cos(distance) +
      Math.cos(lat) * Math.sin(distance) * Math.cos(bearing),
  );
  const nextLng =
    lng +
    Math.atan2(
      Math.sin(bearing) * Math.sin(distance) * Math.cos(lat),
      Math.cos(distance) - Math.sin(lat) * Math.sin(nextLat),
    );
  return [
    (((nextLng * 180) / Math.PI + 540) % 360) - 180,
    (nextLat * 180) / Math.PI,
  ];
}

function organicRing(
  event: HistoricalEvent,
  scale: number,
  layerPhase: number,
  vertices: number,
  roughnessScale = 1,
) {
  const footprint = event.location.footprint;
  const phase = ((hash(event.id) % 360) * Math.PI) / 180 + layerPhase;
  const ring = Array.from({ length: vertices }, (_, index) => {
    const angle = (index / vertices) * Math.PI * 2;
    const irregularity =
      1 +
      footprint.roughness *
        roughnessScale *
        (0.5 * Math.sin(3 * angle + phase) +
          0.3 * Math.sin(5 * angle - phase * 0.7) +
          0.2 * Math.cos(7 * angle + phase * 1.3));
    const ellipse =
      1 /
      Math.sqrt(
        Math.cos(angle) ** 2 / footprint.elongation ** 2 + Math.sin(angle) ** 2,
      );
    return destination(
      event.location.lat,
      event.location.lng,
      footprint.radiusKm * scale * ellipse * irregularity,
      footprint.bearing + (angle * 180) / Math.PI,
    );
  });
  ring.push([...ring[0]]);
  return clockwiseExterior([ring]);
}

/** Source-informed reading footprint plus an optional selected inner relief. */
export function surfaceMarkers(
  event: HistoricalEvent,
  selected: boolean,
  territories: Territory[],
): SurfaceMarker[] {
  const areaAltitude = eventSurfaceAltitude(event, territories);
  const markers: SurfaceMarker[] = [
    {
      event,
      layer: 'area',
      altitude: areaAltitude,
      geometry: {
        type: 'Polygon',
        coordinates: organicRing(event, 1, 0, 32),
      },
    },
  ];
  if (selected) {
    markers.push({
      event,
      layer: 'core',
      altitude: areaAltitude + EVENT_CORE_RELIEF,
      geometry: {
        type: 'Polygon',
        coordinates: organicRing(event, 0.5, 0.85, 24, 1.35),
      },
    });
  }
  return markers;
}
