import { cn } from '@/lib/utils';
import { TEMPERATURE_COLORS, TEMPERATURE_ICONS } from '@/lib/constants';
import type { Temperature } from '@/types/lead';

interface TemperatureBadgeProps {
  value: Temperature;
  className?: string;
}

export function TemperatureBadge({ value, className }: TemperatureBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap',
        TEMPERATURE_COLORS[value],
        className,
      )}
    >
      <span>{TEMPERATURE_ICONS[value]}</span>
      {value}
    </span>
  );
}
