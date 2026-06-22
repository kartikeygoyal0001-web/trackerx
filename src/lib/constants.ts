import type { Temperature, LeadStage, LeadSource, BuyerType, ObjectionType, LoanInterest, PropertyType } from '@/types/lead';

export const PROPERTY_TYPES: PropertyType[] = ['Farmhouse', 'House', 'Plots'];
export const SOURCES: LeadSource[] = ['Meta Ad', 'Referral', 'WhatsApp', 'Other'];
export const BUYER_TYPES: BuyerType[] = ['Family', 'Investor', 'HNI', 'Unknown'];
export const TEMPERATURES: Temperature[] = ['Hot', 'Warm', 'Cold'];
export const STAGES: LeadStage[] = [
  'New', 'Called', 'WhatsApp Sent', 'Interested',
  'Visit Scheduled', 'Visit Done', 'Negotiation', 'Closed', 'Dead',
];
export const OBJECTIONS: ObjectionType[] = [
  'Price', 'Location', 'Legality', 'Loan', 'Not Ready', 'None',
];
export const LOAN_INTERESTS: LoanInterest[] = ['Yes', 'No', 'Unknown'];

export const LOAN_INTEREST_COLORS: Record<LoanInterest, string> = {
  Yes: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  No: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Unknown: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export const TEMPERATURE_COLORS: Record<Temperature, string> = {
  Hot: 'bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
  Warm: 'bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
  Cold: 'bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
};

export const TEMPERATURE_ICONS: Record<Temperature, string> = {
  Hot: '🔥',
  Warm: '🌡️',
  Cold: '❄️',
};

export const STAGE_COLORS: Record<LeadStage, string> = {
  New: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  Called: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'WhatsApp Sent': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Interested: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  'Visit Scheduled': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Visit Done': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  Negotiation: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  Closed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Dead: 'bg-red-50 text-red-400 line-through dark:bg-red-900/20 dark:text-red-600',
};
