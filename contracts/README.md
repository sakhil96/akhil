# Nexora (NXR) — EVM contract

Fixed-supply ERC-20 twin of the hosted Nexora grid.

- Name: `Nexora`
- Symbol: `NXR`
- Decimals: `18`
- Max supply: `10,000,000 * 10^18`
- No admin mint after construction
- `reserve(bytes32 region, uint256 amount)` / `release(...)` lock tokens into a data-center region

## Genesis constructor

```text
computeReserve  4,000,000 NXR
operatorGuild   2,000,000 NXR
treasury        1,500,000 NXR
builders        1,500,000 NXR
genesis         1,000,000 NXR
```

## Deploy with Foundry

```bash
forge init --offline --force
forge create contracts/Nexora.sol:Nexora \
  --constructor-args $COMPUTE $OPERATORS $TREASURY $BUILDERS $GENESIS \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY
```

## Deploy with Hardhat

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat compile
```

Use five addresses that match the hosted vaults' roles. Verify on the explorer after broadcast.

The live product on this site is the hosted Nexora ledger (`/nexora` + `/api/nexora`). Deploy this contract when you want the same economics on Ethereum, Sepolia, or another EVM chain.
