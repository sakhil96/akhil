import { randomBytes } from 'node:crypto';
import {
  GENESIS_VAULT,
  NEXORA,
  REGIONS,
  VAULTS,
  isNexoraAddress,
  isRegionId,
  type NexoraRegionId,
} from './tokenomics';

export type Account = {
  address: string;
  label: string;
  liquid: number;
  reserved: number;
  reservations: Partial<Record<NexoraRegionId, number>>;
  claimedFaucet: boolean;
  createdAt: string;
  system?: boolean;
};

export type TxKind = 'genesis' | 'faucet' | 'transfer' | 'reserve' | 'release';

export type ChainTx = {
  id: string;
  height: number;
  kind: TxKind;
  from: string;
  to: string;
  amount: number;
  memo: string;
  region?: NexoraRegionId;
  at: string;
};

export type ChainState = {
  chainId: typeof NEXORA.chainId;
  height: number;
  genesisAt: string;
  accounts: Record<string, Account>;
  txs: ChainTx[];
};

export class ChainError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = 'ChainError';
    this.status = status;
  }
}

function nowIso() {
  return new Date().toISOString();
}

function txId(height: number) {
  return `nxrtx_${height.toString(16).padStart(6, '0')}_${randomBytes(4).toString('hex')}`;
}

function ensureAccount(state: ChainState, address: string, label = 'Grid wallet'): Account {
  const existing = state.accounts[address];
  if (existing) return existing;
  const account: Account = {
    address,
    label,
    liquid: 0,
    reserved: 0,
    reservations: {},
    claimedFaucet: false,
    createdAt: nowIso(),
  };
  state.accounts[address] = account;
  return account;
}

function pushTx(
  state: ChainState,
  kind: TxKind,
  from: string,
  to: string,
  amount: number,
  memo: string,
  region?: NexoraRegionId,
) {
  state.height += 1;
  state.txs.unshift({
    id: txId(state.height),
    height: state.height,
    kind,
    from,
    to,
    amount,
    memo,
    region,
    at: nowIso(),
  });
  state.txs = state.txs.slice(0, 200);
}

export function genesisState(): ChainState {
  const genesisAt = '2032-01-11T00:00:00.000Z';
  const accounts: Record<string, Account> = {};

  for (const vault of VAULTS) {
    accounts[vault.address] = {
      address: vault.address,
      label: vault.label,
      liquid: vault.amount,
      reserved: 0,
      reservations: {},
      claimedFaucet: true,
      createdAt: genesisAt,
      system: true,
    };
  }

  return {
    chainId: NEXORA.chainId,
    height: 0,
    genesisAt,
    accounts,
    txs: [
      {
        id: 'nxrtx_genesis',
        height: 0,
        kind: 'genesis',
        from: 'nxr1genesismint00000000000000000000000000',
        to: 'grid',
        amount: NEXORA.totalSupply,
        memo: 'Fixed 10,000,000 NXR minted. No further issuance.',
        at: genesisAt,
      },
    ],
  };
}

export function createWallet(state: ChainState, label?: string): Account {
  const address = `nxr1${randomBytes(20).toString('hex')}`;
  return ensureAccount(state, address, label?.trim() || 'Grid wallet');
}

export function claimFaucet(state: ChainState, address: string): ChainTx {
  if (!isNexoraAddress(address)) {
    throw new ChainError('Invalid Nexora address.');
  }

  const account = state.accounts[address];
  if (!account) {
    throw new ChainError('Wallet not found. Create a grid wallet first.', 404);
  }
  if (account.system) {
    throw new ChainError('Protocol vaults cannot claim the faucet.');
  }
  if (account.claimedFaucet) {
    throw new ChainError('This wallet already claimed genesis NXR.');
  }

  const vault = ensureAccount(state, GENESIS_VAULT.address, GENESIS_VAULT.label);
  if (vault.liquid < NEXORA.faucetAmount) {
    throw new ChainError('Genesis circulating vault is depleted.', 409);
  }

  vault.liquid -= NEXORA.faucetAmount;
  account.liquid += NEXORA.faucetAmount;
  account.claimedFaucet = true;
  pushTx(
    state,
    'faucet',
    vault.address,
    account.address,
    NEXORA.faucetAmount,
    'Genesis faucet — 42 NXR of planetary compute credit.',
  );
  return state.txs[0];
}

export function transfer(
  state: ChainState,
  from: string,
  to: string,
  amount: number,
  memo?: string,
): ChainTx {
  if (!isNexoraAddress(from) || !isNexoraAddress(to)) {
    throw new ChainError('From and to must be valid Nexora addresses.');
  }
  if (from === to) {
    throw new ChainError('Cannot transfer to the same wallet.');
  }
  if (!Number.isInteger(amount) || amount < NEXORA.minTransfer) {
    throw new ChainError(`Amount must be a whole number of at least ${NEXORA.minTransfer} NXR.`);
  }

  const sender = state.accounts[from];
  if (!sender) {
    throw new ChainError('Sender wallet not found.', 404);
  }
  if (sender.system) {
    throw new ChainError('Protocol vaults are not directly spendable from the console.');
  }
  if (sender.liquid < amount) {
    throw new ChainError('Insufficient liquid NXR. Release reserved compute first.');
  }

  const recipient = ensureAccount(state, to, 'Incoming grid wallet');
  sender.liquid -= amount;
  recipient.liquid += amount;
  pushTx(
    state,
    'transfer',
    from,
    to,
    amount,
    memo?.trim() || 'NXR settlement',
  );
  return state.txs[0];
}

