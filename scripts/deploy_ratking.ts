import { ethers } from "hardhat";

async function main() {
  
  const RatKing = await ethers.getContractFactory("RatKingSociety");
  const ratKing = await RatKing.deploy();

  await ratKing.deployed();

  console.log(`RatKingSociety deployed to ${ratKing.address}`);

  const FabNovel = await ethers.getContractFactory("FabNovel");
  const fabNovel = await FabNovel.deploy();

  await fabNovel.deployed();
  console.log(`FabNovel deployed to ${fabNovel.address}`);

  const NightOfTheLivingDead = await ethers.getContractFactory("NightoftheLivingDead");
  const nightMovie = await NightOfTheLivingDead.deploy();

  await nightMovie.deployed();
  console.log(`NightoftheLivingDead deployed to ${nightMovie.address}`);

  const SingAppy = await ethers.getContractFactory("SingAppy");
  const singAppy = await SingAppy.deploy();

  await singAppy.deployed();
  console.log(`SingAppy deployed to ${singAppy.address}`);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});