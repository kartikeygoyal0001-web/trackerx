'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { STAGES, TEMPERATURES, SOURCES } from '@/lib/constants';
import type { LeadStage, Temperature, LeadSource } from '@/types/lead';

export interface FilterState {
  stage: LeadStage | 'All';
  temperature: Temperature | 'All';
  source: LeadSource | 'All';
  search: string;
  followUpToday: boolean;
  addedToday: boolean;
  activePipelineOnly: boolean;
}

export const DEFAULT_FILTERS: FilterState = {
  stage: 'All',
  temperature: 'All',
  source: 'All',
  search: '',
  followUpToday: false,
  addedToday: false,
  activePipelineOnly: false,
};

interface LeadFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  total: number;
  filtered: number;
}

export function LeadFilters({ filters, onChange, total, filtered }: LeadFiltersProps) {
  const hasActive =
    filters.search ||
    filters.stage !== 'All' ||
    filters.temperature !== 'All' ||
    filters.source !== 'All' ||
    filters.followUpToday ||
    filters.addedToday ||
    filters.activePipelineOnly;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            className="pl-8 h-9"
            placeholder="Search name or phone…"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
          />
        </div>

        {/* Stage */}
        <Select
          value={filters.stage}
          onValueChange={(v) => v && onChange({ ...filters, stage: v as FilterState['stage'] })}
        >
          <SelectTrigger className="w-[150px] h-9">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Stages</SelectItem>
            {STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>

        {/* Temperature */}
        <Select
          value={filters.temperature}
          onValueChange={(v) => v && onChange({ ...filters, temperature: v as FilterState['temperature'] })}
        >
          <SelectTrigger className="w-[130px] h-9">
            <SelectValue placeholder="Temp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Temps</SelectItem>
            {TEMPERATURES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>

        {/* Source */}
        <Select
          value={filters.source}
          onValueChange={(v) => v && onChange({ ...filters, source: v as FilterState['source'] })}
        >
          <SelectTrigger className="w-[130px] h-9">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Sources</SelectItem>
            {SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>

        {hasActive && (
          <Button variant="ghost" size="sm" onClick={() => onChange(DEFAULT_FILTERS)} className="h-9 gap-1">
            <X className="h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      {/* Active quick-filter chips */}
      {(filters.followUpToday || filters.addedToday || filters.activePipelineOnly) && (
        <div className="flex flex-wrap gap-1.5">
          {filters.followUpToday && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 font-medium">
              📞 Calls Due Today
              <button onClick={() => onChange({ ...filters, followUpToday: false })} className="ml-0.5 hover:opacity-70">×</button>
            </span>
          )}
          {filters.addedToday && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium">
              🆕 Added Today
              <button onClick={() => onChange({ ...filters, addedToday: false })} className="ml-0.5 hover:opacity-70">×</button>
            </span>
          )}
          {filters.activePipelineOnly && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-medium">
              📈 Active Pipeline
              <button onClick={() => onChange({ ...filters, activePipelineOnly: false })} className="ml-0.5 hover:opacity-70">×</button>
            </span>
          )}
        </div>
      )}

      {hasActive && (
        <p className="text-xs text-muted-foreground">
          Showing {filtered} of {total} leads
        </p>
      )}
    </div>
  );
}
