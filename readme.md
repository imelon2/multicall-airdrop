<div align="center">

<h1>MultiCall3-Based Airdrop Implementation
</h1>
</div>

This project leverages [`MultiCall3`](https://github.com/mds1/multicall) to efficiently execute large-scale airdrops. MultiCallV3 enables batching of multiple calls into a single transaction on the Ethereum or evm based blockchain, which significantly reduces gas costs when distributing tokens to multiple recipients.

[`Multicall3.sol`](./src/Multicall3.sol) is deployed on over 70+ chains at `0xcA11bde05977b3631167028862bE2a173976CA11`.
The full list of deployed chains along with the Multicall3 ABI can be found at https://multicall3.com.
The ABI is provided in various formats, and can be copied to your clipboard or downloaded to a file.

## Features
**Bulk Airdrop**: </br>
Simultaneously transfer tokens or native currency to multiple addresses *(MAX 250)*, and with the `All-or-Nothing` option, it ensures ***atomic transaction execution***, making it possible to process all transfers as a single, indivisible unit.

**ERC20 and ETH Support**:</br>
Includes cases for transferring both ERC20 tokens and native ETH, making it versatile for different airdrop requirements. (@todo ERC20, NFT)

**Gas Optimization**:</br>
MultiCall3 enables distribution to multiple recipients in a single transaction, optimizing gas costs.


## Quick Start with Mock data
> [!IMPORTANT]
> This tutorial will airdrop to 250 accounts created with [mock data](./package/mock/account_250) and send 0.01 ETH to each account *(total 2.5 eth)*.
> Please validate on testnet before using on mainnet.

(1) run `npm install` & create `.env` & inter `provider url` and `private key`
``` shell
npm i

cp .env.example .env

PROVIDER_URL=http://localhost:8545
SIGNER_PK= # airdroper private key
```

(2) airdrop native asset
```
npm run airdrop:native
```
> after transaction success, can check result on [multicall-airdrop/package/result/mock_native_airdrop_result](./package/result/mock_native_airdrop_result) file

## Optional
(1) if want to deploy multicall3 contract on local network
```
npm run deploy:multicall
```
> [INFO] MultiCall3 is deployed to all EVM chains with the same contract address via [NICK`S METHOD](https://medium.com/patronum-labs/nicks-method-ethereum-keyless-execution-168a6659479c#66f5).
