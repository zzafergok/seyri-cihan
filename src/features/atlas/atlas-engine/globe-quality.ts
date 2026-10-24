export const GLOBE_MIN_DISTANCE = 104;
export const GLOBE_MAX_DISTANCE = 500;
export const GLOBE_NEAR_PLANE = 0.1;
export const MAX_RENDERER_PIXEL_RATIO = 3;
export const POLYGON_CURVATURE_RESOLUTION = 1;

export function rendererPixelRatio(devicePixelRatio: number) {
  if (!Number.isFinite(devicePixelRatio) || devicePixelRatio <= 0) return 1;
  return Math.min(devicePixelRatio, MAX_RENDERER_PIXEL_RATIO);
}
