import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  ChainError,
  claimFaucet,
  createWallet,
  genesisState,
  releaseCompute,
  reserveCompute,
  snapshot,
  totalSupply,
  transfer,
} from './chain';
import { NEXORA } from './tokenomics';

describe('Nexora hosted chain', () => {
  it('mints a fixed 10 million supply at genesis', () => {
    const state = genesisState();
    assert.equal(totalSupply(state), 10_000_000);
    assert.equal(snapshot(state).token.symbol, 'NXR');
    assert.equal(snapshot(state).circulating, 0);
  });

  it('lets a new wallet claim 42 NXR once', () => {
    const state = genesisState();
    const wallet = createWallet(state, 'Test node');
    const tx = claimFaucet(state, wallet.address);
    assert.equal(tx.amount, 42);
    assert.equal(wallet.liquid, 42);
    assert.equal(wallet.claimedFaucet, true);
    assert.throws(() => claimFaucet(state, wallet.address), ChainError);
  });

  it('transfers liquid NXR between wallets', () => {
    const state = genesisState();
    const a = createWallet(state, 'A');
    const b = createWallet(state, 'B');
    claimFaucet(state, a.address);
    transfer(state, a.address, b.address, 10, 'settlement');
    assert.equal(a.liquid, 32);
    assert.equal(b.liquid, 10);
    assert.equal(totalSupply(state), NEXORA.totalSupply);
  });

  it('reserves and releases photonic inference in a region', () => {
    const state = genesisState();
    const wallet = createWallet(state);
    claimFaucet(state, wallet.address);
    reserveCompute(state, wallet.address, 20, 'aurora-7');
    assert.equal(wallet.liquid, 22);
    assert.equal(wallet.reserved, 20);
    assert.equal(wallet.reservations['aurora-7'], 20);
    releaseCompute(state, wallet.address, 5, 'aurora-7');
    assert.equal(wallet.reserved, 15);
    assert.equal(wallet.liquid, 27);
    const view = snapshot(state);
    const aurora = view.regions.find((region) => region.id === 'aurora-7');
    assert.equal(aurora?.reserved, 15);
  });

  it('rejects over-capacity reservations', () => {
    const state = genesisState();
    const wallet = createWallet(state);
    claimFaucet(state, wallet.address);
    assert.throws(
      () => reserveCompute(state, wallet.address, 50, 'pulse-zero'),
      /enough liquid/,
    );
  });
});
