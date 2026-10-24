import { events, sources } from '@/features/atlas/data';
import { formatYear, localized, type Period } from '@/features/atlas/domain';
import { ArchiveLayout } from '@/features/routes/public/archive/archive-layout';
import { archiveCopy } from '@/features/routes/public/archive/copy';
import { EventTable } from '@/features/routes/public/archive/event-table';
import { SourceTable } from '@/features/routes/public/archive/source-table';
import type { Locale } from '@/i18n/routing';

export function ChronologyScreen({ locale }: { locale: Locale }) {
  const copy = archiveCopy(locale);
  return (
    <ArchiveLayout
      locale={locale}
      title={copy.chronology}
      intro={copy.chronologyIntro}
    >
      <p className="mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {events.length} {copy.archiveCount}
      </p>
      <EventTable
        items={[...events].sort((a, b) => a.year - b.year)}
        locale={locale}
      />
    </ArchiveLayout>
  );
}

export function PeriodScreen({
  period,
  locale,
}: {
  period: Period;
  locale: Locale;
}) {
  const copy = archiveCopy(locale);
  const items = events
    .filter((event) => event.periodId === period.id)
    .sort((a, b) => a.year - b.year);
  return (
    <ArchiveLayout
      locale={locale}
      title={localized(period.title, locale)}
      intro={`${formatYear(period.startYear, locale)} — ${formatYear(period.endYear, locale)}`}
    >
      <h2 className="mb-5 font-serif text-2xl">{copy.periodEvents}</h2>
      <EventTable items={items} locale={locale} />
      <p className="mt-8 max-w-3xl text-sm leading-7 text-muted-foreground">
        {copy.scopeBody}
      </p>
    </ArchiveLayout>
  );
}

export function SourcesScreen({ locale }: { locale: Locale }) {
  const copy = archiveCopy(locale);
  return (
    <ArchiveLayout
      locale={locale}
      title={copy.sources}
      intro={copy.sourcesIntro}
    >
      <section className="mb-12 max-w-3xl border-l border-amber-600/50 pl-6">
        <h2 className="mb-3 font-serif text-2xl">{copy.method}</h2>
        <p className="leading-7 text-muted-foreground">{copy.methodBody}</p>
      </section>
      <SourceTable items={sources} locale={locale} />
      <p className="mt-8 max-w-3xl text-sm leading-7 text-muted-foreground">
        {copy.sourceNote}
      </p>
    </ArchiveLayout>
  );
}

export function AboutScreen({ locale }: { locale: Locale }) {
  const copy = archiveCopy(locale);
  return (
    <ArchiveLayout locale={locale} title={copy.about} intro={copy.aboutIntro}>
      <article className="max-w-3xl space-y-10">
        {[
          { title: copy.scope, body: copy.scopeBody },
          { title: copy.principles, body: copy.principlesBody },
          { title: copy.method, body: copy.methodBody },
        ].map((section) => (
          <section key={section.title} className="border-t border-border pt-8">
            <h2 className="mb-4 font-serif text-2xl">{section.title}</h2>
            <p className="leading-8 text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </article>
    </ArchiveLayout>
  );
}
