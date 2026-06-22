import type { Lead } from '@/types/lead';

export function downloadCSV(leads: Lead[]): void {
  const headers = [
    'Lead ID', 'Name', 'Phone', 'Date Added', 'Property Type', 'Source', 'Buyer Type',
    'Temperature', 'Stage', 'Last Contacted', 'Follow-up Date',
    'Objection', 'Loan Interest', 'Notes', 'Created At',
  ];

  const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;

  const rows = leads.map((l) => [
    l.lead_id,
    escape(l.name),
    l.phone,
    l.date_added,
    l.property_type,
    l.source,
    l.buyer_type,
    l.temperature,
    l.stage,
    l.last_contacted ?? '',
    l.follow_up_date ?? '',
    l.objection,
    l.loan_interest,
    escape(l.notes ?? ''),
    l.created_at,
  ]);

  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `trackerx-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
