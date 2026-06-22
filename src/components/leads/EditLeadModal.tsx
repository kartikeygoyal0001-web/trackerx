'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LeadFormFields } from './LeadFormFields';
import type { Lead, CreateLeadInput, UpdateLeadInput, LoanInterest, PropertyType } from '@/types/lead';

interface EditLeadModalProps {
  open: boolean;
  lead: Lead | null;
  onClose: () => void;
  onSave: (id: number, data: UpdateLeadInput) => Promise<void>;
}

function leadToForm(lead: Lead): Partial<CreateLeadInput> {
  return {
    name: lead.name,
    phone: lead.phone,
    date_added: lead.date_added,
    property_type: (lead.property_type ?? 'Farmhouse') as PropertyType,
    source: lead.source,
    buyer_type: lead.buyer_type,
    temperature: lead.temperature,
    stage: lead.stage,
    last_contacted: lead.last_contacted,
    follow_up_date: lead.follow_up_date,
    objection: lead.objection,
    loan_interest: (lead.loan_interest ?? 'Unknown') as LoanInterest,
    notes: lead.notes,
  };
}

interface EditLeadFormProps {
  lead: Lead;
  onClose: () => void;
  onSave: (id: number, data: UpdateLeadInput) => Promise<void>;
}

function EditLeadForm({ lead, onClose, onSave }: EditLeadFormProps) {
  const [form, setForm] = useState<Partial<CreateLeadInput>>(() => leadToForm(lead));
  const [errors, setErrors] = useState<Partial<Record<keyof CreateLeadInput, string>>>({});
  const [loading, setLoading] = useState(false);

  function handleChange(field: keyof CreateLeadInput, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: (field === 'last_contacted' || field === 'follow_up_date') ? (value || null) : value,
    }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!form.name?.trim()) newErrors.name = 'Name is required';
    if (!form.phone?.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone.trim())) newErrors.phone = 'Enter a valid 10-digit number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    try {
      await onSave(lead.id, form as UpdateLeadInput);
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <LeadFormFields data={form} onChange={handleChange} errors={errors} />
      <DialogFooter className="mt-2">
        <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving…' : 'Save Changes'}
        </Button>
      </DialogFooter>
    </>
  );
}

export function EditLeadModal({ open, lead, onClose, onSave }: EditLeadModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Edit Lead{lead ? ` — ${lead.lead_id}` : ''}
          </DialogTitle>
        </DialogHeader>
        {lead && (
          <EditLeadForm
            key={lead.id}
            lead={lead}
            onClose={onClose}
            onSave={onSave}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
