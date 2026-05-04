import { NextRequest, NextResponse } from 'next/server';
import { calculateKelly } from '../../../lib/math/kelly';
import type { KellyApiResponse, KellyInput } from '../../../types';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as KellyInput;
    const data = calculateKelly(body);

    return NextResponse.json<KellyApiResponse>({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json<KellyApiResponse>({ error: message }, { status: 400 });
  }
}
