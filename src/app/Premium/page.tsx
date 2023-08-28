"use client"
import React, { useEffect } from "react";
import { useContract } from '../Context/ContractContext';
import { useRouter } from 'next/navigation';

const Page=()=>{
  const contract = useContract()?.contractInstance;
const router =useRouter();
  useEffect(() => {
    if(!contract){
      router.push('/');
    }
  
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen" >
      This is Premium Content.
    </div>
  )
}

export default Page;
