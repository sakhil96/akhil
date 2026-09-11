# AI Inference Control Room + Nexora (NXR)

Premium portfolio site with a live, hosted AI data-center token.

**Nexora (NXR)** is a unique compute-settlement token for future photonic AI clouds:

- Fixed supply: **10,000,000 NXR**
- Live hosted ledger at [`/nexora`](/nexora)
- Region-locked inference slots (Helios, Aurora, Stratum, Nimbus, Pulse)
- EVM twin in `contracts/Nexora.sol`

This is an experimental protocol demo, not an investment product.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and [http://localhost:3000/nexora](http://localhost:3000/nexora).

## Token flow

1. Create a grid wallet
2. Claim **42 NXR** from the genesis circulating vault (once per wallet)
3. Transfer to another `nxr1…` address
4. Reserve NXR into a data-center region to lock photonic inference
5. Release to make it transferable again

Ledger state is stored in `data/nexora-chain.json` (or `/tmp` on Vercel).

## Edit content

Portfolio copy lives in `src/src/lib/site.ts`. Token economics live in `src/src/lib/nexora/tokenomics.ts`.

## Tests

```bash
npm test
```

## Deploy (Vercel)

1. Push the repo to GitHub.
2. Import it in Vercel.
3. Deploy.

## Notes

- Public-safe copy only (no confidential details).
- Minimal dependencies; no heavy UI libraries.
