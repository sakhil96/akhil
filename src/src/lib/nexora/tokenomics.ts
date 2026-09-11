export const NEXORA = {
  name: 'Nexora',
  symbol: 'NXR',
  decimals: 18,
  totalSupply: 10_000_000,
  chainId: 'nexora-1',
  genesisHash: '0xnxr-genesis-photonic-grid-2032',
  tagline: 'The settlement layer for planetary AI compute.',
  description:
    'Nexora is a fixed-supply compute-settlement token for next-generation AI data centers. Each NXR is a claim on reserved photonic inference, liquid cooling, and interconnect across a global cloud fabric designed for autonomous workloads — not a meme mint.',
  faucetAmount: 42,
  minTransfer: 1,
  pflopsPerToken: 0.42,
  kwhPerToken: 18,
} as const;

export type NexoraRegionId =
  | 'helios-1'
  | 'aurora-7'
  | 'stratum-deep'
  | 'nimbus-ai'
  | 'pulse-zero';

export type NexoraRegion = {
  id: NexoraRegionId;
  name: string;
  kind: string;
  location: string;
  capacity: number;
};

export const REGIONS: readonly NexoraRegion[] = [
  {
    id: 'helios-1',
    name: 'Helios-1',
    kind: 'Orbital edge',
    location: 'Sun-synchronous compute belt',
    capacity: 800_000,
  },
  {
    id: 'aurora-7',
    name: 'Aurora-7',
    kind: 'Photonic metro',
    location: 'Nordic liquid-cooled fabric',
    capacity: 1_200_000,
  },
  {
    id: 'stratum-deep',
    name: 'Stratum-Deep',
    kind: 'Cryo cavern',
    location: 'Subterranean inference vault',
    capacity: 900_000,
  },
  {
    id: 'nimbus-ai',
    name: 'Nimbus-AI',
    kind: 'Sovereign cloud',
    location: 'Multi-region AI backbone',
    capacity: 1_500_000,
  },
  {
    id: 'pulse-zero',
    name: 'Pulse-Zero',
    kind: 'Burst fabric',
    location: 'Millisecond inference mesh',
    capacity: 600_000,
  },
] as const;

export const REGION_IDS = REGIONS.map((region) => region.id);

export type VaultId = 'compute' | 'operators' | 'treasury' | 'builders' | 'genesis';

export type NexoraVault = {
  id: VaultId;
  address: string;
  label: string;
  amount: number;
  share: string;
  purpose: string;
};

export const VAULTS: readonly NexoraVault[] = [
  {
    id: 'compute',
    address: 'nxr1compute00000000000000000000000000000001',
    label: 'Compute Reserve',
    amount: 4_000_000,
    share: '40%',
    purpose: 'Locked capacity for AI workload settlement across the grid.',
  },
  {
    id: 'operators',
    address: 'nxr1operator00000000000000000000000000000002',
    label: 'Operator Guild',
    amount: 2_000_000,
    share: '20%',
    purpose: 'Data-center operators: power, cooling, and photonic interconnect.',
  },
  {
    id: 'treasury',
    address: 'nxr1treasury00000000000000000000000000000003',
    label: 'Protocol Treasury',
    amount: 1_500_000,
    share: '15%',
    purpose: 'R&D for sovereign clouds, model routing, and grid security.',
  },
  {
    id: 'builders',
    address: 'nxr1builders00000000000000000000000000000004',
    label: 'Builder Grants',
    amount: 1_500_000,
    share: '15%',
    purpose: 'Ecosystem grants for inference APIs, agents, and tooling.',
  },
  {
    id: 'genesis',
    address: 'nxr1genesis00000000000000000000000000000005',
    label: 'Genesis Circulating',
    amount: 1_000_000,
    share: '10%',
    purpose: 'Public faucet and early grid access. This is the live demo float.',
  },
] as const;

export const GENESIS_VAULT = VAULTS.find((vault) => vault.id === 'genesis')!;

export const ADDRESS_PATTERN = /^nxr1[a-z0-9]{38,44}$/;

export function isNexoraAddress(value: string): boolean {
  return ADDRESS_PATTERN.test(value);
}

export function isRegionId(value: string): value is NexoraRegionId {
  return REGION_IDS.includes(value as NexoraRegionId);
}

export function formatNxr(amount: number): string {
  return `${amount.toLocaleString('en-US')} ${NEXORA.symbol}`;
}

export function reservedPflops(reservedTokens: number): number {
  return reservedTokens * NEXORA.pflopsPerToken;
}

export function reservedKwh(reservedTokens: number): number {
  return reservedTokens * NEXORA.kwhPerToken;
}
