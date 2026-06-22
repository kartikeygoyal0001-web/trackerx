import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TemperatureBadge } from '@/components/ui/TemperatureBadge';
import { StagePill } from '@/components/ui/StagePill';
import { PhoneCall, MessageCircle } from 'lucide-react';
import type { Lead } from '@/types/lead';

interface CallsDueTodayProps {
  leads: Lead[];
}

export function CallsDueToday({ leads }: CallsDueTodayProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <PhoneCall className="h-4 w-4 text-amber-500" />
          Calls for Today
          {leads.length > 0 && (
            <span className="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold">
              {leads.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {leads.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No calls due today. Great work! 🎉
          </p>
        ) : (
          <ul className="space-y-2">
            {leads.map((lead) => (
              <li
                key={lead.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-medium text-sm truncate">{lead.name}</span>
                  <a
                    href={`https://wa.me/91${lead.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 hover:underline"
                  >
                    <MessageCircle className="h-3 w-3 shrink-0" />
                    {lead.phone}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <TemperatureBadge value={lead.temperature} />
                  <StagePill value={lead.stage} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
