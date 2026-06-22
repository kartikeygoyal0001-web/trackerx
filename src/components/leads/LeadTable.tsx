import { LeadTableRow } from './LeadTableRow';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Lead } from '@/types/lead';

interface LeadTableProps {
  leads: Lead[];
  sortField: keyof Lead;
  sortDir: 'asc' | 'desc';
  onSort: (field: keyof Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (id: number) => void;
  onInlineChange: (id: number, field: string, value: string) => void;
}

interface ColDef {
  label: string;
  field: keyof Lead;
  className?: string;
}

const COLUMNS: ColDef[] = [
  { label: 'ID', field: 'lead_id', className: 'w-14' },
  { label: 'Name', field: 'name' },
  { label: 'Phone', field: 'phone' },
  { label: 'Date Added', field: 'date_added', className: 'hidden md:table-cell' },
  { label: 'Property', field: 'property_type', className: 'hidden md:table-cell' },
  { label: 'Source', field: 'source', className: 'hidden lg:table-cell' },
  { label: 'Buyer', field: 'buyer_type', className: 'hidden xl:table-cell' },
  { label: 'Temp', field: 'temperature' },
  { label: 'Stage', field: 'stage' },
  { label: 'Last Contact', field: 'last_contacted', className: 'hidden lg:table-cell' },
  { label: 'Follow-up', field: 'follow_up_date' },
  { label: 'Objection', field: 'objection', className: 'hidden xl:table-cell' },
  { label: 'Loan', field: 'loan_interest', className: 'hidden xl:table-cell' },
  { label: 'Notes', field: 'notes', className: 'hidden md:table-cell' },
];

function SortIcon({ field, sortField, sortDir }: { field: keyof Lead; sortField: keyof Lead; sortDir: 'asc' | 'desc' }) {
  if (field !== sortField) return <ArrowUpDown className="h-3 w-3 opacity-30" />;
  return sortDir === 'asc'
    ? <ArrowUp className="h-3 w-3" />
    : <ArrowDown className="h-3 w-3" />;
}

export function LeadTable({ leads, sortField, sortDir, onSort, onEdit, onDelete, onInlineChange }: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-muted/20 flex flex-col items-center justify-center py-16 text-center">
        <p className="text-2xl mb-2">🏠</p>
        <p className="font-medium text-muted-foreground">No leads found</p>
        <p className="text-sm text-muted-foreground mt-1">Add your first lead to get started</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              {COLUMNS.map((col) => (
                <th
                  key={col.field}
                  className={cn(
                    'px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap cursor-pointer select-none hover:text-foreground transition-colors',
                    col.className,
                  )}
                  onClick={() => onSort(col.field)}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    <SortIcon field={col.field} sortField={sortField} sortDir={sortDir} />
                  </span>
                </th>
              ))}
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <LeadTableRow
                key={lead.id}
                lead={lead}
                displayIndex={index + 1}
                onEdit={onEdit}
                onDelete={onDelete}
                onInlineChange={onInlineChange}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 border-t border-border bg-muted/20 text-xs text-muted-foreground">
        {leads.length} lead{leads.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
