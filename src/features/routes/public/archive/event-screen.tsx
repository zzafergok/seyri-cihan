import { ArrowLeft, ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from '@/components/core/link';
import { Card, CardContent } from '@/components/core/card';
import { events, periods, sources } from '@/features/atlas/data';
import {
  formatYear,
  localized,
  type HistoricalEvent,
} from '@/features/atlas/domain';
import { ArchiveLayout } from '@/features/routes/public/archive/archive-layout';
import { archiveCopy } from '@/features/routes/public/archive/copy';
import { EventTable } from '@/features/routes/public/archive/event-table';
import { SourceTable } from '@/features/routes/public/archive/source-table';
import type { Locale } from '@/i18n/routing';
import { siteMetadata } from '@/lib/metadata/site-metadata';

export function EventScreen({
  event,
  locale,
}: {
  event: HistoricalEvent;
  locale: Locale;
}) {
  const copy = archiveCopy(locale);
  const period = periods.find((item) => item.id === event.periodId);
  const references = sources.filter((source) =>
    event.sourceIds.includes(source.id),
  );
  const related = events
    .filter((item) => item.periodId === event.periodId && item.id !== event.id)
    .slice(0, 3);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: localized(event.title, locale),
    description: localized(event.summary, locale),
    inLanguage: locale,
    url: new URL(`/olay/${event.slug}`, siteMetadata.url).href,
    publisher: { '@type': 'Organization', name: siteMetadata.name },
    citation: references.map((source) => source.url),
    contentLocation: {
      '@type': 'Place',
      name: localized(event.location.name, locale),
      geo: {
        '@type': 'GeoCoordinates',
        latitude: event.location.lat,
        longitude: event.location.lng,
      },
    },
  };
  return (
    <ArchiveLayout
      locale={locale}
      title={localized(event.title, locale)}
      intro={localized(event.summary, locale)}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article>
          <h2 className="mb-5 font-serif text-2xl">{copy.context}</h2>
          <p className="whitespace-pre-line text-base leading-8 text-muted-foreground">
            {localized(event.body, locale)}
          </p>
          <section className="mt-10" aria-labelledby="consequences-title">
            <h2 id="consequences-title" className="mb-5 font-serif text-2xl">
              {copy.consequences}
            </h2>
            {localized(event.consequences, locale).map((consequence, index) => (
              <p
                key={consequence}
                className="mb-4 border-l border-amber-600/40 pl-5 leading-7 text-muted-foreground"
              >
                <span className="mr-3 font-mono text-xs text-amber-700 dark:text-amber-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {consequence}
              </p>
            ))}
          </section>
          <section className="mt-10" aria-labelledby="references-title">
            <h2 id="references-title" className="mb-5 font-serif text-2xl">
              {copy.references}
            </h2>
            <SourceTable items={references} locale={locale} />
          </section>
        </article>
        <aside>
          <Card className="select-text border-border bg-muted/30 text-foreground">
            <CardContent>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {copy.year}
              </p>
              <p className="mt-2 font-serif text-5xl text-amber-700 dark:text-amber-300">
                {formatYear(event.year, locale)}
              </p>
              <dl className="mt-8 space-y-6 text-sm">
                <div>
                  <dt className="mb-2 text-muted-foreground">{copy.place}</dt>
                  <dd className="flex items-center gap-2">
                    <MapPin size={14} aria-hidden />
                    {localized(event.location.name, locale)}
                  </dd>
                </div>
                <div>
                  <dt className="mb-2 text-muted-foreground">
                    {copy.category}
                  </dt>
                  <dd>{copy.categories[event.category]}</dd>
                </div>
                {period && (
                  <div>
                    <dt className="mb-2 text-muted-foreground">
                      {copy.period}
                    </dt>
                    <dd>
                      <Link
                        href={`/donem/${period.id}`}
                        className="underline underline-offset-4"
                      >
                        {localized(period.title, locale)}
                      </Link>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="mb-2 text-muted-foreground">{copy.actors}</dt>
                  <dd className="leading-6">
                    {localized(event.actors, locale).join(' · ')}
                  </dd>
                </div>
              </dl>
              <Link
                href={`/atlas?year=${event.year}&event=${event.slug}`}
                variant="outline"
                className="mt-8 w-full gap-2 border-border text-foreground"
              >
                {copy.onMap}
                <ArrowUpRight size={15} aria-hidden />
              </Link>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                {copy.mapNote}
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
      {related.length > 0 && (
        <section className="mt-16" aria-labelledby="related-title">
          <h2 id="related-title" className="mb-5 font-serif text-2xl">
            {copy.related}
          </h2>
          <EventTable items={related} locale={locale} />
        </section>
      )}
      <Link
        href="/kronoloji"
        className="mt-12 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} aria-hidden />
        {copy.back}
      </Link>
    </ArchiveLayout>
  );
}
