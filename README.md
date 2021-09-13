# WavePortal - local Ethereum network and Solidity smart contract

## Create directory and run commands

```
mkdir my-wave-portal
cd my-wave-portal
npm init -y
npm install --save-dev hardhat
```

## Create project and add dependencies 

```
npx hardhat
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
```

## Run the project

```
npx hardhat compile
npx hardhat test
```
