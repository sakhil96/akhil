import { NextResponse } from 'next/server';
import { ChainError, releaseCompute, reserveCompute, snapshot } from '@/lib/nexora/chain';
import { withChain } from '@/lib/nexora/store';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      address?: string;
      amount?: number;
      region?: string;
      action?: 'reserve' | 'release';
    };
    if (!body.address || body.amount == null || !body.region) {
      return NextResponse.json(
        { error: 'address, amount, and region are required.' },
        { status: 400 },
      );
    }
    const action = body.action === 'release' ? 'release' : 'reserve';
    const view = await withChain((state) => {
      if (action === 'release') {
        releaseCompute(state, body.address!, Number(body.amount), body.region!);
      } else {
        reserveCompute(state, body.address!, Number(body.amount), body.region!);
      }
      return snapshot(state, body.address);
    });
    return NextResponse.json(view);
  } catch (error) {
    const status = error instanceof ChainError ? error.status : 500;
    const message = error instanceof Error ? error.message : 'Reservation failed.';
    return NextResponse.json({ error: message }, { status });
  }
}
