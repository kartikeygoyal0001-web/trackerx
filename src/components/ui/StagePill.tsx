import { cn } from '@/lib/utils';
import { STAGE_COLORS } from '@/lib/constants';
import type { LeadStage } from '@/types/lead';

interface StagePillProps {
  value: LeadStage;
  className?: string;
}

export function StagePill({ value, className }: StagePillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
        STAGE_COLORS[value],
        className,
      )}
    >
      {value}
    </span>
  );
}
