'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { downloadCSV } from '@/lib/csv';
import type { Lead } from '@/types/lead';

interface ExportCSVButtonProps {
  leads: Lead[];
}

export function ExportCSVButton({ leads }: ExportCSVButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => downloadCSV(leads)}
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      <span className="hidden sm:inline">Export CSV</span>
    </Button>
  );
}
