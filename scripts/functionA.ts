import { ethers, network } from "hardhat";

export async function addLiq() {
  const uniswapAddr = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  const uniswapFactoryAddr = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"

  const daiContract = await ethers.getContractAt('IIERC20', DAI)
  const uniContract = await ethers.getContractAt('IIERC20', UNI)

  const uniswapContract = await ethers.getContractAt('UniswapInterface', uniswapAddr);
  const uniswapFactoryContract = await ethers.getContractAt('UniswapInterface', uniswapFactoryAddr);


  const pairAddress = await uniswapFactoryContract.getPair(DAI, UNI);

  const pair = await ethers.getContractAt("IIERC20", pairAddress);


  const AmountADesired = ethers.parseEther('20');
  const AmountBDesired = ethers.parseEther('20');

  const to = "0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F";

  const approveAmount = ethers.parseEther('1000000000')
  const approveBmount = ethers.parseEther('1000000000')


  const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  const deadline = currentTimestampInSeconds + 86400

  const impersonatedSigner = await ethers.getImpersonatedSigner(
  '0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F'
  )


  await daiContract.connect(impersonatedSigner).approve(uniswapAddr, approveBmount);
  await uniContract.connect(impersonatedSigner).approve(uniswapAddr, approveAmount);
  await pair.connect(impersonatedSigner).approve(uniswapAddr, approveAmount);

  await uniswapContract.connect(impersonatedSigner).addLiquidity(DAI, UNI, AmountADesired, AmountBDesired, 0, 0, to, deadline);

  return pair

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
addLiq().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
