import { AtlasExplorer } from '@/features/atlas/atlas-explorer';
import { parseAtlasLocation } from '@/features/atlas/store/url-state';

export type AtlasScreenProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function AtlasScreen({ searchParams }: AtlasScreenProps) {
  const values = await searchParams;
  const params = new URLSearchParams();
  for (const key of ['year', 'event']) {
    const value = values[key];
    if (typeof value === 'string') params.set(key, value);
  }
  const initial = parseAtlasLocation(params);
  return (
    <AtlasExplorer
      key={`${initial.year}:${initial.eventId ?? ''}`}
      initial={initial}
    />
  );
}
