import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/components/core/link';
import type { Locale } from '@/i18n/routing';
import { archiveCopy } from '@/features/routes/public/archive/copy';

export function ArchiveLayout({
  locale,
  title,
  intro,
  children,
}: {
  locale: Locale;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  const copy = archiveCopy(locale);
  return (
    <section
      id="main-content"
      className="min-h-[calc(100dvh-5rem)] bg-background px-5 py-12 text-foreground sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-4xl">
          <p className="mb-6 font-mono text-xs tracking-[0.2em] text-amber-600 dark:text-amber-300">
            {copy.eyebrow}
          </p>
          <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              {intro}
            </p>
          )}
          <Link
            href="/atlas"
            className="mt-7 inline-flex items-center gap-2 text-sm text-amber-700 underline-offset-4 hover:underline dark:text-amber-300"
          >
            {copy.explore}
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </header>
        {children}
      </div>
    </section>
  );
}
