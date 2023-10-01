"use client"
import React, { useEffect, useState } from "react";
import { useContract } from '../Context/ContractContext';
import { useRouter } from 'next/navigation';
import { Alchemy, Network,OwnedNft } from "alchemy-sdk";
import NftCard from "../components/nftCard"

const config = {
  apiKey: process.env.API_KEY,
  network: Network.ETH_MAINNET,
};

const Page=()=>{
  const alchemy = new Alchemy(config);
  const [nftOwnerAddress,setNftOwnerAddress]= useState<string>();
  const [nfts,setNfts] = useState<OwnedNft[]>();
  const [error,setError] = useState<string>();
  const contract = useContract()?.contractInstance;
  const router =useRouter();
  // useEffect(() => {
  //   if (!contract) {
  //     router.push('/');
  //   }
  //   (async () => {
  //     try {
  //       const isPremiumUser: boolean = await contract?.checkValidPremium();
  //       console.log(isPremiumUser);
  //       if (!isPremiumUser) {
  //         router.push("/PayPremium");
  //       }
  //     } catch (error) {
  //       console.error("Error while routing:", error);
  //     }
  //   })();
  // }, []);

  const fetchNfts = async () => {
    setError("");
   try{
    if(nftOwnerAddress?.length){
      const nft = await alchemy.nft.getNftsForOwner(nftOwnerAddress);
      if(nft.ownedNfts.length===0 ){
        setError("No NFTs found for the given address");
      }
      setNfts(nft.ownedNfts);
      console.log(nft);
    }else{
    setError("Please Enter an address");
  }
   }catch(e:any){
     console.log(e);
   }
    
  }
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
  <div className="flex flex-col w-full justify-center items-center gap-y-2">
    <input
      type="text"
      value={nftOwnerAddress}
      onChange={(e) => {
        setNftOwnerAddress(e.target.value);
      }}
      className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
      placeholder="Enter NFT Owner address"
    />
  </div>
  
    <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={()=>{fetchNfts()}}>
      Get NFTs
    </button>
    {error && <p className="text-red-500">{error}</p>}
  
  <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
    {nfts?.map(nft=>{
      return(
        <NftCard nft ={nft}></NftCard>
      )
    })}
  </div>
   
</div>

  )
}

export default Page;
