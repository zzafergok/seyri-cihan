import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/components/core/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/core/table';
import { archiveCopy } from '@/features/routes/public/archive/copy';
import {
  formatYear,
  localized,
  type HistoricalEvent,
} from '@/features/atlas/domain';
import type { Locale } from '@/i18n/routing';

export function EventTable({
  items,
  locale,
}: {
  items: HistoricalEvent[];
  locale: Locale;
}) {
  const copy = archiveCopy(locale);
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className="text-muted-foreground">{copy.year}</TableHead>
          <TableHead className="text-muted-foreground">{copy.event}</TableHead>
          <TableHead className="hidden text-muted-foreground md:table-cell">
            {copy.place}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((event) => (
          <TableRow key={event.id} className="border-border hover:bg-muted/40">
            <TableCell className="w-24 py-6 align-top text-amber-700 dark:text-amber-300">
              {formatYear(event.year, locale)}
            </TableCell>
            <TableCell className="whitespace-normal py-6 font-sans text-foreground">
              <Link
                href={`/olay/${event.slug}`}
                className="group inline-flex items-center gap-3 font-serif text-lg hover:text-amber-700 dark:hover:text-amber-300 sm:text-2xl"
              >
                {localized(event.title, locale)}
                <ArrowUpRight
                  size={17}
                  className="shrink-0 transition-transform group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {localized(event.summary, locale)}
              </p>
            </TableCell>
            <TableCell className="hidden py-6 align-top font-sans text-muted-foreground md:table-cell">
              {localized(event.location.name, locale)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
