import { parseEther } from "ethers/lib/utils";
import { MulticallV3__factory } from "../../build/types";
import {
  generateResult,
  getReturnData,
  init,
  mock_accounts_250,
} from "../../src/common";
import { MULTICALL_ADDRESS } from "../../src/constants";
import { Multicall3 } from "../../build/types/MulticallV3";
import Table from "cli-table";
import { BigNumber } from "ethers";

async function main() {
    try {
        const { provider, signer } = init();
        const multicall = MulticallV3__factory.connect(MULTICALL_ADDRESS, signer);
        const inter = MulticallV3__factory.createInterface();

        /** Create Airdrop Data */
        const dests = mock_accounts_250();
        const perValue = parseEther("0.01");
        const call3Values: Multicall3.Call3ValueStruct[] = dests.map((account) => {
          return {
            target: account,
            allowFailure: true,
            value: perValue,
            callData: "0x",
          };
        });
        const value = call3Values.reduce((sum, entry) => sum.add(entry.value), BigNumber.from(0));

        /** Send Airdrop Transaction To Network */
        const aggregateRes = await multicall.aggregate3Value(call3Values, {
          value: value,
        });
        const receipt = await aggregateRes.wait();
        if(receipt.status == 1) {
            console.log(`Success airdrop transaction: ${receipt.transactionHash}`);
    
            /** Get Return Data */
            const data = await getReturnData(receipt.transactionHash, provider);
            const result = inter.decodeFunctionResult("aggregate3", data!)[0] as any[];
        
            /** Get Current Balance */
            const call:Multicall3.CallStruct[] = dests.map(account => {
                return {
                    target:MULTICALL_ADDRESS,
                    callData:inter.encodeFunctionData("getEthBalance",[account])
                }
            })
            const {returnData} = await multicall.callStatic.aggregate(call)

            /** Create Result Table */
            const table = new Table({
              head: ["To", "Value", "Status","Current Balance"],
              style: { 
                  head: [],
                  border: [] 
                }
            });
          
            result.map((v, i) => {
              table.push([dests[i], call3Values[i].value.toString(), v.success,BigNumber.from(returnData[i]).toString()]);
            });
            
            /** Save Result File */
            let content = table.toString();
            const file = generateResult(content, "mock_native_airdrop_result");
            console.log(`Check the result in the ${file}`);
            
        } else {
            console.log(`Fail airdrop transaction: ${receipt.transactionHash}`);
        }
    } catch (error) {
        console.log(error);
    }
}

void main();
