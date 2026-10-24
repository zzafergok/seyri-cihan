'use client';

import { ArrowUpRight, BookOpen, MapPin, X, Compass } from 'lucide-react';
import { Button } from '@/components/core/button';
import { Link } from '@/components/core/link';
import {
  formatYear,
  type HistoricalEvent,
  type Territory,
} from '@/features/atlas/domain';
import type { Locale } from '@/i18n/routing';
import type { AtlasCopy } from '@/features/routes/public/atlas/i18n';
import { getEventsForYear, sources } from '@/features/atlas/data';
import { LiveRegion } from '@/components/core/accessibility';

type Props = {
  event?: HistoricalEvent;
  territory?: Territory;
  year: number;
  locale: Locale;
  copy: AtlasCopy;
  onClose: () => void;
};

export function AtlasDetailsHub({
  event,
  territory,
  year,
  locale,
  copy,
  onClose,
}: Props) {
  const boundarySource = territory
    ? sources.find((source) => source.id === territory.sourceId)
    : undefined;

  return (
    <aside className="atlas-hub" aria-label={copy.detailLabel}>
      <LiveRegion visuallyHidden>
        {territory?.name[locale] ??
          event?.title[locale] ??
          formatYear(year, locale)}
      </LiveRegion>
      <div className="atlas-hub-heading">
        <span>{territory ? copy.regionTitle : copy.detailLabel}</span>
        {(event || territory) && (
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={onClose}
            aria-label={copy.close}
          >
            <X size={16} />
          </Button>
        )}
      </div>
      {territory ? (
        <div className="atlas-hub-content">
          <Compass
            className="mb-5 text-tulpar-gold"
            size={32}
            strokeWidth={1}
          />
          <div className="atlas-event-category">
            {copy.boundarySnapshot.replace('{year}', String(year))}
          </div>
          <h2>{territory.name[locale]}</h2>
          <p>{territory.note[locale]}</p>
          <div className="atlas-context-note">{copy.schematic}</div>
          <h3>{copy.boundaryValidity}</h3>
          <p>
            <time dateTime={territory.validFrom}>{territory.validFrom}</time>
            {' → '}
            <time dateTime={territory.validTo}>{territory.validTo}</time>
          </p>
          {boundarySource && (
            <>
              <h3>{copy.boundarySource}</h3>
              <Link
                href={boundarySource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs leading-relaxed underline underline-offset-4"
              >
                {boundarySource.title} · {boundarySource.publisher}
              </Link>
            </>
          )}
          <p className="mt-3">
            <Link
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {copy.boundaryLicense}
            </Link>
          </p>
          <Link
            className="atlas-read-link"
            href={`/donem/${territory.periodId}`}
          >
            {copy.regionDetail}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      ) : event ? (
        <div className="atlas-hub-content" key={event.id}>
          <div className="atlas-hub-year">{formatYear(event.year, locale)}</div>
          <span className="atlas-event-category">{copy[event.category]}</span>
          <h2>{event.title[locale]}</h2>
          <p>{event.summary[locale]}</p>
          <div className="atlas-location">
            <MapPin size={15} />
            <span>{event.location.name[locale]}</span>
          </div>
          <h3>{copy.footprintLabel}</h3>
          <p>{event.location.footprint.basis[locale]}</p>
          <h3>{copy.actors}</h3>
          <p>{event.actors[locale].join(' · ')}</p>
          <h3>{copy.consequences}</h3>
          <ul className="atlas-consequences">
            {event.consequences[locale].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link className="atlas-read-link" href={`/olay/${event.slug}`}>
            {copy.detail}
            <ArrowUpRight size={17} />
          </Link>
          <p className="atlas-source-note">
            <BookOpen size={15} />
            {event.sourceIds.length} {copy.sourceCount} · {copy.sourceNote}
          </p>
        </div>
      ) : (
        <div className="atlas-hub-content">
          <div className="atlas-hub-year">{formatYear(year, locale)}</div>
          <Compass
            size={38}
            strokeWidth={1}
            className="my-6 text-muted-foreground"
          />
          <h2>
            {getEventsForYear(year).length ? copy.selectEvent : copy.emptyYear}
          </h2>
          <p>{copy.emptyHelp}</p>
          <Link className="atlas-read-link" href="/kronoloji">
            {copy.chronology}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      )}
    </aside>
  );
}
