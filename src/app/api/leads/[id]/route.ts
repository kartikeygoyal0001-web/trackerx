import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import type { UpdateLeadInput } from '@/types/lead';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = getSupabaseServerClient();
  const { id } = await params;
  const body: UpdateLeadInput = await request.json();

  const { data, error } = await supabase
    .from('leads')
    .update(body)
    .eq('id', Number(id))
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
  const supabase = getSupabaseServerClient();
  const { id } = await params;

  const { error } = await supabase.from('leads').delete().eq('id', Number(id));

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
