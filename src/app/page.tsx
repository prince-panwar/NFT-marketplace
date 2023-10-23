"use client"
import ConnectWallet from "./components/connectWallet";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Top from "./components/topSelling";
import { useContract } from './Context/ContractContext';

export default function Home() {
  const currentUser = useContract()?.currentUser;
  return (
    <div>
      {!currentUser && <ConnectWallet />}
      {currentUser && (
        <div>
          <Navbar />
          <Hero />
          <Top />
        </div>
      )}
    </div>
  );
}
