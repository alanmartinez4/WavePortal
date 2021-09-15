const { hexStripZeros } = require("@ethersproject/bytes");
const { ethers } = require("ethers");

async function main() {
  const [owner, randoPerson] = await hre.ethers.getSigners(); 
  // compiles contract and generates necessary files to work w/ our contract under the artifacts directory
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  // Hardhat creates a local Eth network, but just for this contract
  const waveContract = await waveContractFactory.deploy();
  // waits for contract to officially deploy to local blockchain
  await waveContract.deployed();
  console.log("Contract deployed to: ", waveContract.address);
  console.log("Contract deployed by: ", owner.address);

  const senders = [];
  let waveCount;

  waveCount = await waveContract.getTotalWaves();
  
  let waveTxn = await waveContract.wave();
  senders.push(owner.address);
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
 
  
  waveTxn = await waveContract.connect(randoPerson).wave();  
  await waveTxn.wait();
  senders.push(randoPerson.address);

  waveCount = await waveContract.getTotalWaves();
  console.log();
  
  senders.forEach((element, index) => {
    console.log(element);
  });
    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});