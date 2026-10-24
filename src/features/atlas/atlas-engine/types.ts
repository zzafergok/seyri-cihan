import type { HistoricalEvent, Territory } from '@/features/atlas/domain';
import type { Locale } from '@/i18n/routing';

export interface AtlasEngineProps {
  events: HistoricalEvent[];
  territories: Territory[];
  selectedEvent: HistoricalEvent | undefined;
  locale: Locale;
  reducedMotion: boolean;
  autoRotate: boolean;
  onSelectEvent: (event: HistoricalEvent) => void;
  onSelectTerritory: (territory: Territory) => void;
  onInteraction: () => void;
  resetKey: number;
}

export interface GlobeSceneProps extends AtlasEngineProps {
  onReady: () => void;
  onFailure: () => void;
}
