"use client"
import React from 'react'
import { useAuthContract } from '../Context/ContractContext';

export default function ConnectWallet() {
  const contract=useAuthContract();
  const connect =  async() => {
    contract?.connectWallet();
  };
  return (
    <div className="relative min-h-screen before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s250')] before:bg-cover before:bg-center before:opacity-30 before:blur before:pointer-events-none">

      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='ml-[0.8rem]  text-white font-semibold text-2xl mb-6'>
          Please connect your wallet to continue
        </div>
        <button onClick={connect} className="mx-auto text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white">
          Connect Wallet
        </button>
      </div>
    </div>
  );
}