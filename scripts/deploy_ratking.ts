import { ethers } from "hardhat";

async function main() {
  
  const RatKing = await ethers.getContractFactory("RatKing");
  const ratKing = await RatKing.deploy();

  await ratKing.deployed();

  console.log(`RatKing deployed to ${ratKing.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});