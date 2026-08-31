'use client';

import { site } from '@/lib/site';

const TICKER = [
  'SIGNAL → INFERENCE → OUTCOME',
  site.profile.role,
  site.profile.location,
  'CURSOR HACKATHON · 1ST + 2ND',
  'AI ADAPT · SMARTWEALTH',
  'PAYPAL × GOOGLE CLOUD SUMMIT',
  'JAVA · TYPESCRIPT · GKE',
];

export function StatusTicker() {
  const loop = [...TICKER, ...TICKER];

  return (
    <div className="status-ticker" aria-hidden>
      <div className="status-ticker-track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
