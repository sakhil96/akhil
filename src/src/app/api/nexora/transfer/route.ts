import { NextResponse } from 'next/server';
import { ChainError, snapshot, transfer } from '@/lib/nexora/chain';
import { withChain } from '@/lib/nexora/store';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      from?: string;
      to?: string;
      amount?: number;
      memo?: string;
    };
    if (!body.from || !body.to || body.amount == null) {
      return NextResponse.json({ error: 'from, to, and amount are required.' }, { status: 400 });
    }
    const view = await withChain((state) => {
      transfer(state, body.from!, body.to!, Number(body.amount), body.memo);
      return snapshot(state, body.from);
    });
    return NextResponse.json(view);
  } catch (error) {
    const status = error instanceof ChainError ? error.status : 500;
    const message = error instanceof Error ? error.message : 'Transfer failed.';
    return NextResponse.json({ error: message }, { status });
  }
}
