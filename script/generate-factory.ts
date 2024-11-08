import * as path from 'path';
import { glob, runTypeChain } from "typechain";

async function main() {
  const cwd = process.cwd();
  const MULTICALL_ABI_ROOT = path.join(
    cwd,
    "src/abi",
    `MulticallV3.json`
  );
  const ERC20_ABI_ROOT = path.join(
    cwd,
    "src/abi",
    `ERC20.json`
  );
  const allFiles = glob(cwd, [MULTICALL_ABI_ROOT,ERC20_ABI_ROOT]);
  const filesToProcess = allFiles;
  const count = await runTypeChain({
    cwd,
    allFiles,
    filesToProcess,
    outDir: "build/types",
    target: "ethers-v5",
  });

  console.log('Types generated successfully ' + count.filesGenerated);
}

void main();
