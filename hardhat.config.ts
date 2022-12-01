import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import { task } from "hardhat/config";
import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "solidity-coverage";
import networkConfig from "./config";
dotenv.config();

task(
  "accounts",
  "Prints the list of accounts",
  async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
      console.log(account.address);
    }
  }
);

const privatekey = process.env.PRIVATE_KEY || "";
const config: HardhatUserConfig = {
  paths: {
    artifacts: "./artifacts",
  },
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        count: 101,
      },
      gas: "auto",
    },
    rinkeby: {
      url: networkConfig.ALCHEMYURL,
      accounts: [privatekey],
    },
    ropsten: {
      url: networkConfig.ropstenUrl,
      accounts: [privatekey],
    },
    mumbai: {
      url: networkConfig.MATIC_MUMBAI_URL,
      accounts: [privatekey],
    },
    matic: {
      url: networkConfig.MATIC_MAINNET_URL,
      accounts: [privatekey],
    },
    localhost: {
      url: networkConfig.LOCALHOST,
    },
  },
  etherscan: {
    apiKey: "133D8JI4398TV68UFT1D1PZKSTJAWIMJJ1",
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
  },
};

export default config;