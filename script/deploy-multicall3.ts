import { parseEther } from "ethers/lib/utils";
import { init } from "../src/common";
import { MULTICALL_ADDRESS, MULTICALL_DEPLOYER, MULTICALL_SIGNED_TX } from "../src/constants";

async function main() {
    const { provider, signer } = init();
    const codeAt = await provider.getCode(MULTICALL_ADDRESS)
    if(codeAt == "0x") {
        const sendFee = await signer.sendTransaction({
            to:MULTICALL_DEPLOYER,
            value:parseEther('0.1')
        })
        await sendFee.wait()
        const deployMulticallV3 = await provider.sendTransaction(MULTICALL_SIGNED_TX)
        const receipt = await deployMulticallV3.wait()
        if(receipt.status == 1) {
            console.log(`Success Deployed MultiCall V3 at ${receipt.contractAddress} | hash: ${receipt.transactionHash}`);
        } else {
            console.log(`Fail Deployed MultiCall V3 | hash: ${receipt.transactionHash}`);
        }
    } else {
        console.error(`Your chain already has Multicall3 deployed at ${MULTICALL_ADDRESS}`);
    }
}

void main();
