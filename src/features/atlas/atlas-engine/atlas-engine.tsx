'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import {
  EngineBoundary,
  EngineFallback,
} from '@/features/atlas/atlas-engine/engine-fallback';
import type { AtlasEngineProps } from '@/features/atlas/atlas-engine/types';

const GlobeScene = dynamic(
  () =>
    import('@/features/atlas/atlas-engine/globe-scene').then(
      (module) => module.GlobeScene,
    ),
  { ssr: false },
);

export function AtlasEngine(props: AtlasEngineProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>(
    'loading',
  );
  const ready = useCallback(() => setStatus('ready'), []);
  const fail = useCallback(() => setStatus('failed'), []);

  useEffect(() => {
    if (status !== 'loading') return;
    const timeout = window.setTimeout(fail, 20000);
    return () => window.clearTimeout(timeout);
  }, [status, fail]);

  if (status === 'failed') return <EngineFallback locale={props.locale} />;

  return (
    <EngineBoundary locale={props.locale}>
      <div
        className="relative h-full min-h-[420px] w-full overflow-hidden"
        data-testid="atlas-engine"
      >
        <GlobeScene {...props} onReady={ready} onFailure={fail} />
        {status === 'loading' && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            role="status"
          >
            <p className="text-sm text-muted-foreground">
              {props.locale === 'tr'
                ? 'Dünya hazırlanıyor…'
                : 'Preparing the globe…'}
            </p>
          </div>
        )}
      </div>
    </EngineBoundary>
  );
}
