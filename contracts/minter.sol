// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyNFT is ERC721 ,Ownable{
   uint256 public tokenSupply=0;
   string  URI;
   
   
constructor(address initialOwner,  string memory _URI) ERC721("MyNFT", "NFT") Ownable(initialOwner) {
    URI = _URI;
}

function mintNFT() public payable {
      tokenSupply++;
     _mint(msg.sender,tokenSupply);  
   
       }
function withdraw()external onlyOwner{
    payable(msg.sender).transfer(address(this).balance);
      
       }
       
  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    _requireOwned(tokenId);

    string memory baseURI = _baseURI();
    return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, abi.encode(tokenId))) : "";
}
 function _baseURI() internal view  override returns(string memory){
     return URI;
    }
   

function viewBalance () external view returns(uint256){
        return address(this).balance;
       }
}