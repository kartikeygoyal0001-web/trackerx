'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardSection } from '@/components/dashboard/DashboardSection';
import { LeadTrackerSection } from '@/components/leads/LeadTrackerSection';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { Lead, CreateLeadInput, UpdateLeadInput } from '@/types/lead';
import type { ActiveMetric } from '@/components/leads/LeadTrackerSection';

interface PageClientProps {
  initialLeads: Lead[];
}

async function fetchLeads(): Promise<Lead[]> {
  const res = await fetch('/api/leads');
  if (!res.ok) throw new Error('Failed to fetch leads');
  return res.json();
}

export function PageClient({ initialLeads }: PageClientProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeMetric, setActiveMetric] = useState<ActiveMetric>(null);

  const refresh = useCallback(async () => {
    try {
      setLeads(await fetchLeads());
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Supabase Realtime — live updates across browser tabs
  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    const channel = supabase
      .channel('leads-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        refresh();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [refresh]);

  async function handleAdd(data: CreateLeadInput) {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to add lead');
    await refresh();
  }

  async function handleEdit(id: number, data: UpdateLeadInput) {
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error ?? 'Failed to update lead');
    }
    await refresh();
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete lead');
    await refresh();
  }

  async function handleInlineChange(id: number, field: string, value: string) {
    await handleEdit(id, { [field]: value || null } as UpdateLeadInput);
  }

  return (
    <div className="space-y-8">
      <DashboardSection
        leads={leads}
        activeMetric={activeMetric}
        onMetricClick={setActiveMetric}
      />
      <LeadTrackerSection
        leads={leads}
        activeMetric={activeMetric}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onInlineChange={handleInlineChange}
      />
    </div>
  );
}
