'use client';

import { Component, type ReactNode } from 'react';
import { Globe2 } from 'lucide-react';
import { Link } from '@/components/core/link';
import type { Locale } from '@/i18n/routing';

export function EngineFallback({ locale }: { locale: Locale }) {
  return (
    <div className="flex h-full min-h-96 flex-col items-center justify-center gap-5 p-8 text-center">
      <Globe2 className="size-12 text-primary" aria-hidden />
      <p className="max-w-sm text-sm text-muted-foreground">
        {locale === 'tr'
          ? '3B dünya bu cihazda yüklenemedi. Tüm olayları kronolojiden keşfetmeye devam edebilirsin.'
          : 'The 3D globe could not load on this device. You can explore every event in the chronology.'}
      </p>
      <Link href="/kronoloji" variant="outline">
        {locale === 'tr' ? 'Kronolojiyi aç' : 'Explore chronology'}
      </Link>
    </div>
  );
}

export class EngineBoundary extends Component<
  { children: ReactNode; locale: Locale },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (
      <EngineFallback locale={this.props.locale} />
    ) : (
      this.props.children
    );
  }
}
