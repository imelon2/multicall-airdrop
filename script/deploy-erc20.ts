import { init } from "../src/common";
import { ERC20__factory } from "../build/types";
import yargs from "yargs";

async function main() {
    try {
        const { signer } = init();
        const {name,symbol} = argv
        const erc20 = new ERC20__factory(signer)
        const deployRes = await erc20.deploy(name,symbol)
        console.log(`\n\n${name}(${symbol}) token deployed at ${deployRes.address}`);    
    } catch (error) {
        console.error("Fail deploy erc20 contract")
        console.error(error);
    }
    
    
    
}

const argv = yargs(process.argv.slice(2))
  .options({
    name: {
      type: 'string',
      default: 'TEST_ERC20',
    },
    symbol:{
        type: 'string',
        default: 'T-ERC20',
    }
  })
  .parseSync();


void main();
