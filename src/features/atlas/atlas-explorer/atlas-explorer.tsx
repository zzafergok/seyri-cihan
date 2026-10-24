'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Compass, RotateCcw, Orbit, ArrowDown } from 'lucide-react';
import { Button } from '@/components/core/button';
import { useI18n } from '@/hooks/use-i18n';
import { getAtlasCopy } from '@/features/routes/public/atlas/i18n';
import {
  events,
  getPeriodForYear,
  getEventsForYear,
  getTerritoriesForYear,
} from '@/features/atlas/data';
import {
  formatYear,
  type HistoricalEvent,
  type Territory,
} from '@/features/atlas/domain';
import { useAtlasController, type AtlasLocation } from '@/features/atlas/store';
import { AtlasEngine } from '@/features/atlas/atlas-engine';
import { AtlasTimeline } from '@/features/atlas/atlas-timeline';
import { AtlasDetailsHub } from '@/features/atlas/atlas-details-hub';
import { AtlasChapters } from '@/features/atlas/atlas-explorer/atlas-chapters';
import { AtlasEventList } from '@/features/atlas/atlas-event-list';
import { AtlasBoundaryStatus } from '@/features/atlas/atlas-boundary-status';

export function AtlasExplorer({ initial }: { initial: AtlasLocation }) {
  const { copy, locale } = useI18n(getAtlasCopy);
  const reducedMotion = useReducedMotion();
  const atlas = useAtlasController(initial);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<HistoricalEvent['category'] | 'all'>(
    'all',
  );
  const [autoRotate, setAutoRotate] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory>();
  const period = getPeriodForYear(atlas.year);
  const event = events.find((item) => item.id === atlas.eventId);
  const yearEvents = getEventsForYear(atlas.year);
  const territories = getTerritoriesForYear(atlas.year);
  const territory =
    selectedTerritory &&
    territories.find((item) => item.id === selectedTerritory.id);
  const filtered = events.filter((item) => {
    const matchesText =
      `${item.title[locale]} ${item.location.name[locale]} ${item.summary[locale]}`
        .toLocaleLowerCase(locale)
        .includes(query.toLocaleLowerCase(locale));
    return (
      (query ? matchesText : item.periodId === period?.id) &&
      (category === 'all' || item.category === category)
    );
  });
  const chooseEvent = (item: HistoricalEvent) => {
    setSelectedTerritory(undefined);
    setAutoRotate(false);
    atlas.selectEvent(item);
  };
  const chooseYear = (year: number) => {
    setSelectedTerritory(undefined);
    atlas.setYear(year);
  };
  const closeEvent = atlas.closeEvent;
  useEffect(() => {
    const onEscape = (key: KeyboardEvent) => {
      if (key.key === 'Escape') {
        closeEvent();
        setSelectedTerritory(undefined);
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [closeEvent]);

  return (
    <div className="atlas-page">
      <section className="atlas-intro">
        <div>
          <p className="atlas-kicker">
            <span />
            {copy.eyebrow}
          </p>
          <h1>
            {copy.title} <em>{copy.titleAccent}</em>
          </h1>
          <p className="atlas-intro-text">{copy.intro}</p>
        </div>
        <div className="atlas-edition">
          <Compass size={28} strokeWidth={1} />
          <span>
            {copy.initialRelease}
            <small>{copy.coverage}</small>
          </span>
        </div>
      </section>
      <div className="atlas-workspace">
        <AtlasChapters
          periodId={period?.id}
          locale={locale}
          copy={copy}
          onSelect={(year) => {
            setQuery('');
            setCategory('all');
            atlas.setPlaying(false);
            chooseYear(year);
          }}
        />
        <div className="atlas-center">
          <section className="atlas-stage" aria-label={copy.atlas}>
            <div className="atlas-stage-title">
              <span>{period?.title[locale]}</span>
              <strong>{formatYear(atlas.year, locale)}</strong>
              <small>{copy.selectedYear}</small>
            </div>
            <div className="atlas-stage-tools">
              <Button
                variant="ghost"
                size="icon-sm"
                className="atlas-map-button"
                aria-label={copy.reset}
                onClick={() => {
                  setResetKey((value) => value + 1);
                  setAutoRotate(false);
                }}
              >
                <RotateCcw size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                className="atlas-map-button"
                aria-label={autoRotate ? copy.stopTurn : copy.turn}
                aria-pressed={autoRotate}
                disabled={reducedMotion}
                onClick={() => setAutoRotate(!autoRotate)}
              >
                <Orbit size={17} />
              </Button>
            </div>
            <div className="atlas-globe-mount">
              <AtlasEngine
                events={yearEvents}
                territories={territories}
                selectedEvent={event}
                locale={locale}
                reducedMotion={reducedMotion}
                autoRotate={autoRotate}
                resetKey={resetKey}
                onSelectEvent={chooseEvent}
                onInteraction={() => setAutoRotate(false)}
                onSelectTerritory={(item) => {
                  setSelectedTerritory(item);
                  atlas.setPlaying(false);
                  setAutoRotate(false);
                }}
              />
            </div>
            <div className="atlas-map-legend">
              <span>
                <i className="atlas-event-dot" />
                {copy.legendEvent}
              </span>
              {territories.length > 0 && (
                <span>
                  <i className="atlas-region-dot" />
                  {copy.legendRegion}
                </span>
              )}
            </div>
            <p className="atlas-map-hint">{copy.mapHint}</p>
          </section>
          <AtlasTimeline
            year={atlas.year}
            playing={atlas.playing}
            onYear={chooseYear}
            onPlay={atlas.setPlaying}
            copy={copy}
          />
          <AtlasBoundaryStatus
            year={atlas.year}
            territories={territories}
            locale={locale}
            copy={copy}
            onYear={(year) => {
              atlas.setPlaying(false);
              chooseYear(year);
            }}
            onSelect={(item) => {
              setSelectedTerritory(item);
              atlas.setPlaying(false);
              setAutoRotate(false);
            }}
          />
        </div>
        <AtlasDetailsHub
          event={event}
          territory={territory}
          year={atlas.year}
          locale={locale}
          copy={copy}
          onClose={() => {
            atlas.closeEvent();
            setSelectedTerritory(undefined);
          }}
        />
      </div>
      <div className="atlas-below">
        <div className="atlas-below-intro">
          <ArrowDown size={22} strokeWidth={1} />
          <h2>{copy.events}</h2>
          <p>{period?.title[locale]}</p>
          <div className="atlas-category-filters">
            {(['all', 'state', 'battle', 'culture', 'diplomacy'] as const).map(
              (item) => (
                <Button
                  key={item}
                  size="sm"
                  variant={category === item ? 'secondary' : 'ghost'}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {copy[item]}
                </Button>
              ),
            )}
          </div>
        </div>
        <AtlasEventList
          events={filtered}
          locale={locale}
          copy={copy}
          selectedId={event?.id}
          query={query}
          onQuery={setQuery}
          onSelect={chooseEvent}
        />
      </div>
    </div>
  );
}
