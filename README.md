# WavePortal - local Ethereum network and Solidity smart contract

## 1. Write and deploy your WavePortal smart contract to a local Ethereum network 

### Get your local Ethereum network working

#### Create directory and run commands

```
mkdir wave-portal
cd wave-portal
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

## 2. Build a web3 app that connects to our wallet and talks to our WaveContract

### Set up a basic react app and setup MetaMask

### Deploy contract to a real testnet

#### Get some fake Eth
Go to this facucet https://www.rinkeby.io/#faucet. 
Easiest way to do this is to make a tweet with your public rinkeby address(which you can find on metamask) and then input that direct tweet URL into the input box.

#### Update the hardhat.config.js file
Grab your API URL from the Alchemy dashboard and your private rinkeby key. 
```
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "YOUR_ALCHEMY_API_URL",
      accounts: ['YOUR_PRIVATE_RINKEBY_ACCOUNT_KEY'],
    },
  },
};
```
#### Run this command from the root directory of wave-portal.
```
npx hardhat run scripts/deploy.js --network rinkeby
```
#### Here is the output

### Connect our wallet to the web app

#### Using window.ethereum
```
export default function App() {
  console.log("test")
  const checkIfWalletIsConnected = () => {
    // First make sure we have access to window.Ethereum
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have MetaMask!")
      return
    } else {
      console.log("Here is the ethereum object", ethereum)
    }
  }

 
  // This runs our function when the page loads
  React.useEffect(() => {
    console.log("Test")
    checkIfWalletIsConnected()
  }, [])
```
#### Check if we can access the user's account
```
 ethereum.request({ method: 'eth_accounts'})
 .then(accounts => {
   // We could have multiple accounts. Check for one.
   if(accounts !== 0) {
     // Grab the first account we have access to.
     const account = accounts[0];
     console.log("Found an authorized account: ", account)

     // Store the users public wallet address for later! 
     setCurrentAccount(account);
   } else {
     console.log("No authorized account found")
   }
 })
```
#### Build a connect wallet button
```
import * as React from "react";
import { ethers } from "ethers";
import './App.css';


export default function App() {
  // Just a state variable we use to store our user's public wallet address.
  const [currAccount, setCurrentAccount] = React.useState("")

  const checkIfWalletIsConnected = () => {
    // First make sure we have access to window.Ethereum/ MetaMask
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have MetaMask!")
      return
    } else {
      console.log("Here is the ethereum object", ethereum)
    }

 // Check if we're authorized to access the user's wallet 
 ethereum.request({ method: 'eth_accounts' })
 .then(accounts => {
   console.log(accounts)
   // We could have multiple accounts. Check for one.
   if(accounts !== 0) {
     // Grab the first account we have access to.
     const account = accounts[0];
     console.log("Found an authorized account: ", account)
     setCurrentAccount(account);
     // Store the users public wallet address for later! 
     setCurrentAccount(account);
   } else {
     console.log("No authorized account found")
   }
 })
}

const connectWallet = () => {
  const { ethereum } = window;
  if(!ethereum) {
    alert("Get MetaMask!")
  }


  ethereum.request({ method: 'eth_requestAccounts' })
  .then(accounts => {
    console.log("Connected", accounts[0])
    setCurrentAccount(accounts[0])
  })
  .catch(err => console.err(err));
}

  // This runs our function when the page loads
  React.useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          Hey there!
        </div>

        <div className="bio">
          I am alan and I am learning how to create and deploy a smart contract to an Ethereum network, pretty cool right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={connectWallet}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}

```
### Call the deployed smart contract from the web app

#### Call get total waves
```
 // Call getTotalWaves()
  const wave = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const waveportalContract = new ethers.Contract(contractAddress, contractABI, signer);

    let count = await waveportalContract.getTotalWaves()
    console.log("Retrieved total wave count...", count.toNumber())
  }

```

#### Connect the above function to the wave button
```
   <button className="waveButton" onClick={wave}>
          Wave at Me
   </button>
```

#### Create WavePortal.json file
#### Writing Data
```
// Call getTotalWaves()
const wave = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  const waveportalContract = new ethers.Contract(contractAddress, contractABI, signer);

  let count = await waveportalContract.getTotalWaves()
  console.log("Retrieved total wave count...", count.toNumber())

  const waveTxn = await waveportalContract.wave()
  console.log("Mining...", waveTxn.hash)
  await waveTxn.wait()
  console.log("Mined --", waveTxn.hash)

  count = await waveportalContract.getTotalWaves()
  console.log("Retrieved total wave count...", count.toNumber())
}
```

## 3. Update WavePortal to randomly send lucky users waving at you some Ethereum

### Storaging message from users on the blockchain

### Fund contract, set a prize, and send users Eth

## 4. Update UI + deploy to an Ethereum testnet so anyone on the internet can wave at you using their wallet

###
Randomnly pick a winner and prevent spammers

### Finalize and celebrate


