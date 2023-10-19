import { HardhatUserConfig } from "hardhat/config";
require("dotenv").config();
import "@nomicfoundation/hardhat-toolbox";


const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks:{
    sepolia:{
      url: "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
      accounts:process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    }
  }

};

export default config;
