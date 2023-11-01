"use client"
import { useState,useEffect } from 'react';
import Header from '../components/navbar'
import { useMintNFT, useContract, Web3Button } from "@thirdweb-dev/react";
import { useAuthContract } from '../Context/ContractContext';
import toast, { Toaster } from 'react-hot-toast';
import {useRouter} from 'next/navigation';
export default function page() {
  const [name, setName] = useState('');
  const [supply, setSupply] = useState('');
  const [uri,setUri]=useState('');
  const [description, setDescription] = useState('');
  const contract = useAuthContract()?.contractInstance;
  const currentuser = useAuthContract()?.currentUser;
 
  const {nftsContract} =useContract("0x472E3f14B7cE81e4ff732360F2BBBF7198eD93c7");
  const { mutateAsync: mintNft, isLoading, error } = useMintNFT(nftsContract);
  const router = useRouter();

  useEffect(() => {
    if(!contract){
      router.push('/');
    }
  
  }, []);
const handlePay = async () => {
  useEffect(() => {
    if (error) {
      const showError = (toastHandler = toast) => {
        toastHandler.success(`{Error while minting}`, {
          style: {
            background: '#04111d',
            color: '#fff',
          },
          duration: 5000,
        });
      };
      showError();
    }
  }, [error]);
}
 
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting and causing a page reload
    // Handle form submission here
  
    // You can include your mintNft logic here or make an API call, etc.
    console.log(name, uri, description, supply);
    mintNft({
      metadata: {
        name: name,
        description: description,
        image: uri, // Accepts any URL or File type
      },
      to: currentuser, // Use useAddress hook to get the current wallet address
    });
  };
  return (
    <div> 
       <Toaster position="top-center" reverseOrder={false} />
      <Header/>
    <div className="relative min-h-screen before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s250')] before:bg-cover before:bg-center before:opacity-30 before:blur before:pointer-events-none">
   
    <div className="nft-form bg-black text-white p-8 flex flex-col items-center justify-center min-h-screen">
      <form  onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="name" className="block">
          <span className="text-sm">Name your NFT*</span>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1  block w-full rounded-md bg-gray-800 border-gray-700 text-white p-2"
          />
        </label>
        <label htmlFor="supply" className="block">
          <span className="text-sm">Supply*</span>
          <input
            type="number"
            id="supply"
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            required
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white p-2"
          />
        </label>
        <label htmlFor="name" className="block">
          <span className="text-sm">Name your NFT*</span>
          <input
            type="text"
            id="uri"
            value={uri}
            onChange={(e) => setUri(e.target.value)}
            required
            placeholder='ipfs://example.com/my-nft.png'
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white p-2"
          />
        </label>
        <label htmlFor="description" className="block">
          <span className="text-sm">Description</span>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white p-2 h-20"
          />
        </label>
        <Web3Button
      contractAddress={"0x472E3f14B7cE81e4ff732360F2BBBF7198eD93c7"}
      action={handleSubmit}
    >
      Mint NFT
    </Web3Button>
      </form>
    </div>
    </div>
    </div>
  );
}
