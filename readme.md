<div align="center">

<h1>MultiCall3-Based Airdrop Implementation
</h1>
</div>

This project leverages [`MultiCall3`](https://github.com/mds1/multicall) to efficiently execute large-scale airdrops. MultiCallV3 enables batching of multiple calls into a single transaction on the Ethereum or evm based blockchain, which significantly reduces gas costs when distributing tokens to multiple recipients.

[`Multicall3.sol`](./src/Multicall3.sol) is deployed on over 70+ chains at `0xcA11bde05977b3631167028862bE2a173976CA11`.
The full list of deployed chains along with the Multicall3 ABI can be found at https://multicall3.com.
The ABI is provided in various formats, and can be copied to your clipboard or downloaded to a file.

## Features
- **Bulk Airdrop**: Simultaneously transfer tokens or native currency to multiple addresses *(MAX 250)*, and with the `All-or-Nothing` option, it ensures ***atomic transaction execution***, making it possible to process all transfers as a single, indivisible unit.
- **ERC20 and ETH Support**: Includes cases for transferring both ERC20 tokens and native ETH, making it versatile for different airdrop requirements. (@todo ERC20, NFT)
- **Gas Optimization**: MultiCallV3 enables distribution to multiple recipients in a single transaction, optimizing gas costs.

