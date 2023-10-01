"use client"
import React, { useState,useEffect } from "react";
import { useContract } from '../Context/ContractContext';
import { useRouter } from 'next/navigation';
const Page = () => {
const [password , setPassword] = useState<string|undefined>(undefined);
const contract = useContract()?.contractInstance;
const currentUser = useContract()?.currentUser;
const [error, setError] = useState("");
const [message, setMessage] = useState(""); 
const router =useRouter();
useEffect(() => {
    if (!contract) {
      router.push('/');
    }
    (async () => {
      try {
        const isPremiumUser: boolean = await contract?.checkValidPremium();
        console.log(isPremiumUser);
        if (!isPremiumUser) {
          router.push("/PayPremium");
        }
      } catch (error) {
        console.error("Error while routing:", error);
      }
    })();
  }, []);
  
  const handleLogin = async () => {
    console.log("login called")
    try {
      const tx:boolean = await contract?.checkValidPassword(password);
      if(tx){ 
      setMessage("Login successful");
      router.push('/Premium');
    }else{
      setError("Wrong Password");
      setMessage("");
    }
     
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
                <h2 className="text-2xl mb-4">Login</h2>
                <p className="mb-4">
                    {currentUser}
                </p>
                
                <br />
                
                <input  
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                placeholder="Enter Password"
                className="text-black mb-4"/>
                <br />
               <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={handleLogin}
                >
                    Login
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}
            </div>
        </div>
  )
}

export default Page;
