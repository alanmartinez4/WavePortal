# WavePortal - local Ethereum network and Solidity smart contract

## Write and deploy your WavePortal smart contract to a local Ethereum network 

### Get your local Ethereum network working

#### Create directory and run commands

```
mkdir my-wave-portal
cd my-wave-portal
npm init -y
npm install --save-dev hardhat
```

#### Create project and add dependencies 

After the `npx hardhat` command, select "Create a basic sample project". 
Select yes for everything. 

```
npx hardhat
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
```

#### Run the project

```
npx hardhat compile
npx hardhat test
```

### Write a smart contract in Solidity 

####
Create a file named WavePortal.sol under the contracts directory.
```
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    constructor() {
        console.log("Hello, I am a smart contract");
    }
}
```

### Compile a contract locally and run it 
```
const { hexStripZeros } = require("@ethersproject/bytes");

async function main() {

    // compiles contract and generates necessary files to work w/ our contract under the artifacts directory
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // Hardhat creates a local Eth network, but just for this contract
    const waveContract = await waveContractFactory.deploy();
    // waits for contract to officially deploy to local blockchain
    await waveContract.deployed();
    console.log("Contract deployed to: ", waveContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
```
### Store data on the smart contract

```

```
### Deploy locally so we can start building the website 

#### Creates a local Ethereum network that stays alive and 20 accounts with a starting balance.
```
npx hardhat node
```
#### Create a new block and get the smart contract on it. 
```
const { hexStripZeros } = require("@ethersproject/bytes");
const { ethers } = require("ethers");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const Token = await hre.ethers.getContractFactory("WavePortal");
  const token = await Token.deploy(); //smart contract

  console.log("WavePortal address:", token.address); // address of Smart Contract
}

main ()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
```
#### Run this command to deploy locally
```
npx hardhat run scripts/deploy.js --network localhost
```

