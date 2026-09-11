import { NextResponse } from 'next/server';
import { ChainError, createWallet, snapshot } from '@/lib/nexora/chain';
import { withChain } from '@/lib/nexora/store';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as { label?: string };
    const view = await withChain((state) => {
      const wallet = createWallet(state, body.label);
      return snapshot(state, wallet.address);
    });
    return NextResponse.json(view, { status: 201 });
  } catch (error) {
    const status = error instanceof ChainError ? error.status : 500;
    const message = error instanceof Error ? error.message : 'Wallet creation failed.';
    return NextResponse.json({ error: message }, { status });
  }
}
