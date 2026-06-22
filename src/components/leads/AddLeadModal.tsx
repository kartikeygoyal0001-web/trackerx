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
import { todayISO } from '@/lib/utils';
import type { CreateLeadInput } from '@/types/lead';

const DEFAULT_FORM: CreateLeadInput = {
  name: '',
  phone: '',
  date_added: '',
  property_type: 'Farmhouse',
  source: 'Meta Ad',
  buyer_type: 'Unknown',
  temperature: 'Warm',
  stage: 'New',
  last_contacted: null,
  follow_up_date: null,
  objection: 'None',
  loan_interest: 'Unknown',
  notes: '',
};

interface AddLeadModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: CreateLeadInput) => Promise<void>;
}

export function AddLeadModal({ open, onClose, onAdd }: AddLeadModalProps) {
  const [form, setForm] = useState<CreateLeadInput>({ ...DEFAULT_FORM, date_added: todayISO() });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateLeadInput, string>>>({});
  const [loading, setLoading] = useState(false);

  function handleChange(field: keyof CreateLeadInput, value: string) {
    setForm((prev) => ({ ...prev, [field]: value || (field === 'last_contacted' || field === 'follow_up_date' ? null : value) }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone.trim())) newErrors.phone = 'Enter a valid 10-digit number';
    if (!form.source) newErrors.source = 'Source is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    try {
      await onAdd(form);
      setForm({ ...DEFAULT_FORM, date_added: todayISO() });
      setErrors({});
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>
        <LeadFormFields data={form} onChange={handleChange} errors={errors} />
        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Adding…' : 'Add Lead'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
