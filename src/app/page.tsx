import { getSupabaseServerClient } from '@/lib/supabase/server';
import { PageClient } from '@/components/PageClient';
import type { Lead } from '@/types/lead';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-2xl mb-2">⚠️</p>
        <p className="font-semibold text-destructive">Database connection error</p>
        <p className="text-sm text-muted-foreground mt-1">
          Make sure your Supabase environment variables are set in{' '}
          <code className="bg-muted px-1 rounded">.env.local</code>
        </p>
        <pre className="mt-4 text-xs bg-muted rounded p-3 text-left max-w-lg overflow-x-auto">
          {error.message}
        </pre>
      </div>
    );
  }

  return <PageClient initialLeads={(data ?? []) as Lead[]} />;
}
