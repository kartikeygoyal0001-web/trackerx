import { NextResponse } from 'next/server';
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase/server';
import type { UpdateLeadInput } from '@/types/lead';

async function getAuthUser() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = getSupabaseAdminClient();
  const { id } = await params;
  const body: UpdateLeadInput = await request.json();

  const { data, error } = await supabase
    .from('leads')
    .update(body)
    .eq('id', Number(id))
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('[PATCH /api/leads/:id]', error);
    return NextResponse.json({ error: error.message, details: error.details, hint: error.hint }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = getSupabaseAdminClient();
  const { id } = await params;

  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', Number(id))
    .eq('user_id', user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
