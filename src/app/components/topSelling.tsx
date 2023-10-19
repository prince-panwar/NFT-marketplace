"use client"
import React, { useEffect, useState } from "react";
import { Alchemy, Network,OwnedNft } from "alchemy-sdk";
import NftCard from "../components/nftCard"



const config = {
  apiKey: process.env.API_KEY,
  network: Network.ETH_MAINNET,
};

const Top=()=>{
  const alchemy = new Alchemy(config);
  const [nfts,setNfts] = useState<OwnedNft[]>();


  
 useEffect( () =>{
    const fetchNfts = async () => {
     
       try{
       
          const nft = await alchemy.nft.getNftsForOwner("0x38b05fc40f51D8A7065CffcC8754F06CccC5DFBe");
          
          setNfts(nft.ownedNfts);
          console.log(nft);
        
       
      
       }catch(e:any){
         console.log(e);
       }
        
      }
      fetchNfts();
 },[]);
 

return(
    <div className=" items-center justify-center text-center">
    <h1 className="mt-5 mb-5  text-4xl ">Top selling NFTs</h1>
        
    <div className='flex flex-wrap gap-y-12 mt-4 w-full gap-x-2 items-center justify-center z-10'>
        
        
        {nfts?.map(nft=>{
          return(
            <NftCard nft ={nft}></NftCard>
          )
        })}
      </div>
      </div>
)
}
export default Top;