export function reserveCompute(
  state: ChainState,
  address: string,
  amount: number,
  regionId: string,
): ChainTx {
  if (!isNexoraAddress(address)) {
    throw new ChainError('Invalid Nexora address.');
  }
  if (!isRegionId(regionId)) {
    throw new ChainError('Unknown data-center region.');
  }
  if (!Number.isInteger(amount) || amount < 1) {
    throw new ChainError('Reserve at least 1 NXR.');
  }

  const account = state.accounts[address];
  if (!account) {
    throw new ChainError('Wallet not found.', 404);
  }
  if (account.system) {
    throw new ChainError('Protocol vaults manage capacity off-console.');
  }
  if (account.liquid < amount) {
    throw new ChainError('Not enough liquid NXR to reserve inference.');
  }

  const region = REGIONS.find((item) => item.id === regionId)!;
  const used = regionReserved(state, regionId);
  if (used + amount > region.capacity) {
    throw new ChainError(`${region.name} is at capacity. Try another hall.`);
  }

  account.liquid -= amount;
  account.reserved += amount;
  account.reservations[regionId] = (account.reservations[regionId] ?? 0) + amount;
  pushTx(
    state,
    'reserve',
    address,
    regionAddress(regionId),
    amount,
    `Reserved photonic inference on ${region.name}`,
    regionId,
  );
  return state.txs[0];
}

export function releaseCompute(
  state: ChainState,
  address: string,
  amount: number,
  regionId: string,
): ChainTx {
  if (!isNexoraAddress(address)) {
    throw new ChainError('Invalid Nexora address.');
  }
  if (!isRegionId(regionId)) {
    throw new ChainError('Unknown data-center region.');
  }
  if (!Number.isInteger(amount) || amount < 1) {
    throw new ChainError('Release at least 1 NXR.');
  }

  const account = state.accounts[address];
  if (!account) {
    throw new ChainError('Wallet not found.', 404);
  }

  const locked = account.reservations[regionId] ?? 0;
  if (locked < amount) {
    throw new ChainError('Not enough NXR reserved in that region.');
  }

  account.reservations[regionId] = locked - amount;
  if (account.reservations[regionId] === 0) {
    delete account.reservations[regionId];
  }
  account.reserved -= amount;
  account.liquid += amount;
  pushTx(
    state,
    'release',
    regionAddress(regionId),
    address,
    amount,
    `Released inference slot on ${REGIONS.find((item) => item.id === regionId)!.name}`,
    regionId,
  );
  return state.txs[0];
}

function regionAddress(regionId: NexoraRegionId): string {
  return `nxr1region${regionId.replace(/[^a-z0-9]/g, '').padEnd(32, '0')}`.slice(0, 47);
}

export function regionReserved(state: ChainState, regionId: NexoraRegionId): number {
  return Object.values(state.accounts).reduce(
    (sum, account) => sum + (account.reservations[regionId] ?? 0),
    0,
  );
}

export function totalSupply(state: ChainState): number {
  return Object.values(state.accounts).reduce(
    (sum, account) => sum + account.liquid + account.reserved,
    0,
  );
}

export function circulating(state: ChainState): number {
  return Object.values(state.accounts)
    .filter((account) => !account.system)
    .reduce((sum, account) => sum + account.liquid + account.reserved, 0);
}

export function totalReserved(state: ChainState): number {
  return Object.values(state.accounts).reduce((sum, account) => sum + account.reserved, 0);
}

export function publicAccount(account: Account) {
  return {
    address: account.address,
    label: account.label,
    liquid: account.liquid,
    reserved: account.reserved,
    total: account.liquid + account.reserved,
    reservations: account.reservations,
    claimedFaucet: account.claimedFaucet,
    createdAt: account.createdAt,
    system: Boolean(account.system),
  };
}

export function snapshot(state: ChainState, address?: string) {
  const holders = Object.values(state.accounts)
    .map(publicAccount)
    .filter((account) => account.total > 0)
    .sort((a, b) => b.total - a.total);

  const regions = REGIONS.map((region) => {
    const reserved = regionReserved(state, region.id);
    return {
      ...region,
      reserved,
      utilization: Number(((reserved / region.capacity) * 100).toFixed(4)),
    };
  });

  return {
    token: {
      name: NEXORA.name,
      symbol: NEXORA.symbol,
      decimals: NEXORA.decimals,
      chainId: state.chainId,
      genesisHash: NEXORA.genesisHash,
      totalSupply: NEXORA.totalSupply,
      faucetAmount: NEXORA.faucetAmount,
    },
    height: state.height,
    genesisAt: state.genesisAt,
    circulating: circulating(state),
    reserved: totalReserved(state),
    vaults: VAULTS.map((vault) => {
      const account = state.accounts[vault.address];
      return {
        ...vault,
        liquid: account?.liquid ?? 0,
        reserved: account?.reserved ?? 0,
      };
    }),
    regions,
    holders,
    txs: state.txs.slice(0, 24),
    wallet: address ? (state.accounts[address] ? publicAccount(state.accounts[address]) : null) : null,
  };
}
