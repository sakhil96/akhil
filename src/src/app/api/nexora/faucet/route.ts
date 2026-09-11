import { NextResponse } from 'next/server';
import { ChainError, claimFaucet, snapshot } from '@/lib/nexora/chain';
import { withChain } from '@/lib/nexora/store';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { address?: string };
    if (!body.address) {
      return NextResponse.json({ error: 'Address required.' }, { status: 400 });
    }
    const view = await withChain((state) => {
      claimFaucet(state, body.address!);
      return snapshot(state, body.address);
    });
    return NextResponse.json(view);
  } catch (error) {
    const status = error instanceof ChainError ? error.status : 500;
    const message = error instanceof Error ? error.message : 'Faucet failed.';
    return NextResponse.json({ error: message }, { status });
  }
}
