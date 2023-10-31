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
   
    string[] public userTypes;
    

    constructor() {
    owner = msg.sender;
    // Push new premiums to the array
    userTypes.push("Free"); 
    userTypes.push("Buyer");
    userTypes.push("Seller");
    premiums.push(Premium("OneMonth",100000000000000,5 minutes));
    premiums.push(Premium("SixMonths",200000000000000,10 minutes));
    premiums.push(Premium("OneYear",300000000000000,20 minutes));
    }


    struct User {
    address userAddress;
    uint256 premiumIndex; // Use a uint256 instead of an enum
    string usertype;
    uint256 premiumPurchaseDate;
    uint256 expiryDate;

    }
    mapping(address => User) users;
    function purchasePremium(uint256 _premiumIndex,uint256 _userIndex) external payable {
    // Check if the index is valid
    require(_premiumIndex < premiums.length, "Invalid premium index");
    require(_userIndex<userTypes.length,"Invalid user index");
    require(msg.value == premiums[_premiumIndex].amount, "Incorrect premium amount");
    Premium memory selectedPremium = premiums[_premiumIndex];
    uint256 expiry = block.timestamp + selectedPremium.validity;
    string memory user = userTypes[_userIndex];
    users[msg.sender] = User(msg.sender,_premiumIndex,user,block.timestamp,expiry);
    // Transfer the received ether to the owner of the contract
    payable(owner).transfer(msg.value);
    }

    function checkValidPremium() external view returns (bool) {
        User memory user = users[msg.sender];
        return user.expiryDate > block.timestamp;
    }

    function checkValidBuyer() external view returns (bool) {
    User memory user = users[msg.sender];
    return keccak256(bytes(user.usertype)) == keccak256(bytes("Buyer")) && user.expiryDate > block.timestamp;
    }
    function checkValidSeller() external view returns (bool) {
    User memory user = users[msg.sender];
    return keccak256(bytes(user.usertype)) == keccak256(bytes("Seller")) && user.expiryDate > block.timestamp;
    }
}