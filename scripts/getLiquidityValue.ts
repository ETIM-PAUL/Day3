import { ethers, network } from "hardhat";

async function main() {
  const pairAddress = '0xf00e80f0DE9aEa0B33aA229a4014572777E422EE';

  const pairAddressContract = await ethers.getContractAt('IIERC20', pairAddress);

  console.log("balance of liquidity", await pairAddressContract.balanceOf("0x9d4eF81F5225107049ba08F69F598D97B31ea644"))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
