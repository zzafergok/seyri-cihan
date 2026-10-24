export type AtlasLocale = 'tr' | 'en';
export type Localized<T = string> = Record<AtlasLocale, T>;

export interface EventFootprint {
  radiusKm: number;
  elongation: number;
  bearing: number;
  roughness: number;
  basis: Localized;
}

export interface HistoricalEvent {
  id: string;
  slug: string;
  year: number;
  title: Localized;
  summary: Localized;
  body: Localized;
  consequences: Localized<string[]>;
  category: 'state' | 'battle' | 'culture' | 'diplomacy';
  periodId: string;
  location: {
    lat: number;
    lng: number;
    name: Localized;
    footprint: EventFootprint;
  };
  actors: Localized<string[]>;
  sourceIds: string[];
}

/** Editorial chapters, not an exhaustive chronology of states. */
export interface Period {
  id: string;
  title: Localized;
  startYear: number;
  endYear: number;
  color: string;
}

export interface HistoricalSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
}

export type BoundaryGeometry =
  | { type: 'Polygon'; coordinates: number[][][] }
  | { type: 'MultiPolygon'; coordinates: number[][][][] };

/** Source-derived generalized borders, not a reconstruction of wartime control. */
export interface Territory {
  id: string;
  periodId: string;
  name: Localized;
  startYear: number;
  endYear: number;
  geometry: BoundaryGeometry;
  note: Localized;
  status: 'generalized';
  sourceId: string;
  validFrom: string;
  validTo: string;
}
