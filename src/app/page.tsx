"use client"
import { useEffect } from 'react';
import ConnectWallet from './components/connectWallet';
import Hero from './components/hero';
import Navbar from './components/navbar';
import { useContract } from './Context/ContractContext';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const { currentUser, UserName } = useContract() || {};
  
  useEffect(() => {
    const welcomeUser = (toastHandler = toast) => {
      toastHandler.success(`Welcome back${UserName !== 'Unnamed' ? ` ${UserName}` : ''}!`, {
        style: {
          background: '#04111d',
          color: '#fff',
        },
      });
    };

    if (currentUser) {
      welcomeUser();
    }
  }, [currentUser, UserName]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {!currentUser && <ConnectWallet />}
      {currentUser && (
        <div>
          <Navbar />
          <Hero />
          {/* <Top /> */}
        </div>
      )}
    </div>
  );
}
