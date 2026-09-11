'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { NEXORA, formatNxr, reservedKwh, reservedPflops } from '@/lib/nexora/tokenomics';

type RegionView = {
  id: string;
  name: string;
  kind: string;
  location: string;
  capacity: number;
  reserved: number;
  utilization: number;
};

type VaultView = {
  id: string;
  address: string;
  label: string;
  amount: number;
  share: string;
  purpose: string;
  liquid: number;
};

type HolderView = {
  address: string;
  label: string;
  liquid: number;
  reserved: number;
  total: number;
  system: boolean;
};

type TxView = {
  id: string;
  height: number;
  kind: string;
  from: string;
  to: string;
  amount: number;
  memo: string;
  region?: string;
  at: string;
};

type WalletView = {
  address: string;
  label: string;
  liquid: number;
  reserved: number;
  total: number;
  reservations: Record<string, number>;
  claimedFaucet: boolean;
};

type NetworkView = {
  token: {
    name: string;
    symbol: string;
    decimals: number;
    chainId: string;
    genesisHash: string;
    totalSupply: number;
    faucetAmount: number;
  };
  height: number;
  circulating: number;
  reserved: number;
  vaults: VaultView[];
  regions: RegionView[];
  holders: HolderView[];
  txs: TxView[];
  wallet: WalletView | null;
};

const STORAGE_KEY = 'nexora-wallet-address';

async function readJson<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as T & { error?: string };
  if (!response.ok) {
    throw new Error(payload.error || 'Nexora request failed.');
  }
  return payload;
}

function shortAddr(value: string) {
  if (value.length < 18) return value;
  return `${value.slice(0, 10)}…${value.slice(-6)}`;
}

function kindTone(kind: string): 'accent' | 'success' | 'warning' | 'muted' {
  if (kind === 'faucet' || kind === 'genesis') return 'success';
  if (kind === 'reserve') return 'accent';
  if (kind === 'release') return 'warning';
  return 'muted';
}

