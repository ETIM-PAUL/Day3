import { ethers, network } from "hardhat";

async function main() {
  const uniswapFactoryAddr = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"

  const uniswapFactoryContract = await ethers.getContractAt('UniswapInterface', uniswapFactoryAddr);


  const result = await uniswapFactoryContract.getPair(DAI, UNI);

  console.log("The get pair address", result)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
