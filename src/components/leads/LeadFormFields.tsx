import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SOURCES, BUYER_TYPES, TEMPERATURES, STAGES, OBJECTIONS, LOAN_INTERESTS, PROPERTY_TYPES } from '@/lib/constants';
import type { CreateLeadInput } from '@/types/lead';

interface LeadFormFieldsProps {
  data: Partial<CreateLeadInput>;
  onChange: (field: keyof CreateLeadInput, value: string) => void;
  errors?: Partial<Record<keyof CreateLeadInput, string>>;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-destructive mt-1">{msg}</p>;
}

export function LeadFormFields({ data, onChange, errors = {} }: LeadFormFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Name */}
      <div className="space-y-1">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={data.name ?? ''}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="e.g. Rahul Sharma"
        />
        <FieldError msg={errors.name} />
      </div>

      {/* Phone */}
      <div className="space-y-1">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          value={data.phone ?? ''}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="10-digit number"
          maxLength={10}
        />
        <FieldError msg={errors.phone} />
      </div>

      {/* Property Type */}
      <div className="space-y-1">
        <Label>Property Type *</Label>
        <Select value={data.property_type ?? undefined} onValueChange={(v) => v && onChange('property_type', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select property" />
          </SelectTrigger>
          <SelectContent>
            {PROPERTY_TYPES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Source */}
      <div className="space-y-1">
        <Label>Source *</Label>
        <Select value={data.source ?? undefined} onValueChange={(v) => v && onChange('source', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent>
            {SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <FieldError msg={errors.source} />
      </div>

      {/* Buyer Type */}
      <div className="space-y-1">
        <Label>Buyer Type</Label>
        <Select value={data.buyer_type ?? undefined} onValueChange={(v) => v && onChange('buyer_type', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {BUYER_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Temperature */}
      <div className="space-y-1">
        <Label>Temperature</Label>
        <Select value={data.temperature ?? undefined} onValueChange={(v) => v && onChange('temperature', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select temperature" />
          </SelectTrigger>
          <SelectContent>
            {TEMPERATURES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Stage */}
      <div className="space-y-1">
        <Label>Stage</Label>
        <Select value={data.stage ?? undefined} onValueChange={(v) => v && onChange('stage', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select stage" />
          </SelectTrigger>
          <SelectContent>
            {STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Last Contacted */}
      <div className="space-y-1">
        <Label htmlFor="last_contacted">Last Contacted</Label>
        <Input
          id="last_contacted"
          type="date"
          value={data.last_contacted ?? ''}
          onChange={(e) => onChange('last_contacted', e.target.value)}
        />
      </div>

      {/* Follow-up Date */}
      <div className="space-y-1">
        <Label htmlFor="follow_up_date">Follow-up Date</Label>
        <Input
          id="follow_up_date"
          type="date"
          value={data.follow_up_date ?? ''}
          onChange={(e) => onChange('follow_up_date', e.target.value)}
        />
      </div>

      {/* Objection */}
      <div className="space-y-1">
        <Label>Objection</Label>
        <Select value={data.objection ?? undefined} onValueChange={(v) => v && onChange('objection', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select objection" />
          </SelectTrigger>
          <SelectContent>
            {OBJECTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Loan Interest */}
      <div className="space-y-1">
        <Label>Loan Interest</Label>
        <Select value={data.loan_interest ?? undefined} onValueChange={(v) => v && onChange('loan_interest', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Loan needed?" />
          </SelectTrigger>
          <SelectContent>
            {LOAN_INTERESTS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Date Added */}
      <div className="space-y-1">
        <Label htmlFor="date_added">Date Added</Label>
        <Input
          id="date_added"
          type="date"
          value={data.date_added ?? ''}
          onChange={(e) => onChange('date_added', e.target.value)}
        />
      </div>

      {/* Notes — full width */}
      <div className="space-y-1 sm:col-span-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={data.notes ?? ''}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Any additional notes..."
          rows={3}
        />
      </div>
    </div>
  );
}
