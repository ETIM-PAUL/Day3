import { ethers, network } from "hardhat";

export async function removeLiq(val:any, address:any) {
  const uniswapAddr = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"


  const uniswapContract = await ethers.getContractAt('UniswapInterface', uniswapAddr);

  const to = "0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F";

  const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  const deadline = currentTimestampInSeconds + 86400

  const pairAddress = address;

  const pairAddressContract = await ethers.getContractAt('IIERC20', pairAddress);
  const pairLiqVal = await pairAddressContract.balanceOf("0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F")

  const impersonatedSigner = await ethers.getImpersonatedSigner(
  '0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F'
  )
  
  await uniswapContract.connect(impersonatedSigner).removeLiquidity(DAI, UNI, val, 10, 10, to, deadline);


  console.log("balance after removing liquidity", pairLiqVal);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
//@ts-ignore
removeLiq().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
