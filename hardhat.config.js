require("@nomicfoundation/hardhat-toolbox");
require('hardhat-gas-reporter');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version : "0.8.13",
    settings : {
      optimizer : {
        enabled : true,
        runs :200
      }
    }
  },
  networks:{
    hardhat : {
      chainId : 1337
    }
  },
  gasReporter: {
    enabled : true,
    currency: 'USD',
    gasPrice: 10
  },
};
