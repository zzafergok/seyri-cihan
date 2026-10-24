'use client';

import { ArrowUpRight, Layers } from 'lucide-react';
import { Button } from '@/components/core/button';
import { Link } from '@/components/core/link';
import type { Territory } from '@/features/atlas/domain';
import type { AtlasCopy } from '@/features/routes/public/atlas/i18n';
import type { Locale } from '@/i18n/routing';

type Props = {
  year: number;
  territories: Territory[];
  locale: Locale;
  copy: AtlasCopy;
  onYear: (year: number) => void;
  onSelect: (territory: Territory) => void;
};

const comparisonYears = [1886, 1913, 1914];

export function AtlasBoundaryStatus({
  year,
  territories,
  locale,
  copy,
  onYear,
  onSelect,
}: Props) {
  const hasBoundaries = territories.length > 0;

  return (
    <section
      className="border-b border-border px-4 py-4 sm:px-6"
      aria-label={copy.boundaryLabel}
    >
      <div className="flex items-start gap-3">
        <Layers size={17} className="mt-0.5 shrink-0 text-tulpar-gold" />
        <div className="min-w-0 space-y-2">
          <p className="text-sm font-medium" role="status">
            {(hasBoundaries
              ? copy.boundarySnapshot
              : copy.boundaryUnavailable
            ).replace('{year}', String(year))}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {hasBoundaries ? copy.schematic : copy.boundaryUnavailableHelp}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {copy.boundaryCoverage}
          </p>
          {hasBoundaries ? (
            <div className="flex flex-wrap gap-2">
              {territories.map((territory) => (
                <Button
                  key={territory.id}
                  variant="outline"
                  size="sm"
                  className="h-auto min-h-9 gap-2 whitespace-normal py-2 text-left"
                  onClick={() => onSelect(territory)}
                  aria-label={`${territory.name[locale]}: ${copy.boundarySelect}`}
                >
                  {copy.boundarySelect}
                  <ArrowUpRight size={14} />
                </Button>
              ))}
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="h-auto min-h-9 gap-2 whitespace-normal py-2 text-left"
              onClick={() => onYear(1886)}
            >
              {copy.boundaryJump}
              <ArrowUpRight size={14} />
            </Button>
          )}
          {hasBoundaries && (
            <nav
              className="flex flex-wrap gap-2"
              aria-label={copy.boundaryCompare}
            >
              {comparisonYears.map((comparisonYear) => (
                <Button
                  key={comparisonYear}
                  size="sm"
                  variant={year === comparisonYear ? 'secondary' : 'ghost'}
                  aria-current={year === comparisonYear ? 'date' : undefined}
                  onClick={() => onYear(comparisonYear)}
                >
                  {comparisonYear}
                </Button>
              ))}
            </nav>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <Link
              href="https://icr.ethz.ch/data/cshapes/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {copy.boundaryAttribution}
            </Link>
            <Link
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {copy.boundaryLicense}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
