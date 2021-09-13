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
