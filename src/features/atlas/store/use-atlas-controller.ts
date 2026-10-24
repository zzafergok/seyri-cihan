'use client';

import { useEffect, useState } from 'react';
import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';
import { events } from '@/features/atlas/data';
import {
  MIN_YEAR,
  MAX_YEAR,
  type HistoricalEvent,
} from '@/features/atlas/domain';
import {
  atlasSearch,
  parseAtlasLocation,
  type AtlasLocation,
} from '@/features/atlas/store/url-state';

type AtlasState = AtlasLocation & {
  playing: boolean;
  setYear: (year: number) => void;
  selectEvent: (event: HistoricalEvent) => void;
  setPlaying: (playing: boolean) => void;
  closeEvent: () => void;
  restore: (location: AtlasLocation) => void;
};

export function useAtlasController(initial: AtlasLocation) {
  const [store] = useState(() =>
    createStore<AtlasState>((set) => ({
      ...initial,
      playing: false,
      setYear: (value) => {
        if (!Number.isFinite(value)) return;
        const year = Math.max(MIN_YEAR, Math.min(MAX_YEAR, Math.round(value)));
        set({ year, eventId: events.find((event) => event.year === year)?.id });
      },
      selectEvent: (event) =>
        set({ year: event.year, eventId: event.id, playing: false }),
      setPlaying: (playing) => set({ playing }),
      closeEvent: () => set({ eventId: undefined }),
      restore: (location) => set({ ...location, playing: false }),
    })),
  );
  const state = useStore(store);
  const { year, eventId } = state;

  useEffect(() => {
    const url = new URL(window.location.href);
    const search = new URLSearchParams(atlasSearch({ year, eventId }));
    url.searchParams.set('year', search.get('year') ?? String(year));
    if (search.has('event'))
      url.searchParams.set('event', search.get('event') ?? '');
    else url.searchParams.delete('event');
    // Keep refresh/language changes consistent with the visible selection.
    window.history.replaceState(window.history.state, '', url);
  }, [year, eventId]);

  useEffect(() => {
    const restore = () =>
      store
        .getState()
        .restore(
          parseAtlasLocation(new URLSearchParams(window.location.search)),
        );
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, [store]);

  useEffect(() => {
    if (!state.playing) return;
    const timer = window.setInterval(() => {
      const current = store.getState();
      if (document.hidden || current.year >= MAX_YEAR) {
        current.setPlaying(false);
        return;
      }
      current.setYear(current.year + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [state.playing, store]);

  return state;
}
