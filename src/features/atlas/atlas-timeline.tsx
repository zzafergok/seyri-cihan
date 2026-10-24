'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/core/button';
import { Form } from '@/components/forms/form';
import { TextField } from '@/components/forms/text-field';
import { SliderField } from '@/components/forms/slider-field';
import { MIN_YEAR, MAX_YEAR } from '@/features/atlas/domain';
import { periods } from '@/features/atlas/data';
import type { AtlasCopy } from '@/features/routes/public/atlas/i18n';

type Props = {
  year: number;
  playing: boolean;
  onYear: (year: number) => void;
  onPlay: (value: boolean) => void;
  copy: AtlasCopy;
};

export function AtlasTimeline({ year, playing, onYear, onPlay, copy }: Props) {
  const schema = z.object({
    year: z
      .number({ invalid_type_error: copy.yearError })
      .int(copy.yearError)
      .min(MIN_YEAR, copy.yearError)
      .max(MAX_YEAR, copy.yearError),
  });
  const methods = useForm<{ year: number }>({
    resolver: zodResolver(schema),
    defaultValues: { year },
  });
  useEffect(() => {
    methods.reset({ year });
  }, [year, methods]);
  const updateYear = (value: number) => {
    onPlay(false);
    onYear(value);
  };

  return (
    <section className="atlas-timeline" aria-label={copy.timeline}>
      <Form
        schema={schema}
        methods={methods}
        onSubmit={(values) => updateYear(values.year)}
        className="atlas-timeline-form"
      >
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            aria-label={playing ? copy.pause : copy.play}
            onClick={() => onPlay(!playing)}
            type="button"
            disabled={year === MAX_YEAR}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            type="button"
            aria-label={copy.previous}
            disabled={year === MIN_YEAR}
            onClick={() => updateYear(year - 1)}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            type="button"
            aria-label={copy.next}
            disabled={year === MAX_YEAR}
            onClick={() => updateYear(year + 1)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
        <div className="atlas-slider-wrap">
          <SliderField
            name="year"
            label={copy.timeline}
            min={MIN_YEAR}
            max={MAX_YEAR}
            onValueChange={updateYear}
          />
          <div className="atlas-ticks" aria-hidden="true">
            <span>552</span>
            <span>1000</span>
            <span>1453</span>
            <span>1923</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <TextField
            name="year"
            label={copy.year}
            hideLabel
            type="number"
            min={MIN_YEAR}
            max={MAX_YEAR}
            step={1}
            className="w-24"
            inputClassName="font-mono"
          />
          <Button type="submit" size="sm" variant="outline">
            {copy.go}
          </Button>
        </div>
      </Form>
      <div className="atlas-period-ticks">
        {periods.map((period) => (
          <span
            key={period.id}
            style={{
              flex: period.endYear - period.startYear + 1,
              backgroundColor: period.color,
            }}
          />
        ))}
      </div>
      <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground">
        {copy.speed} · {copy.coverage}
      </p>
    </section>
  );
}
