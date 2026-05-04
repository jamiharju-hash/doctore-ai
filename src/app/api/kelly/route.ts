import { NextRequest, NextResponse } from 'next/server';
import { calculateKellyFraction } from '@/lib/math/kelly';
import { ensureApiAuth } from '@/lib/supabase/server';
import { kellyInputSchema } from '@/lib/validation/schemas';

export async function POST(request: NextRequest) {
  const auth = await ensureApiAuth();
  if (auth.response) return auth.response;

  const body = await request.json();
  const parsed = kellyInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const kellyFraction = calculateKellyFraction(parsed.data);

  return NextResponse.json({ userId: auth.userId, kellyFraction });
}
