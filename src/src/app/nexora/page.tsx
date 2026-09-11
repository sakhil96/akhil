import type { Metadata } from 'next';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { NexoraConsole } from '@/components/nexora/NexoraConsole';
import { SectionHeading } from '@/components/SectionHeading';
import { NEXORA, VAULTS } from '@/lib/nexora/tokenomics';

export const metadata: Metadata = {
  title: 'Nexora (NXR) — planetary AI compute token',
  description: NEXORA.description,
};

const PILLARS = [
  {
    title: 'Fixed 10 million',
    body: 'Supply is capped at genesis. No admin mint, no inflation curve, no surprise emissions.',
  },
  {
    title: 'Compute, not memes',
    body: 'NXR settles reserved watt-hours of photonic inference across future AI data-center halls.',
  },
  {
    title: 'Region-locked primitive',
    body: 'Lock tokens into Helios, Aurora, Stratum, Nimbus, or Pulse. Transferable only when released.',
  },
];

export default function NexoraPage() {
  return (
    <div className="page">
      <main className="container">
        <section className="hero nexora-hero">
          <div className="hero-meta">
            <span className="pill">Nexora grid · {NEXORA.chainId}</span>
            <span>AI data centers · sovereign cloud · 2032 fabric</span>
          </div>
          <h1 className="hero-title">
            Nexora
            <span className="text-gradient" style={{ display: 'block' }}>
              {NEXORA.tagline}
            </span>
          </h1>
          <p className="hero-subtitle">NXR · 10,000,000 max supply · 18 decimals on EVM</p>
          <p className="hero-body">{NEXORA.description}</p>
          <div className="badge-row">
            <Badge label="10,000,000 NXR" tone="accent" />
            <Badge label="Hosted live ledger" tone="success" />
            <Badge label="Photonic inference slots" tone="warning" />
            <Badge label="EVM contract included" tone="muted" />
          </div>
        </section>

        <section className="section">
          <SectionHeading
            eyebrow="Why this token exists"
            title="A settlement unit for the next cloud."
            description="Commodity VMs will not host the next decade of models. Nexora is the credit that reserved cooling, photons, and interconnect settle in."
          />
          <div className="grid-3">
            {PILLARS.map((pillar) => (
              <Card key={pillar.title} className="stack-sm">
                <h3 className="heading-md">{pillar.title}</h3>
                <p className="text-muted text-small">{pillar.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHeading
            eyebrow="Tokenomics"
            title="Every NXR is allocated. None are waiting to be printed."
            description="Genesis split for a compute grid — operators, treasury, builders, and a public circulating float."
          />
          <div className="nexora-tokenomics">
            {VAULTS.map((vault) => (
              <Card key={vault.id} className="stack-sm">
                <span className="eyebrow">
                  {vault.share} · {vault.amount.toLocaleString('en-US')} NXR
                </span>
                <h3 className="heading-md">{vault.label}</h3>
                <p className="text-muted text-small">{vault.purpose}</p>
                <div className="nexora-meter" aria-hidden>
                  <span style={{ width: vault.share }} />
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="section" id="console">
          <SectionHeading
            eyebrow="Live network"
            title="Hosted end to end on this site."
            description="Create a wallet, claim genesis NXR, transfer, and reserve inference. The ledger is the running Nexora chain."
          />
          <NexoraConsole />
        </section>

        <section className="section-tight">
          <Card className="stack-sm">
            <span className="eyebrow">Note</span>
            <p className="text-muted text-small">
              Nexora is an experimental compute-credit protocol hosted with this product. It is not an investment,
              security, or guaranteed store of value. The Solidity contract in <code>contracts/Nexora.sol</code> is
              the EVM twin (fixed 10M supply + region locks) for later deployment to a public testnet or mainnet.
            </p>
          </Card>
        </section>
      </main>
    </div>
  );
}
