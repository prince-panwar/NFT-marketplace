"use client"
import React from 'react'
import { useContract } from '../Context/ContractContext';

export default function ConnectWallet() {
  const contract=useContract();
  const connect =  async() => {
    contract?.connectWallet();
};
 return (
  (contract?.currentUser)?<div>{`${contract.currentUser.substring(0,4)}...`}</div>:<div> <button onClick={connect}  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0" >Connect Wallet</button></div>
 
      
    )
}