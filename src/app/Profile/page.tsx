"use client"
import { Alchemy, Network,OwnedNft } from "alchemy-sdk";
import NftCard from "../components/nftCard"
import Navbar from "../components/navbar";
import React, { useEffect, useState } from "react";
import { useContract } from '../Context/ContractContext';
import { useRouter } from 'next/navigation';
const config = {
    apiKey: process.env.API_KEY,
    network: Network.ETH_MAINNET,
  };
  
const Page = () => {
    const alchemy = new Alchemy(config);
    const [nfts,setNfts] = useState<OwnedNft[]>();
    const [error,setError] = useState<string>();
    const contract = useContract()?.contractInstance;
    const router =useRouter();
    
    useEffect( ()  => {
    const fetchNfts = async () => {
        console.log(contract?.currentUser);
        setError("");
       try{
        if(contract?.currentUser.length){
          let nftOwnerAddress:string = contract?.currentUser.toString();
          const nft = await alchemy.nft.getNftsForOwner(nftOwnerAddress);
          if(nft.ownedNfts.length===0 ){
            setError("No NFTs Found");
          }
          setNfts(nft.ownedNfts);
          console.log(nft);
        }
       }catch(e:any){
         console.log(e);
       }
        
      }
    fetchNfts();
    },[contract?.currentUser])
      return(
       <>
       <Navbar/>

        <div className="relative min-h-screen before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s250')] before:bg-cover before:bg-center before:opacity-30 before:blur before:pointer-events-none">
      <div className="flex flex-col w-full justify-center items-center gap-y-2 z-10">
        {nfts?.map(nft=>{
          return(
            <NftCard nft ={nft}></NftCard>
          )
        })}
         {error && <p className="text-red-500">{error}</p>}
      </div>
      </div>
      </>
      )
     
}
export default Page;