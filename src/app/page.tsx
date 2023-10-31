"use client"
import { useEffect } from 'react';
import ConnectWallet from './components/connectWallet';
import Hero from './components/hero';
import Navbar from './components/navbar';
import { useAuthContract } from './Context/ContractContext';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { currentUser, UserName,contractInstance } = useAuthContract() || {};
  useEffect(() => {
    if(!contractInstance){
      router.push('/');
    }
  
  }, []);
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
