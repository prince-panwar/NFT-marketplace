// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PremiumContract {
    address public owner;
    struct Premium {
    string name; // Add a name property
    uint256 amount;
    uint256 validity;
    }

    // Use a struct array instead of an enum mapping
    Premium[] public premiums;

    constructor() {
    owner = msg.sender;
    // Push new premiums to the array
    premiums.push(Premium("OneMonth",100000000000000,30 seconds));
    premiums.push(Premium("SixMonths",200000000000000,1 minutes));
    premiums.push(Premium("OneYear",300000000000000,2 minutes));
    }

    struct User {
    address userAddress;
    bytes32 password;
    uint256 premiumIndex; // Use a uint256 instead of an enum
    uint256 premiumPurchaseDate;
    uint256 expiryDate;
    }
    mapping(address => User) users;
    function purchasePremium(uint256 _premiumIndex,string calldata _password) external payable {
    // Check if the index is valid
    require(_premiumIndex < premiums.length, "Invalid premium index");
    require(msg.value == premiums[_premiumIndex].amount, "Incorrect premium amount");
    Premium memory selectedPremium = premiums[_premiumIndex];
    uint256 expiry = block.timestamp + selectedPremium.validity;
    bytes32 hashedPassword = keccak256(abi.encodePacked(_password));
    users[msg.sender] = User(msg.sender,hashedPassword,_premiumIndex,block.timestamp,expiry);
    // Transfer the received ether to the owner of the contract
    payable(owner).transfer(msg.value);
    }

    function checkValidPremium() external view returns (bool) {
        User memory user = users[msg.sender];
        return user.expiryDate > block.timestamp;
    }

    function checkValidPassword(string memory _password) external view returns (bool) {
    User memory user = users[msg.sender];
    // Hash the input password before comparing it
    bytes32 hashedPassword = keccak256(abi.encodePacked(_password));
    return user.password == hashedPassword && user.expiryDate > block.timestamp;
    }
}