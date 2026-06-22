'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { LeadTable } from './LeadTable';
import { LeadFilters, FilterState, DEFAULT_FILTERS } from './LeadFilters';
import { AddLeadModal } from './AddLeadModal';
import { EditLeadModal } from './EditLeadModal';
import { isToday, todayISO } from '@/lib/utils';
import type { Lead, CreateLeadInput, UpdateLeadInput } from '@/types/lead';

export type ActiveMetric = 'hot' | 'callsToday' | 'newToday' | 'pipeline' | null;

interface LeadTrackerSectionProps {
  leads: Lead[];
  activeMetric: ActiveMetric;
  onAdd: (data: CreateLeadInput) => Promise<void>;
  onEdit: (id: number, data: UpdateLeadInput) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onInlineChange: (id: number, field: string, value: string) => Promise<void>;
}

function metricToFilter(metric: ActiveMetric): FilterState {
  switch (metric) {
    case 'hot':
      return { ...DEFAULT_FILTERS, temperature: 'Hot' };
    case 'callsToday':
      return { ...DEFAULT_FILTERS, followUpToday: true };
    case 'newToday':
      return { ...DEFAULT_FILTERS, addedToday: true };
    case 'pipeline':
      return { ...DEFAULT_FILTERS, activePipelineOnly: true };
    default:
      return DEFAULT_FILTERS;
  }
}

export function LeadTrackerSection({ leads, activeMetric, onAdd, onEdit, onDelete, onInlineChange }: LeadTrackerSectionProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortField, setSortField] = useState<keyof Lead>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Lead | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setFilters(metricToFilter(activeMetric));
    if (activeMetric && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeMetric]);

  function handleSort(field: keyof Lead) {
    if (field === sortField) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  }

  const displayLeads = useMemo(() => {
    const today = todayISO();
    let result = leads.filter((lead) => {
      if (filters.stage !== 'All' && lead.stage !== filters.stage) return false;
      if (filters.temperature !== 'All' && lead.temperature !== filters.temperature) return false;
      if (filters.source !== 'All' && lead.source !== filters.source) return false;
      if (filters.followUpToday && !isToday(lead.follow_up_date)) return false;
      if (filters.addedToday && lead.date_added !== today) return false;
      if (filters.activePipelineOnly && (lead.stage === 'Closed' || lead.stage === 'Dead')) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        return lead.name.toLowerCase().includes(q) || lead.phone.includes(q);
      }
      return true;
    });

    result = [...result].sort((a, b) => {
      const av = String(a[sortField] ?? '');
      const bv = String(b[sortField] ?? '');
      const cmp = av.localeCompare(bv, undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [leads, filters, sortField, sortDir]);

  return (
    <section ref={sectionRef} className="space-y-4 scroll-mt-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Lead Tracker</h2>
          <p className="text-sm text-muted-foreground">{leads.length} total leads</p>
        </div>
        <Button onClick={() => setAddOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Lead</span>
        </Button>
      </div>

      <LeadFilters
        filters={filters}
        onChange={setFilters}
        total={leads.length}
        filtered={displayLeads.length}
      />

      <LeadTable
        leads={displayLeads}
        sortField={sortField}
        sortDir={sortDir}
        onSort={handleSort}
        onEdit={(lead) => setEditTarget(lead)}
        onDelete={onDelete}
        onInlineChange={onInlineChange}
      />

      <AddLeadModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={onAdd} />
      <EditLeadModal
        open={editTarget !== null}
        lead={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={onEdit}
      />
    </section>
  );
}
