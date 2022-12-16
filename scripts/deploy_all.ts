import { ethers } from "hardhat";

async function main() {
  const [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

  const RatKing = await ethers.getContractFactory("RatKingSociety");
  const ratKing = await RatKing.deploy();
  await ratKing.deployed();

  await (await ratKing.connect(addr2).mintRatKing()).wait();
  await (
    await ratKing.connect(addr2).transferFrom(addr2.address, addr1.address, 0)
  ).wait();

  await (await ratKing.connect(addr3).mintRatKing()).wait();
  await (
    await ratKing.connect(addr3).transferFrom(addr3.address, addr1.address, 1)
  ).wait();

  await (await ratKing.connect(addr4).mintRatKing()).wait();
  await (
    await ratKing.connect(addr4).transferFrom(addr4.address, addr1.address, 2)
  ).wait();

  await (await ratKing.connect(addr5).mintRatKing()).wait();
  await (
    await ratKing.connect(addr5).transferFrom(addr5.address, addr1.address, 3)
  ).wait();

  console.log((await ratKing.balanceOf(addr1.address)).toNumber());

  console.log(addr1.address);

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
