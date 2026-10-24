'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Slider } from '@/components/core/slider';
import { Label } from '@/components/core/label';

type SliderFieldProps = {
  name: string;
  label: string;
  min: number;
  max: number;
  onValueChange?: (value: number) => void;
};

export function SliderField({
  name,
  label,
  min,
  max,
  onValueChange,
}: SliderFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="min-w-0 flex-1 space-y-2">
          <Label id={`${name}-slider-label`} className="sr-only">
            {label}
          </Label>
          <Slider
            aria-labelledby={`${name}-slider-label`}
            min={min}
            max={max}
            step={1}
            value={[typeof field.value === 'number' ? field.value : min]}
            onValueChange={([value]) => {
              field.onChange(value);
              onValueChange?.(value);
            }}
            onBlur={field.onBlur}
          />
        </div>
      )}
    />
  );
}
