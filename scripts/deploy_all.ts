import { ethers } from "hardhat";

async function main() {
  const RatKing = await ethers.getContractFactory("RatKing");
  const ratKing = await RatKing.deploy();
  await ratKing.deployed();

  const FabNovel = await ethers.getContractFactory("FabNovel");
  const fab = await FabNovel.deploy();
  await fab.deployed();
  await fab.setRatKingAddress(ratKing.address);

  const NLDNovel = await ethers.getContractFactory("FabNovel");
  const nld = await NLDNovel.deploy();
  await nld.deployed();
  await nld.setRatKingAddress(ratKing.address);

  const SINGNovel = await ethers.getContractFactory("FabNovel");
  const sing = await SINGNovel.deploy();
  await sing.deployed();
  await sing.setRatKingAddress(ratKing.address);

  console.log(`\n`);
  console.log(`ratContractAddress: "${ratKing.address}",`);
  console.log(`fabContractAddress: "${fab.address}",`);
  console.log(`nldContractAddress: "${nld.address}",`);
  console.log(`singAppyContractAddress: "${sing.address}",`);
  console.log(`\n`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
