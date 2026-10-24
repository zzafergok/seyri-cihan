export { AtlasEngine } from '@/features/atlas/atlas-engine/atlas-engine';
export {
  EngineBoundary,
  EngineFallback,
} from '@/features/atlas/atlas-engine/engine-fallback';
// The WebGL module intentionally stays behind the ssr:false dynamic boundary.
export { useGlobeLifecycle } from '@/features/atlas/atlas-engine/use-globe-lifecycle';
export { useLand } from '@/features/atlas/atlas-engine/use-land';
export {
  globeGeometry,
  clockwiseExterior,
} from '@/features/atlas/atlas-engine/spherical-geometry';
export {
  surfaceMarkers,
  eventSurfaceAltitude,
  LAND_ALTITUDE,
  BOUNDARY_ALTITUDE,
  SURFACE_OFFSET,
  EVENT_RELIEF,
  EVENT_CORE_RELIEF,
} from '@/features/atlas/atlas-engine/surface-markers';
export type { LandFeature } from '@/features/atlas/atlas-engine/use-land';
export {
  GLOBE_MAX_DISTANCE,
  GLOBE_MIN_DISTANCE,
  GLOBE_NEAR_PLANE,
  MAX_RENDERER_PIXEL_RATIO,
  POLYGON_CURVATURE_RESOLUTION,
  rendererPixelRatio,
} from '@/features/atlas/atlas-engine/globe-quality';
export type {
  AtlasEngineProps,
  GlobeSceneProps,
} from '@/features/atlas/atlas-engine/types';
