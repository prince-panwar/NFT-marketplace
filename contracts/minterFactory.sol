// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./minter.sol";

contract MyNFTFactory {
    mapping(address => MyNFT) public deployedContracts;

    function createMyNFT(string memory _URI, uint256 numTokens) public payable {
        // Deploy a new MyNFT contract
        MyNFT newContract = new MyNFT(msg.sender, _URI);

        // Store the contract address for the user
        deployedContracts[msg.sender] = newContract;

        // Mint the specified number of tokens
        for (uint256 i = 0; i < numTokens; i++) {
            newContract.mintNFT();
        }
    }
}