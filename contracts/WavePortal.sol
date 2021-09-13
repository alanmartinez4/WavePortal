// SPDX-License-Identifier: UNLICENSED

// the version of the Solidity compi;er we want our contract to use
pragma solidity ^0.8.0;

// magic given to us by Hardhard to do console logs in our contract
import "hardhat/console.sol";

contract WavePortal {
    constructor() {
        console.log("Hello, I am a smart contract");
    }
}