'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={loading}
      className="gap-1.5 text-muted-foreground hover:text-foreground"
    >
      {loading
        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
        : <LogOut className="h-3.5 w-3.5" />}
      <span className="hidden sm:inline">Logout</span>
    </Button>
  );
}
