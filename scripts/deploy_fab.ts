import { ethers } from "hardhat";

async function main() {
  const FabNovel = await ethers.getContractFactory("FabNovel");
  const fab = await FabNovel.deploy();

  await fab.deployed();

  await fab.setRatKingAddress("0xb73CC6D7a621E0e220b369C319DBFaC258cEf4D2");

  console.log(`FabNovel deployed to ${fab.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
