import { ethers, network } from "hardhat";

export async function getLiqValue(address:any) {
  const pairAddress = address;

  const pairAddressContract = await ethers.getContractAt('IIERC20', pairAddress);
  const pairLiqVal = await pairAddressContract.balanceOf("0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F")
  console.log(pairLiqVal)
  return pairLiqVal
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

//@ts-ignore
getLiqValue().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
