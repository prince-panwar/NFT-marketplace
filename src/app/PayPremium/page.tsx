"use client"
import React, { useState,useEffect } from "react";
import { useAuthContract } from '../Context/ContractContext';
import { useRouter } from 'next/navigation';
import Navbar from "../components/navbar";

const Page = () => {
    const [selectedPremiumIndex, setSelectedPremiumIndex] = useState(0);
    const [selectedUserIndex, setSelectedUserIndex] = useState(0);
    const [error, setError] = useState("");
    const [message, setMessage] = useState(""); 
    const premiumTypes = ["OneMonth", "SixMonth", "OneYear"];
    const userTypes = ["Free", "Buyer","Seller"];
    const premiumPrices = [100000000000000, 200000000000000, 300000000000000];
    const contract = useAuthContract()?.contractInstance;
    const router =useRouter();
    useEffect(() => {
        if(!contract){
          router.push('/');
        }
      
      }, []);
    const handlePay = async () => {
        
        
        // console.log(selectedPremiumIndex);
        // console.log(password);
        // console.log(premiumPrices[selectedPremiumIndex]);

        try {
            let tx = await contract?.purchasePremium(selectedPremiumIndex,selectedUserIndex,{value:premiumPrices[selectedPremiumIndex]});
            await tx.wait();// Pass the index
            console.log(await tx.wait());
            setMessage("Premium purchased successfully");
            router.push('/collections/0x472E3f14B7cE81e4ff732360F2BBBF7198eD93c7');
        } catch (e:any) {
            setError(e.message);
            setMessage("");
        }
    }
 

    return (
        <>
        <Navbar/>
        <div className="relative min-h-screen before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s250')] before:bg-cover before:bg-center before:opacity-30 before:blur before:pointer-events-none">
      <div className="flex flex-col w-full justify-center items-center gap-y-2 z-10">
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
                <select
                    className="text-black mb-4"
                    name="userType"
                    value={selectedUserIndex}
                    onChange={(e) => setSelectedUserIndex(parseInt(e.target.value))}
                >
                    {userTypes.map((userType, index) => (
                        <option key={userType} value={index}>
                            {userType}
                        </option>
                    ))}
                </select>
                
               
                <br/>
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
        </div>
        </>
    )
}

export default Page;
