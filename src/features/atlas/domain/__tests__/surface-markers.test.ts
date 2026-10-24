import { describe, expect, it } from 'vitest';
import { events, getTerritoriesForYear } from '@/features/atlas/data';
import {
  LAND_ALTITUDE,
  BOUNDARY_ALTITUDE,
  SURFACE_OFFSET,
  EVENT_RELIEF,
  EVENT_CORE_RELIEF,
  surfaceMarkers,
} from '@/features/atlas/atlas-engine/surface-markers';

function radialDistances(
  coordinates: number[][],
  centre: { lat: number; lng: number },
) {
  return coordinates
    .slice(0, -1)
    .map(([lng, lat]) =>
      Math.hypot(
        (lng - centre.lng) * Math.cos((centre.lat * Math.PI) / 180),
        lat - centre.lat,
      ),
    );
}

describe('source-informed event relief', () => {
  it('creates an irregular outer area and a separately raised selected core', () => {
    const event = events.find((item) => item.year === 1517);
    if (!event) throw new Error('Missing 1517 fixture');
    const [area, core] = surfaceMarkers(event, true, []);
    expect(area.layer).toBe('area');
    expect(core.layer).toBe('core');
    expect(area.altitude).toBe(LAND_ALTITUDE + EVENT_RELIEF + SURFACE_OFFSET);
    expect(core.altitude).toBe(area.altitude + EVENT_CORE_RELIEF);
    expect(area.geometry.coordinates[0]).toHaveLength(33);
    expect(core.geometry.coordinates[0]).toHaveLength(25);
    const radii = radialDistances(area.geometry.coordinates[0], event.location);
    expect(Math.max(...radii) / Math.min(...radii)).toBeGreaterThan(1.5);
    expect(
      new Set(radii.map((value) => value.toFixed(3))).size,
    ).toBeGreaterThan(10);
  });

  it('keeps the organic footprint deterministic and closes every ring', () => {
    const event = events[0];
    const first = surfaceMarkers(event, true, []);
    const second = surfaceMarkers(event, true, []);
    expect(first).toEqual(second);
    for (const marker of first) {
      const ring = marker.geometry.coordinates[0];
      expect(ring[0]).toEqual(ring.at(-1));
      expect(marker.event).toBe(event);
    }
  });

  it('matches the actual supporting boundary only where one exists', () => {
    const base = events[0];
    const ankara = {
      ...base,
      location: { ...base.location, lat: 39.93, lng: 32.85 },
    };
    const merv = {
      ...base,
      location: { ...base.location, lat: 37.66, lng: 62.17 },
    };
    expect(
      surfaceMarkers(ankara, false, getTerritoriesForYear(1886))[0].altitude,
    ).toBe(BOUNDARY_ALTITUDE + EVENT_RELIEF + SURFACE_OFFSET);
    expect(
      surfaceMarkers(merv, false, getTerritoriesForYear(1886))[0].altitude,
    ).toBe(LAND_ALTITUDE + EVENT_RELIEF + SURFACE_OFFSET);
  });

  it('omits the white core for unselected events without flattening the area', () => {
    const [area] = surfaceMarkers(events[0], false, []);
    expect(surfaceMarkers(events[0], false, [])).toHaveLength(1);
    expect(area.altitude).toBeGreaterThan(LAND_ALTITUDE);
    expect(area.altitude - LAND_ALTITUDE).toBeLessThan(LAND_ALTITUDE * 0.25);
    expect(EVENT_RELIEF).toBeLessThan(LAND_ALTITUDE);
    expect(EVENT_CORE_RELIEF).toBeLessThan(EVENT_RELIEF);
  });

  it('keeps the selected core shallow above the land surface', () => {
    const [, core] = surfaceMarkers(events[0], true, []);
    expect(core.altitude - LAND_ALTITUDE).toBeLessThan(LAND_ALTITUDE * 0.5);
  });
});
