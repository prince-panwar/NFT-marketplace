"use client"
import React from 'react'
import { useContract } from '../Context/ContractContext';
import { useRouter } from 'next/navigation';

export default function Mint() {
  const contract = useContract(); 
  const contractInst = useContract()?.contractInstance;
  const router = useRouter();

  const handleClick = async () => {
    try {
        if(!contractInst){
            contract?.connectWallet();
        } else {
            const isPremiumUser: boolean = await contractInst?.checkValidPremium();
            console.log(isPremiumUser);
  
            if (isPremiumUser) {
              router.push("/Login");
            } else {
              router.push("/PayPremium");
            }
        }
      } catch (error) {
        console.error("Error while routing:", error);
      }
  };

  return (
    <button onClick={handleClick} className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white">
      Mint NFT
    </button>
  )
}

