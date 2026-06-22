'use client';

import { useMemo } from 'react';
import { Users, PhoneCall, Flame, TrendingUp } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { CallsDueToday } from './CallsDueToday';
import { ExportCSVButton } from '@/components/leads/ExportCSVButton';
import { todayISO, isToday } from '@/lib/utils';
import type { Lead } from '@/types/lead';
import type { ActiveMetric } from '@/components/leads/LeadTrackerSection';

interface DashboardSectionProps {
  leads: Lead[];
  activeMetric: ActiveMetric;
  onMetricClick: (metric: ActiveMetric) => void;
}

export function DashboardSection({ leads, activeMetric, onMetricClick }: DashboardSectionProps) {
  const today = todayISO();

  const metrics = useMemo(() => {
    const newToday = leads.filter((l) => l.date_added === today).length;
    const callsDueLeads = leads.filter((l) => isToday(l.follow_up_date));
    const hotLeads = leads.filter((l) => l.temperature === 'Hot' && l.stage !== 'Closed' && l.stage !== 'Dead').length;
    const totalPipeline = leads.filter((l) => l.stage !== 'Closed' && l.stage !== 'Dead').length;
    return { newToday, callsDueLeads, hotLeads, totalPipeline };
  }, [leads, today]);

  function toggle(metric: ActiveMetric) {
    onMetricClick(activeMetric === metric ? null : metric);
  }

  return (
    <section className="space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Daily Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <ExportCSVButton leads={leads} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          title="New Today"
          value={metrics.newToday}
          icon={Users}
          colorClass="text-blue-600 dark:text-blue-400"
          subtitle="Click to view"
          onClick={() => toggle('newToday')}
          active={activeMetric === 'newToday'}
        />
        <MetricCard
          title="Calls Due Today"
          value={metrics.callsDueLeads.length}
          icon={PhoneCall}
          colorClass="text-amber-600 dark:text-amber-400"
          subtitle="Click to view"
          onClick={() => toggle('callsToday')}
          active={activeMetric === 'callsToday'}
        />
        <MetricCard
          title="Hot Leads"
          value={metrics.hotLeads}
          icon={Flame}
          colorClass="text-red-600 dark:text-red-400"
          subtitle="Click to view"
          onClick={() => toggle('hot')}
          active={activeMetric === 'hot'}
        />
        <MetricCard
          title="In Pipeline"
          value={metrics.totalPipeline}
          icon={TrendingUp}
          colorClass="text-emerald-600 dark:text-emerald-400"
          subtitle="Click to view"
          onClick={() => toggle('pipeline')}
          active={activeMetric === 'pipeline'}
        />
      </div>

      {metrics.callsDueLeads.length > 0 && (
        <CallsDueToday leads={metrics.callsDueLeads} />
      )}
    </section>
  );
}
