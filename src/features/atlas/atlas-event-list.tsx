'use client';

import { ArrowUpRight, Search, X } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/core/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/core/table';
import { Form } from '@/components/forms/form';
import { TextField } from '@/components/forms/text-field';
import { formatYear, type HistoricalEvent } from '@/features/atlas/domain';
import type { Locale } from '@/i18n/routing';
import type { AtlasCopy } from '@/features/routes/public/atlas/i18n';

type Props = {
  events: HistoricalEvent[];
  locale: Locale;
  copy: AtlasCopy;
  selectedId?: string;
  query: string;
  onQuery: (value: string) => void;
  onSelect: (event: HistoricalEvent) => void;
};
const schema = z.object({ search: z.string().max(100) });

export function AtlasEventList({
  events,
  locale,
  copy,
  selectedId,
  query,
  onQuery,
  onSelect,
}: Props) {
  return (
    <section className="atlas-records" aria-label={copy.events}>
      <div className="atlas-records-heading">
        <h2>{copy.nearby}</h2>
        <span>
          {events.length} {copy.results}
        </span>
      </div>
      <Form
        key={query}
        schema={schema}
        defaultValues={{ search: query }}
        onSubmit={(values) => onQuery(values.search.trim())}
        className="mb-4 flex items-start gap-1"
      >
        <TextField
          name="search"
          label={copy.search}
          hideLabel
          placeholder={copy.searchPlaceholder}
          maxLength={100}
          className="flex-1"
        />
        <Button
          type="submit"
          size="icon-sm"
          variant="outline"
          aria-label={copy.search}
        >
          <Search size={15} />
        </Button>
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={copy.clearSearch}
            onClick={() => onQuery('')}
          >
            <X size={15} />
          </Button>
        )}
      </Form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{copy.year}</TableHead>
            <TableHead>{copy.eventTitle}</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">{copy.explore}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow
              key={event.id}
              data-state={selectedId === event.id ? 'selected' : undefined}
            >
              <TableCell className="font-mono text-xs tabular-nums">
                {formatYear(event.year, locale)}
              </TableCell>
              <TableCell>
                <Button
                  variant="link"
                  className="h-auto whitespace-normal text-left text-sm text-foreground"
                  onClick={() => onSelect(event)}
                >
                  {event.title[locale]}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  aria-label={`${event.title[locale]} — ${copy.explore}`}
                  onClick={() => onSelect(event)}
                >
                  <ArrowUpRight size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {!events.length && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="py-8 text-center text-sm text-muted-foreground"
              >
                {copy.noResults}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
