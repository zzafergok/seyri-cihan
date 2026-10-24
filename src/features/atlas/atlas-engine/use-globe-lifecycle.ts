'use client';

import { useEffect, useRef, useState } from 'react';
import type { GlobeMethods } from 'react-globe.gl';
import { PerspectiveCamera } from 'three';
import type { GlobeSceneProps } from '@/features/atlas/atlas-engine/types';
import {
  GLOBE_MAX_DISTANCE,
  GLOBE_MIN_DISTANCE,
  GLOBE_NEAR_PLANE,
  rendererPixelRatio,
} from '@/features/atlas/atlas-engine/globe-quality';

export function useGlobeLifecycle(props: GlobeSceneProps, ready: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [size, setSize] = useState({ width: 800, height: 600 });
  const {
    autoRotate,
    reducedMotion,
    resetKey,
    selectedEvent,
    onFailure,
    onInteraction,
  } = props;
  const latitude = selectedEvent?.location.lat ?? 38;
  const longitude =
    selectedEvent?.location.lng ?? (props.territories.length ? 35 : 58);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setSize({
        width: Math.max(1, entry.contentRect.width),
        height: Math.max(420, entry.contentRect.height),
      });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!ready || !globe) return;
    const renderer = globe.renderer();
    renderer.setPixelRatio(rendererPixelRatio(window.devicePixelRatio));
    const camera = globe.camera();
    if (camera instanceof PerspectiveCamera) {
      camera.near = GLOBE_NEAR_PLANE;
      camera.updateProjectionMatrix();
    }
    const controls = globe.controls();
    controls.enablePan = false;
    controls.minDistance = GLOBE_MIN_DISTANCE;
    controls.maxDistance = GLOBE_MAX_DISTANCE;
    controls.enableDamping = !reducedMotion;
    controls.autoRotateSpeed = 0.3;
    const contextLost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    const visibilityChanged = () => {
      if (document.hidden) globe.pauseAnimation();
      else globe.resumeAnimation();
    };
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    document.addEventListener('visibilitychange', visibilityChanged);
    visibilityChanged();
    return () => {
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      document.removeEventListener('visibilitychange', visibilityChanged);
    };
  }, [ready, reducedMotion, onFailure]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!ready || !globe) return;
    const controls = globe.controls();
    controls.autoRotate = autoRotate && !reducedMotion;
    const stopRotation = () => {
      controls.autoRotate = false;
      onInteraction();
    };
    controls.addEventListener('start', stopRotation);
    return () => controls.removeEventListener('start', stopRotation);
  }, [ready, autoRotate, reducedMotion, onInteraction]);

  useEffect(() => {
    if (!ready) return;
    globeRef.current?.pointOfView(
      { lat: latitude, lng: longitude, altitude: 1.85 },
      reducedMotion ? 0 : 850,
    );
  }, [ready, latitude, longitude, reducedMotion, resetKey]);

  return { containerRef, globeRef, size };
}
