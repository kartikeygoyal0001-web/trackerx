export type PropertyType = 'Farmhouse' | 'House' | 'Plots';
export type LeadSource = 'Meta Ad' | 'Referral' | 'WhatsApp' | 'Other';
export type BuyerType = 'Family' | 'Investor' | 'HNI' | 'Unknown';
export type Temperature = 'Hot' | 'Warm' | 'Cold';
export type LoanInterest = 'Yes' | 'No' | 'Unknown';
export type LeadStage =
  | 'New'
  | 'Called'
  | 'WhatsApp Sent'
  | 'Interested'
  | 'Visit Scheduled'
  | 'Visit Done'
  | 'Negotiation'
  | 'Closed'
  | 'Dead';
export type ObjectionType =
  | 'Price'
  | 'Location'
  | 'Legality'
  | 'Loan'
  | 'Not Ready'
  | 'None';

export interface Lead {
  id: number;
  lead_id: string;
  user_id: string;
  name: string;
  phone: string;
  date_added: string;
  source: LeadSource;
  buyer_type: BuyerType;
  temperature: Temperature;
  stage: LeadStage;
  last_contacted: string | null;
  follow_up_date: string | null;
  property_type: PropertyType;
  objection: ObjectionType;
  loan_interest: LoanInterest;
  notes: string;
  created_at: string;
  updated_at: string;
}

export type CreateLeadInput = Omit<Lead, 'id' | 'lead_id' | 'user_id' | 'created_at' | 'updated_at'>;
export type UpdateLeadInput = Partial<CreateLeadInput>;
