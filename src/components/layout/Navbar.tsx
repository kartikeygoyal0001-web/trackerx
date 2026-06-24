import { Building2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LogoutButton } from './LogoutButton';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export async function Navbar() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-4 w-4" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Tracker<span className="text-primary opacity-60">X</span>
          </span>
          <span className="hidden sm:inline-flex ml-2 text-xs text-muted-foreground border border-border rounded-full px-2 py-0.5">
            Real Estate CRM
          </span>
        </div>

        {/* Firm name — centered */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-tight pointer-events-none select-none">
          <span className="text-base font-bold tracking-tight">Vistara Estates</span>
          <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Real Estate</span>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <span className="hidden md:block text-xs text-muted-foreground truncate max-w-[160px]">
              {user.email}
            </span>
          )}
          <ThemeToggle />
          {user && <LogoutButton />}
        </div>
      </div>
    </header>
  );
}
