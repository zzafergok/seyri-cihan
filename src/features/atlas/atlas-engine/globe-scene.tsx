'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Globe from 'react-globe.gl';
import { MeshPhongMaterial } from 'three';
import { useGlobeLifecycle } from '@/features/atlas/atlas-engine/use-globe-lifecycle';
import { useLand } from '@/features/atlas/atlas-engine/use-land';
import type { GlobeSceneProps } from '@/features/atlas/atlas-engine/types';
import type { HistoricalEvent, Territory } from '@/features/atlas/domain';
import { globeGeometry } from '@/features/atlas/atlas-engine/spherical-geometry';
import {
  LAND_ALTITUDE,
  BOUNDARY_ALTITUDE,
  surfaceMarkers,
} from '@/features/atlas/atlas-engine/surface-markers';
import { POLYGON_CURVATURE_RESOLUTION } from '@/features/atlas/atlas-engine/globe-quality';

export function GlobeScene(props: GlobeSceneProps) {
  const {
    events,
    territories,
    locale,
    selectedEvent,
    onSelectEvent,
    onSelectTerritory,
    onReady,
    onFailure,
  } = props;
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState<
    HistoricalEvent | Territory | undefined
  >();
  const land = useLand(onFailure);
  const { containerRef, globeRef, size } = useGlobeLifecycle(props, ready);
  const ocean = useMemo(
    () =>
      new MeshPhongMaterial({
        color: '#102830',
        shininess: 12,
        specular: '#29575d',
      }),
    [],
  );
  const markers = useMemo(
    () =>
      events.flatMap((event) =>
        surfaceMarkers(event, event.id === selectedEvent?.id, territories),
      ),
    [events, selectedEvent?.id, territories],
  );
  const markerLookup = useMemo(
    () =>
      new Map<object, (typeof markers)[number]>(
        markers.map((marker) => [marker, marker]),
      ),
    [markers],
  );
  const renderTerritories = useMemo(
    () =>
      territories.map((territory) => ({
        ...territory,
        geometry: globeGeometry(territory.geometry),
      })),
    [territories],
  );
  const territoryLookup = useMemo(
    () =>
      new Map<object, Territory>(
        renderTerritories.map((territory, index) => [
          territory,
          territories[index],
        ]),
      ),
    [territories, renderTerritories],
  );
  const polygons = useMemo(
    () => [...land, ...renderTerritories, ...markers],
    [land, renderTerritories, markers],
  );
  const labelData = useMemo(
    () => (selectedEvent ? [selectedEvent] : []),
    [selectedEvent],
  );
  const readyHandler = useCallback(() => {
    setReady(true);
    onReady();
  }, [onReady]);

  useEffect(() => () => ocean.dispose(), [ocean]);

  const selectTerritory = (value: object) => {
    const marker = markerLookup.get(value);
    if (marker) {
      onSelectEvent(marker.event);
      return;
    }
    const territory = territoryLookup.get(value);
    if (territory) onSelectTerritory(territory);
  };
  const tooltip =
    hovered &&
    ('title' in hovered ? hovered.title[locale] : hovered.name[locale]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      {land.length > 0 && (
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          backgroundColor="rgba(0,0,0,0)"
          globeMaterial={ocean}
          showGraticules
          atmosphereColor="#5c8580"
          atmosphereAltitude={0.12}
          animateIn={false}
          onGlobeReady={readyHandler}
          polygonsData={polygons}
          polygonGeoJsonGeometry="geometry"
          polygonCapColor={(value) =>
            markerLookup.has(value)
              ? markerLookup.get(value)?.layer === 'core'
                ? '#fff0c9'
                : markerLookup.get(value)?.event.id === selectedEvent?.id
                  ? '#d6a957'
                  : '#c48d41'
              : territoryLookup.has(value)
                ? '#c49b58'
                : '#527269'
          }
          polygonSideColor={(value) =>
            markerLookup.has(value)
              ? markerLookup.get(value)?.layer === 'core'
                ? '#b28f58'
                : '#765b38'
              : territoryLookup.has(value)
                ? '#765b38'
                : '#2d4e48'
          }
          polygonStrokeColor={(value) =>
            markerLookup.has(value)
              ? markerLookup.get(value)?.layer === 'core'
                ? '#fff0c9'
                : '#e2b96d'
              : territoryLookup.has(value)
                ? '#f3d49a'
                : '#759087'
          }
          polygonAltitude={(value) =>
            markerLookup.get(value)?.altitude ??
            (territoryLookup.has(value) ? BOUNDARY_ALTITUDE : LAND_ALTITUDE)
          }
          polygonCapCurvatureResolution={POLYGON_CURVATURE_RESOLUTION}
          polygonsTransitionDuration={0}
          polygonLabel=""
          onPolygonClick={selectTerritory}
          onPolygonHover={(value) =>
            setHovered(
              value
                ? (markerLookup.get(value)?.event ?? territoryLookup.get(value))
                : undefined,
            )
          }
          htmlElementsData={labelData}
          htmlLat={selectedEvent?.location.lat ?? 0}
          htmlLng={selectedEvent?.location.lng ?? 0}
          htmlAltitude={Math.max(
            LAND_ALTITUDE,
            ...markers
              .filter((marker) => marker.event.id === selectedEvent?.id)
              .map((marker) => marker.altitude),
          )}
          htmlElement={() => {
            const label = document.createElement('span');
            label.className = 'atlas-globe-label';
            label.textContent = selectedEvent?.location.name[locale] ?? '';
            return label;
          }}
          showPointerCursor={(_kind, value) =>
            markerLookup.has(value) || territoryLookup.has(value)
          }
        />
      )}
      {tooltip && (
        <div className="pointer-events-none absolute bottom-20 left-1/2 z-10 max-w-[80%] -translate-x-1/2 border border-primary/30 bg-background/95 px-4 py-2 text-center text-xs text-foreground shadow-lg">
          {tooltip}
        </div>
      )}
    </div>
  );
}
