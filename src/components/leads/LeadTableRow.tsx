'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TemperatureBadge } from '@/components/ui/TemperatureBadge';
import { StagePill } from '@/components/ui/StagePill';
import { FollowUpDate } from '@/components/ui/FollowUpDate';
import { Pencil, Trash2, MessageCircle } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { TEMPERATURES, STAGES, LOAN_INTEREST_COLORS } from '@/lib/constants';
import type { Lead } from '@/types/lead';

interface LeadTableRowProps {
  lead: Lead;
  displayIndex: number;
  onEdit: (lead: Lead) => void;
  onDelete: (id: number) => void;
  onInlineChange: (id: number, field: string, value: string) => void;
}

export function LeadTableRow({ lead, displayIndex, onEdit, onDelete, onInlineChange }: LeadTableRowProps) {
  const [editingNote, setEditingNote] = useState(false);
  const [noteVal, setNoteVal] = useState(lead.notes ?? '');
  const noteRef = useRef<HTMLTextAreaElement>(null);

  function saveNote() {
    setEditingNote(false);
    if (noteVal !== lead.notes) {
      onInlineChange(lead.id, 'notes', noteVal);
    }
  }

  function handleDeleteClick() {
    if (confirm(`Delete lead L${String(displayIndex).padStart(3, '0')} (${lead.name})? This cannot be undone.`)) {
      onDelete(lead.id);
    }
  }

  return (
    <tr className={cn(
      'border-b border-border transition-colors hover:bg-muted/30 h-14',
      lead.stage === 'Dead' && 'opacity-60',
    )}>
      {/* Lead ID */}
      <td className="px-3 py-0 align-middle text-xs font-mono text-muted-foreground whitespace-nowrap">{'L' + String(displayIndex).padStart(3, '0')}</td>

      {/* Name */}
      <td className="px-3 py-0 align-middle font-medium text-sm whitespace-nowrap max-w-[140px] truncate">{lead.name}</td>

      {/* Phone — WhatsApp link */}
      <td className="px-3 py-0 align-middle whitespace-nowrap">
        <a
          href={`https://wa.me/91${lead.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 hover:underline font-mono"
        >
          <MessageCircle className="h-3 w-3 shrink-0" />
          {lead.phone}
        </a>
      </td>

      {/* Date Added */}
      <td className="px-3 py-0 align-middle text-xs text-muted-foreground whitespace-nowrap hidden md:table-cell">
        {formatDate(lead.date_added)}
      </td>

      {/* Property Type */}
      <td className="px-3 py-0 align-middle text-xs whitespace-nowrap hidden md:table-cell">
        <span className="px-2 py-0.5 rounded-full font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
          {lead.property_type}
        </span>
      </td>

      {/* Source */}
      <td className="px-3 py-0 align-middle text-xs whitespace-nowrap hidden lg:table-cell">{lead.source}</td>

      {/* Buyer Type */}
      <td className="px-3 py-0 align-middle text-xs whitespace-nowrap hidden xl:table-cell">{lead.buyer_type}</td>

      {/* Temperature — inline select */}
      <td className="px-3 py-0 align-middle">
        <Select
          value={lead.temperature}
          onValueChange={(v) => v && onInlineChange(lead.id, 'temperature', v)}
        >
          <SelectTrigger className="h-auto border-0 p-0 shadow-none focus:ring-0 bg-transparent w-auto">
            <SelectValue>
              <TemperatureBadge value={lead.temperature} />
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {TEMPERATURES.map((t) => (
              <SelectItem key={t} value={t}>
                <TemperatureBadge value={t} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </td>

      {/* Stage — inline select */}
      <td className="px-3 py-0 align-middle">
        <Select
          value={lead.stage}
          onValueChange={(v) => v && onInlineChange(lead.id, 'stage', v)}
        >
          <SelectTrigger className="h-auto border-0 p-0 shadow-none focus:ring-0 bg-transparent w-auto">
            <SelectValue>
              <StagePill value={lead.stage} />
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {STAGES.map((s) => (
              <SelectItem key={s} value={s}>
                <StagePill value={s} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </td>

      {/* Last Contacted */}
      <td className="px-3 py-0 align-middle text-xs text-muted-foreground whitespace-nowrap hidden lg:table-cell">
        {formatDate(lead.last_contacted)}
      </td>

      {/* Follow-up Date */}
      <td className="px-3 py-0 align-middle whitespace-nowrap">
        <FollowUpDate value={lead.follow_up_date} />
      </td>

      {/* Objection */}
      <td className="px-3 py-0 align-middle text-xs whitespace-nowrap hidden xl:table-cell">
        {lead.objection !== 'None' ? (
          <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground">{lead.objection}</span>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </td>

      {/* Loan Interest */}
      <td className="px-3 py-0 align-middle text-xs whitespace-nowrap hidden xl:table-cell">
        <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', LOAN_INTEREST_COLORS[lead.loan_interest])}>
          {lead.loan_interest}
        </span>
      </td>

      {/* Notes — inline editing */}
      <td className="px-3 py-0 max-w-[180px] hidden md:table-cell align-middle">
        <div className="h-10 flex items-center overflow-hidden">
          {editingNote ? (
            <textarea
              ref={noteRef}
              value={noteVal}
              onChange={(e) => setNoteVal(e.target.value)}
              onBlur={saveNote}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), saveNote())}
              className="w-full min-w-[150px] resize-none text-xs rounded border border-input bg-background px-2 py-1 focus:outline-none focus:ring-1 focus:ring-ring"
              rows={2}
              autoFocus
            />
          ) : (
            <span
              onClick={() => { setNoteVal(lead.notes ?? ''); setEditingNote(true); }}
              className="text-xs text-foreground cursor-text hover:bg-muted/50 rounded px-1 py-0.5 transition-colors w-full overflow-hidden text-ellipsis whitespace-nowrap"
              title={lead.notes || undefined}
            >
              {lead.notes || <span className="text-muted-foreground italic">Click to add…</span>}
            </span>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="px-3 py-0 align-middle whitespace-nowrap">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onEdit(lead)}
            aria-label="Edit lead"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleDeleteClick}
            aria-label="Delete lead"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
