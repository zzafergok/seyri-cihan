'use client';

import { useSyncExternalStore } from 'react';

const mediaQuery = '(prefers-reduced-motion: reduce)';
function subscribe(onChange: () => void) {
  const media = window.matchMedia(mediaQuery);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribe,
    () => window.matchMedia(mediaQuery).matches,
    () => true);
}
