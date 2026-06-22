import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  colorClass?: string;
  subtitle?: string;
  onClick?: () => void;
  active?: boolean;
}

export function MetricCard({ title, value, icon: Icon, colorClass, subtitle, onClick, active }: MetricCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-150',
        onClick && 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 select-none',
        active && 'ring-2 ring-primary ring-offset-2',
      )}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className={cn('text-3xl font-bold mt-1 tracking-tight', colorClass ?? 'text-foreground')}>
              {value}
            </p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <div className={cn('p-2.5 rounded-xl bg-muted', colorClass && colorClass.replace('text-', 'text-').replace('-600', '-500').replace('-700', '-500'))}>
            <Icon className={cn('h-5 w-5', colorClass ?? 'text-muted-foreground')} />
          </div>
        </div>
        {active && (
          <p className="text-xs mt-2 font-medium" style={{ color: 'var(--primary)' }}>
            ↓ Filtered below
          </p>
        )}
      </CardContent>
    </Card>
  );
}
