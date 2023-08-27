// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PremiumContract {
    address public owner;
    
    struct Premium {
        uint256 amount;
        uint256 validity;
    }
    
    enum PremiumType { OneMonth, SixMonths, OneYear }
    
    mapping(PremiumType => Premium)  premiums;
    
    struct User {
        address userAddress;
        PremiumType premiumType;
        uint256 premiumPurchaseDate;
        uint256 expiryDate;
    }
    
    mapping(address => User) users;
    
    constructor() {
        owner = msg.sender;
        
        premiums[PremiumType.OneMonth] = Premium(1 ether, 30 seconds);
        premiums[PremiumType.SixMonths] = Premium(5 ether, 1 minutes);
        premiums[PremiumType.OneYear] = Premium(9 ether, 2 minutes);
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    function purchasePremium(PremiumType _premiumType) external payable {
        require(msg.value == premiums[_premiumType].amount, "Incorrect premium amount");
        
        Premium memory selectedPremium = premiums[_premiumType];
        uint256 expiry = block.timestamp + selectedPremium.validity;
        
        users[msg.sender] = User(msg.sender, _premiumType, block.timestamp, expiry);
    }
    
    function changePremium(PremiumType _newPremiumType) external {
        User storage user = users[msg.sender];
        require(user.userAddress == msg.sender, "User not found");
        
        Premium memory newPremium = premiums[_newPremiumType];
        user.premiumType = _newPremiumType;
        user.premiumPurchaseDate = block.timestamp;
        user.expiryDate = block.timestamp + newPremium.validity;
    }
    
    function checkValidPremium() external view returns (bool) {
        User memory user = users[msg.sender];
        return user.expiryDate > block.timestamp;
    }
    
    function repayPremium() payable  external {
        User storage user = users[msg.sender];
         Premium memory selectedPremium = premiums[user.premiumType];
        require(user.userAddress == msg.sender, "User not found");
        require(user.expiryDate < block.timestamp,"Your Premuim is not expired yet"); 
        require(msg.value == selectedPremium.amount, "Incorrect premium amount");

         uint256 expiry = block.timestamp + selectedPremium.validity;
        
        users[msg.sender] = User(msg.sender, user.premiumType,block.timestamp, expiry);

    }
}