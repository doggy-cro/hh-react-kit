import * as dotenv from 'dotenv';

import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import 'solidity-coverage';
import '@appliedblockchain/chainlink-plugins-fund-link';

dotenv.config();

const KOVAN_RPC_URL = `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`;
const ROPSTEN_RPC_URL = `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`;
const MAINNET_RPC_URL = '';

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const FORKING_BLOCK_NUMBER = process.env.FORKING_BLOCK_NUMBER;

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const REPORT_GAS = process.env.REPORT_GAS || false;

module.exports = {
  defaultNetwork: 'hardhat',
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      // to do forking: set `enabled: true`.
      // forking: {
      //   url: MAINNET_RPC_URL,
      //   blockNumber: Number(FORKING_BLOCK_NUMBER),
      //   enabled: false,
      // },
      chainId: 31337,
    },
    kovan: {
      url: KOVAN_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 42,
    },
    ropsten: {
      url: ROPSTEN_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 3,
    },
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 1,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.7',
      },
      {
        version: '0.6.6',
      },
      {
        version: '0.4.24',
      },
    ],
  },
  etherscan: {
    // yarn hardhat --verify --network <netowork> <contract_addr> <constructor params>
    apiKey: {
      kovan: ETHERSCAN_API_KEY,
      ropsten: ETHERSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: 'USD',
    // outputFile: 'gas-report.txt',
  },
  contractSizer: {
    runOnCompile: false,
    only: [
      'APIConsumer',
      'KeepersCounter',
      'PriceConsumerV3',
      'RandomNumberConsumer',
    ],
  },
  mocha: {
    timeout: 250000, // 250 seconds max for running tests
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
};
