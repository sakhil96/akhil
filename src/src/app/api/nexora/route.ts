import { NextResponse } from 'next/server';
import { snapshot } from '@/lib/nexora/chain';
import { readChain } from '@/lib/nexora/store';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const address = url.searchParams.get('address') ?? undefined;
  const state = await readChain();
  return NextResponse.json(snapshot(state, address));
}
