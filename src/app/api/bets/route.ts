import { NextRequest, NextResponse } from 'next/server';
import { calculateExpectedValue } from '@/lib/math/ev';
import { calculateKellyFraction } from '@/lib/math/kelly';
import { ensureApiAuth } from '@/lib/supabase/server';
import { betInputSchema } from '@/lib/validation/schemas';

export async function POST(request: NextRequest) {
  const auth = await ensureApiAuth();
  if (auth.response) return auth.response;

  const body = await request.json();
  const parsed = betInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const expectedValue = calculateExpectedValue(parsed.data);
  const kellyFraction = calculateKellyFraction(parsed.data);

  return NextResponse.json({
    userId: auth.userId,
    expectedValue,
    kellyFraction
  });
}