export function NexoraConsole() {
  const [network, setNetwork] = useState<NetworkView | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toAddress, setToAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('10');
  const [reserveAmount, setReserveAmount] = useState('10');
  const [region, setRegion] = useState('aurora-7');

  const refresh = useCallback(async (wallet = address) => {
    const query = wallet ? `?address=${encodeURIComponent(wallet)}` : '';
    const data = await readJson<NetworkView>(await fetch(`/api/nexora${query}`, { cache: 'no-store' }));
    setNetwork(data);
  }, [address]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setAddress(stored);
  }, []);

  useEffect(() => {
    refresh().catch((err: unknown) => {
      setError(err instanceof Error ? err.message : 'Unable to reach the Nexora grid.');
    });
    const timer = window.setInterval(() => {
      refresh().catch(() => undefined);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  const run = async (label: string, work: () => Promise<NetworkView>) => {
    setBusy(label);
    setError(null);
    setMessage(null);
    try {
      const data = await work();
      setNetwork(data);
      if (data.wallet?.address) {
        setAddress(data.wallet.address);
        window.localStorage.setItem(STORAGE_KEY, data.wallet.address);
      }
      setMessage(`${label} confirmed at height ${data.height}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Grid rejected the request.');
    } finally {
      setBusy(null);
    }
  };

  const wallet = network?.wallet ?? null;
  const livePflops = reservedPflops(network?.reserved ?? 0);
  const liveKwh = reservedKwh(network?.reserved ?? 0);

  const stats = useMemo(() => {
    if (!network) return [];
    return [
      { label: 'Max supply', value: formatNxr(network.token.totalSupply) },
      { label: 'Circulating', value: formatNxr(network.circulating) },
      { label: 'Reserved compute', value: formatNxr(network.reserved) },
      { label: 'Block height', value: network.height.toLocaleString('en-US') },
    ];
  }, [network]);

  return (
    <div className="nexora-console">
      <div className="grid-4">
        {stats.map((item) => (
          <Card key={item.label} className="stack-sm">
            <span className="eyebrow">{item.label}</span>
            <span className="heading-md">{item.value}</span>
          </Card>
        ))}
      </div>

      <div className="nexora-live">
        <span className="pulse-dot" />
        <span>
          Live grid: {livePflops.toFixed(2)} PFLOPS reserved · {liveKwh.toLocaleString('en-US')} kWh of photonic inference
        </span>
      </div>

      {error ? <div className="nexora-alert nexora-alert--error">{error}</div> : null}
      {message ? <div className="nexora-alert nexora-alert--ok">{message}</div> : null}

      <div className="grid-2 nexora-split">
        <Card className="stack-md">
          <div className="row-between">
            <div>
              <span className="eyebrow">Your node</span>
              <h3 className="heading-md">Grid wallet</h3>
            </div>
            <Badge label={wallet ? 'Online' : 'Unprovisioned'} tone={wallet ? 'success' : 'warning'} />
          </div>

          {wallet ? (
            <div className="stack-sm">
              <p className="font-mono text-xsmall nexora-address">{wallet.address}</p>
              <div className="grid-3">
                <div>
                  <div className="eyebrow">Liquid</div>
                  <div>{formatNxr(wallet.liquid)}</div>
                </div>
                <div>
                  <div className="eyebrow">Reserved</div>
                  <div>{formatNxr(wallet.reserved)}</div>
                </div>
                <div>
                  <div className="eyebrow">Total</div>
                  <div>{formatNxr(wallet.total)}</div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted text-small">
              Provision a Nexora address, claim 42 NXR from genesis, then reserve inference in a future data-center hall.
            </p>
          )}

          <div className="cta-row">
            <button
              type="button"
              className="btn btn--primary"
              disabled={Boolean(busy)}
              onClick={() =>
                run('Wallet created', async () =>
                  readJson<NetworkView>(
                    await fetch('/api/nexora/wallets', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ label: 'Operator node' }),
                    }),
                  ),
                )
              }
            >
              {busy === 'Wallet created' ? 'Provisioning…' : 'Create wallet'}
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              disabled={!wallet || wallet.claimedFaucet || Boolean(busy)}
              onClick={() =>
                run('Faucet', async () =>
                  readJson<NetworkView>(
                    await fetch('/api/nexora/faucet', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ address: wallet?.address }),
                    }),
                  ),
                )
              }
            >
              Claim 42 NXR
            </button>
            {wallet ? (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={async () => {
                  await navigator.clipboard.writeText(wallet.address);
                  setMessage('Address copied.');
                }}
              >
                Copy address
              </button>
            ) : null}
          </div>
        </Card>

        <Card className="stack-md">
          <span className="eyebrow">Settlement</span>
          <h3 className="heading-md">Send NXR</h3>
          <label className="nexora-field">
            <span>Recipient</span>
            <input
              value={toAddress}
              onChange={(event) => setToAddress(event.target.value.trim())}
              placeholder="nxr1…"
              className="nexora-input"
            />
          </label>
          <label className="nexora-field">
            <span>Amount</span>
            <input
              value={sendAmount}
              onChange={(event) => setSendAmount(event.target.value)}
              inputMode="numeric"
              className="nexora-input"
            />
          </label>
          <button
            type="button"
            className="btn btn--primary"
            disabled={!wallet || Boolean(busy)}
            onClick={() =>
              run('Transfer', async () =>
                readJson<NetworkView>(
                  await fetch('/api/nexora/transfer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      from: wallet?.address,
                      to: toAddress,
                      amount: Number(sendAmount),
                      memo: 'NXR settlement',
                    }),
                  }),
                )
              )
            }
          >
            {busy === 'Transfer' ? 'Settling…' : 'Transfer'}
          </button>
        </Card>
      </div>

      <Card className="stack-md">
        <div className="row-between">
          <div>
            <span className="eyebrow">Unique primitive</span>
            <h3 className="heading-md">Reserve photonic inference</h3>
          </div>
          <Badge label="Region-locked NXR" tone="accent" />
        </div>
        <p className="text-muted text-small">
          Lock liquid tokens into a future AI data-center region. Reserved NXR cannot transfer until you release the slot.
          1 NXR = {NEXORA.pflopsPerToken} PFLOPS and {NEXORA.kwhPerToken} kWh of compute credit.
        </p>
        <div className="nexora-reserve-row">
          <label className="nexora-field">
            <span>Region</span>
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="nexora-input"
            >
              {(network?.regions ?? []).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} · {item.reserved === 0 ? 'idle' : `${item.reserved} reserved`}
                </option>
              ))}
            </select>
          </label>
          <label className="nexora-field">
            <span>NXR</span>
            <input
              value={reserveAmount}
              onChange={(event) => setReserveAmount(event.target.value)}
              inputMode="numeric"
              className="nexora-input"
            />
          </label>
          <button
            type="button"
            className="btn btn--primary"
            disabled={!wallet || Boolean(busy)}
            onClick={() =>
              run('Reserve', async () =>
                readJson<NetworkView>(
                  await fetch('/api/nexora/reserve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      address: wallet?.address,
                      amount: Number(reserveAmount),
                      region,
                      action: 'reserve',
                    }),
                  }),
                )
              )
            }
          >
            Reserve
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            disabled={!wallet || Boolean(busy)}
            onClick={() =>
              run('Release', async () =>
                readJson<NetworkView>(
                  await fetch('/api/nexora/reserve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      address: wallet?.address,
                      amount: Number(reserveAmount),
                      region,
                      action: 'release',
                    }),
                  }),
                )
              )
            }
          >
            Release
          </button>
        </div>
      </Card>

      <div className="nexora-region-grid">
        {(network?.regions ?? []).map((item) => (
          <Card key={item.id} className="stack-sm nexora-region">
            <div className="row-between">
              <span className="eyebrow">{item.kind}</span>
              <span className="text-xsmall text-muted">
                {item.reserved === 0
                  ? '0%'
                  : item.utilization < 0.01
                    ? '<0.01%'
                    : `${item.utilization.toFixed(2)}%`}
              </span>
            </div>
            <h3 className="heading-md">{item.name}</h3>
            <p className="text-muted text-xsmall">{item.location}</p>
            <div className="nexora-meter" aria-hidden>
              <span style={{ width: `${Math.min(item.utilization, 100)}%` }} />
            </div>
            <p className="text-xsmall">
              {formatNxr(item.reserved)} / {item.capacity.toLocaleString('en-US')} capacity
            </p>
          </Card>
        ))}
      </div>

      <div className="grid-2 nexora-split">
        <Card className="stack-md">
          <span className="eyebrow">Explorer</span>
          <h3 className="heading-md">Recent grid events</h3>
          <div className="nexora-feed">
            {(network?.txs ?? []).map((tx) => (
              <div key={tx.id} className="nexora-feed-item">
                <div className="row-between">
                  <Badge label={tx.kind} tone={kindTone(tx.kind)} />
                  <span className="font-mono text-xsmall text-muted">#{tx.height}</span>
                </div>
                <div className="text-small">{tx.memo}</div>
                <div className="font-mono text-xsmall text-muted">
                  {formatNxr(tx.amount)} · {shortAddr(tx.from)} → {shortAddr(tx.to)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="stack-md">
          <span className="eyebrow">Holders</span>
          <h3 className="heading-md">Supply map</h3>
          <div className="nexora-feed">
            {(network?.holders ?? []).slice(0, 8).map((holder) => (
              <div key={holder.address} className="nexora-feed-item">
                <div className="row-between">
                  <span>{holder.label}</span>
                  <span>{formatNxr(holder.total)}</span>
                </div>
                <div className="font-mono text-xsmall text-muted">{shortAddr(holder.address)}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
