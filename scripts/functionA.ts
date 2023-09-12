import { ethers, network } from "hardhat";

async function main() {
  const uniswapAddr = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"

  const daiContract = await ethers.getContractAt('IIERC20', DAI)
  const uniContract = await ethers.getContractAt('IIERC20', UNI)

  const uniswapContract = await ethers.getContractAt('UniswapInterface', uniswapAddr);

  const AmountADesired = ethers.parseEther('1');
  const AmountBDesired = ethers.parseEther('1');

  const AmountAMin = ethers.parseEther('0');
  const AmountBMin = ethers.parseEther('0');

  const to = "0x9d4eF81F5225107049ba08F69F598D97B31ea644";

  const approveAmount = ethers.parseEther('1000')
  const approveBmount = ethers.parseEther('400')


  const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  const deadline = currentTimestampInSeconds + 86400

  const impersonatedSigner = await ethers.getImpersonatedSigner(
  '0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F'
  )

  console.log("balance before", ethers.formatEther(await daiContract.balanceOf("0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F")))
  console.log("balance before", ethers.formatEther(await uniContract.balanceOf("0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F")))


  const a = await daiContract.connect(impersonatedSigner).approve(uniswapAddr, approveBmount);
  const b = await uniContract.connect(impersonatedSigner).approve(uniswapAddr, approveAmount);

  a.wait();
  b.wait();

  const result = await uniswapContract.connect(impersonatedSigner).addLiquidity(DAI, UNI, AmountADesired, AmountBDesired, AmountAMin, AmountBMin, to, deadline);

  console.log("The add liquidity function returns", result)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
