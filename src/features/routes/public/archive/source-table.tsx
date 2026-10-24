import { ExternalLink } from 'lucide-react';
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
import type { HistoricalSource } from '@/features/atlas/domain';
import type { Locale } from '@/i18n/routing';

export function SourceTable({
  items,
  locale,
}: {
  items: HistoricalSource[];
  locale: Locale;
}) {
  const copy = archiveCopy(locale);
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border">
          <TableHead className="text-muted-foreground">{copy.source}</TableHead>
          <TableHead className="hidden text-muted-foreground sm:table-cell">
            {copy.publisher}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((source) => (
          <TableRow key={source.id} className="border-border hover:bg-muted/40">
            <TableCell className="whitespace-normal py-5 font-sans text-foreground">
              <Link
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
              >
                {source.title}
                <ExternalLink
                  size={14}
                  className="shrink-0"
                  aria-label={copy.openSource}
                />
              </Link>
            </TableCell>
            <TableCell className="hidden whitespace-normal font-sans text-muted-foreground sm:table-cell">
              {source.publisher}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
