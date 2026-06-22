import { cn, isToday, isOverdue, formatDate } from '@/lib/utils';
import { AlertCircle, Clock } from 'lucide-react';

interface FollowUpDateProps {
  value: string | null;
}

export function FollowUpDate({ value }: FollowUpDateProps) {
  if (!value) return <span className="text-muted-foreground text-xs">—</span>;

  if (isOverdue(value)) {
    return (
      <span className={cn('inline-flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400')}>
        <AlertCircle className="h-3 w-3 shrink-0" />
        {formatDate(value)}
      </span>
    );
  }

  if (isToday(value)) {
    return (
      <span className={cn('inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400')}>
        <Clock className="h-3 w-3 shrink-0" />
        Today
      </span>
    );
  }

  return <span className="text-xs text-foreground">{formatDate(value)}</span>;
}
