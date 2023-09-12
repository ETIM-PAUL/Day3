import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const deadline = currentTimestampInSeconds + 86400;

    const UniswapAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const holder = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

  

    const ImpersonateHolder = await ethers.getImpersonatedSigner(holder);

    const uniswap =  await ethers.getContractAt("UniswapInterface", UniswapAddress);
    const usdt = await ethers.getContractAt("IIERC20", usdtAddress);
    const dai = await ethers.getContractAt("IIERC20", daiAddress);


    const factory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
    
    const uniswapFactory = await ethers.getContractAt(
    "UniswapInterface",
    factory
    );

    const pairAddress = await uniswapFactory.getPair(usdtAddress, daiAddress);
    console.log(pairAddress);
    const pair = await ethers.getContractAt("IIERC20", pairAddress);



    const amountADesired = ethers.parseEther("20");
    const amountBDesired = ethers.parseEther("20");

    const approveAmt = ethers.parseEther("1000000000");



    console.log("==========approving==========");

    await usdt.connect(ImpersonateHolder).approve(uniswap, approveAmt);
    await dai.connect(ImpersonateHolder).approve(uniswap, approveAmt);
    await pair.connect(ImpersonateHolder).approve(uniswap, approveAmt);

    console.log("==========approved==========");

    console.log("holder usdt balance before adding liquidity" + " " + await usdt.balanceOf(holder));
    console.log("holder dai balance before adding liquidity" + " " + await dai.balanceOf(holder));
    console.log("pair balance before adding liquidity:" + " " + await pair.balanceOf(holder));

    console.log("==========adding liquidity==========");

    await uniswap.connect(ImpersonateHolder).addLiquidity(usdtAddress, daiAddress, amountADesired, amountBDesired, 0, 0, holder, deadline);
    
    const liquidity = await pair.balanceOf(holder);

    console.log("holder usdt balance after adding liquidity" + " " +await usdt.balanceOf(holder));
    console.log("holder dai balance after adding liquidity" + " " +await dai.balanceOf(holder));
    console.log("pair balance after adding liquidity:" + " " + await pair.balanceOf(holder));
 
    console.log("==========added liquidity==========");


    console.log("==========removing liquidity==========");

    await uniswap.connect(ImpersonateHolder).removeLiquidity(usdtAddress, daiAddress, liquidity, 100, 100, holder, deadline);
    


    console.log("holder usdt balance after removing liquidity" + " " + await usdt.balanceOf(holder));
    console.log("holder dai balance after removing liquidity" + " " +await dai.balanceOf(holder));
    console.log("pair balance after removing liquidity:" + " " + await pair.balanceOf(holder));

    console.log("==========removed liquidity==========");

    }

    main().catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });