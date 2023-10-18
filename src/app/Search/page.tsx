"use client"
import React, { useEffect, useState } from "react";
import { useContract } from '../Context/ContractContext';
import { useRouter } from 'next/navigation';
import { Alchemy, Network,OwnedNft } from "alchemy-sdk";
import NftCard from "../components/nftCard"
import Navbar from "../components/navbar";

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
    <>
    <Navbar/>
    <div className="relative min-h-screen before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s250')] before:bg-cover before:bg-center before:opacity-30 before:blur before:pointer-events-none">
      <div className="flex flex-col w-full justify-center items-center gap-y-2 z-10">
        <input
          type="text"
          value={nftOwnerAddress}
        
          onChange={(e) => {
            setNftOwnerAddress(e.target.value);
          }}
          className="w-2/5 bg-slate-100 my-3 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          placeholder="Enter NFT Owner address"
        />
        <button className={"disabled:bg-slate-500 text-white bg-blue-600 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={()=>{fetchNfts()}}>
          Get NFTs
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-full gap-x-2 items-center justify-center z-10'>
        {nfts?.map(nft=>{
          return(
            <NftCard nft ={nft}></NftCard>
          )
        })}
      </div>
    </div>
    </>
  )
}

export default Page;


