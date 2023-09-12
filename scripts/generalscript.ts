import { ethers, network } from "hardhat";
import { addLiq } from "./functionA";
import { removeLiq } from "./functionB";
import { getPair } from "./getPairAddress";
import { getLiqValue } from "./getLiquidityValue";

export async function main() {
  let pairVal;
  let pairBal;
  await addLiq();
  await getPair().then((res) => getLiqValue(res)).then((res) => pairVal = res);
  await removeLiq(pairVal);
  // await getLiqValue("0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F")

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
