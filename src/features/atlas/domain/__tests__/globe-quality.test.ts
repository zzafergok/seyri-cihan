import { describe, expect, it } from 'vitest';
import {
  MAX_RENDERER_PIXEL_RATIO,
  rendererPixelRatio,
} from '@/features/atlas/atlas-engine/globe-quality';

describe('globe render quality', () => {
  it('keeps native density through high-density mobile resolution', () => {
    expect(rendererPixelRatio(1)).toBe(1);
    expect(rendererPixelRatio(2)).toBe(2);
    expect(rendererPixelRatio(3)).toBe(3);
  });

  it('caps extreme densities and rejects invalid values', () => {
    expect(rendererPixelRatio(4)).toBe(MAX_RENDERER_PIXEL_RATIO);
    expect(rendererPixelRatio(0)).toBe(1);
    expect(rendererPixelRatio(Number.NaN)).toBe(1);
  });
});
