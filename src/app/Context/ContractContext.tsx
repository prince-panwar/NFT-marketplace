"use client"
import React, { createContext, useContext, useState } from 'react';
import { ethers, BrowserProvider, Eip1193Provider, Contract } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import ContractAbi from '../../../artifacts/contracts/Auth.sol/PremiumContract.json';
import factoryContractAbi from '../../../artifacts/contracts/minterFactory.sol/MyNFTFactory.json';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { useRouter } from 'next/navigation';
import { Maybe } from '@metamask/providers/dist/utils';
import { client } from '../../../lib/sanityClient';

type ContractContextValue = {
  currentUser: string | undefined;
  contractInstance: Contract | undefined;
  factoryContractInstance: Contract | undefined;
  UserName: string | undefined;
  connectWallet: () => void;
};

const ContractContext = createContext<ContractContextValue | undefined>(undefined);

interface ContractProviderProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export const ContractProvider: React.FC<ContractProviderProps> = ({ children }) => {
  const [contractInstance, setContractInstance] = useState<Contract | undefined>();
  const [factoryContractInstance, setFactoryContractInstance] = useState<Contract | undefined>();
  const [UserName, setUserName] = useState<string | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<BrowserProvider | undefined>();
  const abi = ContractAbi.abi;
  const factoryAbi = factoryContractAbi.abi;
  const FACTORY_CONTRACT_ADDRESS = '0x009c4D687550f46e3Ab0FEd2551401a0f36C27Ec';
  const contractAddress = '0x3Da096fA7EB2BF003b8803d381fA769e3baF393b';
  const router = useRouter();


  async function getProvider() {
    if (typeof window !== 'undefined') {
      const ETHProvider: Eip1193Provider | null = await detectEthereumProvider();
      if (ETHProvider) {
        setProvider(new ethers.providers.Web3Provider(ETHProvider));
      } else {
        alert('Please install MetaMask wallet to use this site');
      }
    }
  }

  const updateCurrentWalletAddress = async () => {
    try {
      const accounts: Maybe<string[]> = await window.ethereum?.request({
        method: 'eth_requestAccounts',
      });

      if (accounts) {
        setCurrentUser(accounts[0]);
        addUser(accounts[0]);
      }
    } catch (error) {
      console.log('Error updating wallet address:', error);
    }
  };

  const addUser = async (userAddress: string | undefined) => {
    try {
      if (!userAddress) {
        throw new Error('User address is undefined');
      }
      const userDoc = {
        _type: 'users',
        _id: userAddress,
        userName: 'Unnamed',
        walletAddress: userAddress,
      };
      const result = await client.createIfNotExists(userDoc);
      setUserName(result.userName);
      console.log('Result:', result);
    } catch (error) {
      console.log('Error while adding user:', error);
    }
  };

  const connectWallet = async () => {
    await getProvider();
    try {
      if (provider) {
        const account = await provider.send('eth_requestAccounts', []);
        setCurrentUser(account[0]);
        window.ethereum?.on('accountsChanged', updateCurrentWalletAddress);
        getInstance();
        await addUser(account[0]);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const getInstance = async () => {
    try {
      const signer = await provider?.getSigner();
      const contractInst = new ethers.Contract(contractAddress, abi, signer);
      setContractInstance(contractInst);
      getFactoryInstance();
      routeUser(contractInst);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const getFactoryInstance = async () => {
    try {
      const signer = await provider?.getSigner();
      const contractInst = new ethers.Contract(FACTORY_CONTRACT_ADDRESS, factoryAbi, signer);
      setFactoryContractInstance(contractInst);
    } catch (error) {
      console.error('Error while getting factory instance:', error);
    }
  };

  const routeUser = async (contractInst: ethers.Contract) => {
    try {
      const isPremiumUser: boolean = await contractInst?.checkValidPremium();
      if (!isPremiumUser) {
        router.push('/PayPremium');
      }
    } catch (error) {
      console.error('Error while routing:', error);
    }
  };

  return (
    <ContractContext.Provider value={{ currentUser, contractInstance,factoryContractInstance ,UserName, connectWallet }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useAuthContract = () => useContext(ContractContext);
