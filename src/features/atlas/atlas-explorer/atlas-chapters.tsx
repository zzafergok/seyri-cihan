'use client';

import { BookOpen } from 'lucide-react';
import { Button } from '@/components/core/button';
import { Link } from '@/components/core/link';
import { events, periods } from '@/features/atlas/data';
import type { AtlasCopy } from '@/features/routes/public/atlas/i18n';
import type { Locale } from '@/i18n/routing';

type Props = {
  periodId?: string;
  locale: Locale;
  copy: AtlasCopy;
  onSelect: (year: number) => void;
};

export function AtlasChapters({ periodId, locale, copy, onSelect }: Props) {
  return (
    <aside className="atlas-chapters" aria-label={copy.periods}>
      <h2>{copy.periods}</h2>
      <nav className="atlas-chapter-nav">
        {periods.map((item, index) => (
          <Button
            key={item.id}
            variant="ghost"
            className="atlas-chapter"
            aria-pressed={item.id === periodId}
            onClick={() =>
              onSelect(
                events.find((event) => event.periodId === item.id)?.year ??
                  item.startYear,
              )
            }
          >
            <span className="atlas-chapter-number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>
              <strong>{item.title[locale]}</strong>
              <small>
                {item.startYear} — {item.endYear}
              </small>
            </span>
            {item.id === periodId && <span className="atlas-chapter-dot" />}
          </Button>
        ))}
      </nav>
      <div className="atlas-chapters-foot">
        <BookOpen size={18} />
        <p>{copy.coverage}</p>
        <Link href="/kronoloji">{copy.allPeriods} ↗</Link>
      </div>
    </aside>
  );
}
