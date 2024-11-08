import dotenv from 'dotenv';
dotenv.config();

import * as fs from 'fs';
import { ethers } from 'ethers';
import { MOCK_ACCOUNT_250_PATH, RESULT_PATH } from './path';

export const init = () => {
  if (!process.env.PROVIDER_URL) throw new Error('PROVIDER_URL is required');
  if (!process.env.SIGNER_PK) throw new Error('SIGNER_PK is required');

  const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
  const signer = new ethers.Wallet(process.env.SIGNER_PK, provider);

  return {
    provider,
    signer
  };
};

export const mock_accounts_250 = () => {
    const data = fs.readFileSync(MOCK_ACCOUNT_250_PATH, 'utf-8');
    const addresses = data
    .split('\n')                    
    .map(line => line.trim())  
    .filter(line => line.length > 0);

  return addresses;
}

export const generateResult = (content:string,fileName:string) => {
    fs.writeFileSync(RESULT_PATH+"/"+fileName, content);
}

export const getReturnData = async (
    txHash: string,
    provider: ethers.providers.JsonRpcProvider
  ) => {
    const tx = await provider.getTransaction(txHash);
    if (tx == null) {
      return null;
    }
    const response = await provider.call(
      {
        to: tx.to,
        from: tx.from,
        nonce: tx.nonce,
        gasLimit: tx.gasLimit,
        gasPrice: tx.gasPrice,
        data: tx.data,
        value: tx.value,
        chainId: tx.chainId,
        type: tx.type ?? undefined,
        accessList: tx.accessList,
      },
      tx.blockNumber
    );
  
    return response;
  };