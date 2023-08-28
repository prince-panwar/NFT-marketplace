"use client"
import React, { useState,useEffect } from "react";
import { useContract } from '../Context/ContractContext';
import { useRouter } from 'next/navigation';
const Page = () => {
    const [selectedPremiumIndex, setSelectedPremiumIndex] = useState(0); // Initialize with 0
    const [error, setError] = useState("");
    const [message, setMessage] = useState(""); 
    const premiumTypes = ["OneMonth", "SixMonth", "OneYear"];
    const premiumPrices = [100000000000000, 200000000000000, 300000000000000];
    const contract = useContract()?.contractInstance;
    const router =useRouter();
    useEffect(() => {
        if(!contract){
          router.push('/');
        }
      
      }, []);
    const handlePay = async () => {
        try {
           let tx = await contract?.purchasePremium(selectedPremiumIndex,{value:premiumPrices[selectedPremiumIndex]});
            await tx.wait();// Pass the index
            setMessage("Premium purchased successfully");
            router.push('/Premium');
        } catch (e:any) {
            setError(e.message);
            setMessage("");
        }
    }
 

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-red-500 text-center mb-4">
            </div> 
            <div className="w-full max-w-lg p-6 border rounded border-blue-700">
                <h2 className="text-2xl mb-4">Pay Premium</h2>
                <p className="mb-4">
                    You are not a premium user. Please pay premium to access the content.
                </p>
                <select
                    className="text-black mb-4"
                    name="premiumType"
                    value={selectedPremiumIndex}
                    onChange={(e) => setSelectedPremiumIndex(parseInt(e.target.value))}
                >
                    {premiumTypes.map((premiumType, index) => (
                        <option key={premiumType} value={index}>
                            {premiumType}
                        </option>
                    ))}
                </select>
                <br />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={handlePay}
                >
                    Pay
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}
            </div>
        </div>
    )
}

export default Page;