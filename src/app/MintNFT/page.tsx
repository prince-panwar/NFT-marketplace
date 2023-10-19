"use client"
import { useState } from "react";
import { useContract } from '../Context/ContractContext';
import Navbar from "../components/navbar";
const MintNFTPage = () => {
    const contractInst = useContract()?.factoryContractInstance;
    const [tokenURI, setTokenURI] = useState("");
    const [numNFTs, setNumNFTs] = useState<number>();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

 const handleCreateNFT = async () => {
        try {
            
            const tx = await contractInst?.createMyNFT(tokenURI, numNFTs);
            await tx.wait();
            setMessage("NFTs created successfully!");
        } catch (error) {
            console.error(error);
            setError("Error creating NFTs"+error);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="relative min-h-screen before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s250')] before:bg-cover before:bg-center before:opacity-30 before:blur before:pointer-events-none">
      <div className="flex flex-col w-full justify-center items-center gap-y-2 z-10">
            <div className="text-red-500 text-center mb-4">
            </div> 
            <div className="w-full max-w-lg p-6 border rounded border-blue-700">
                <h2 className="text-2xl mb-4">Mint NFTs</h2>
                <p className="mb-4">
                    Enter Base URI and Number of NFTs to Mint
                </p>
               
                <br />
                
                <input  
                value={tokenURI}
                onChange={(e) => setTokenURI(e.target.value)}
                type="text" 
                placeholder="Enter Base URI"
                className="text-black mb-4"/>
                <br />
                <input  
                value={numNFTs}
                onChange={(e) => setNumNFTs(parseInt(e.target.value))}
                type="text" 
                placeholder="Number of NFTs to Mint"
                className="text-black mb-4"/>
                <br />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={handleCreateNFT}
                >
                    Pay
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}
            </div>
            </div>
        </div>
        </>
    );
};

export default MintNFTPage;
