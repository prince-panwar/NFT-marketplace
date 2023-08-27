"use client"
import React, { createContext,useContext, useState } from 'react';
import { ethers ,BrowserProvider,Eip1193Provider,Contract} from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import ContractAbi from "../../../artifacts/contracts/Auth.sol/PremiumContract.json";
import { MetaMaskInpageProvider } from "@metamask/providers"
import { useRouter } from 'next/navigation';
import { Maybe } from '@metamask/providers/dist/utils';

type ContractContextValue={
    currentUser:string|undefined,
    contractInstance:Contract|undefined,
    connectWallet: () => {}
  
}
const ContractContext = createContext<ContractContextValue|undefined>(undefined);
interface ContractProviderProps {
    children: React.ReactNode;
  }
  declare global {
    interface Window{
      ethereum?:MetaMaskInpageProvider
    }
  }

export const ContractProvider:React.FC<ContractProviderProps> = ({ children }) => {
const [contractInstance,setContractInstance] = useState<Contract|undefined>();
const [currentUser,setCurrentUser] = useState<string|undefined>(undefined);
const [provider,setProvider] = useState<BrowserProvider|undefined>();
const abi = ContractAbi.abi;
const contractAddress="0xaFF4b45DDBB851731EC1cCe24fB2C7141A953Ffe";
const router =useRouter();

async function getProvider(){
    if(typeof window !== "undefined")
    {  const ETHProvider:Eip1193Provider|null = await detectEthereumProvider();
        if(ETHProvider){
            setProvider(new ethers.BrowserProvider(ETHProvider));
            }
            else{
               alert("Please install metamask wallet to use this site")
                 
            }
    }
  
   
        }
      
        const updateCurrentWalletAddress = async () => {
          try {
            const accounts: Maybe<string[]> = await window.ethereum?.request({
              method: "eth_requestAccounts",
            });
        
            if (accounts) {
              setCurrentUser(accounts[0]);
              console.log("Accounts updated");
            }
          } catch (error) {
            console.error("Error updating wallet address:", error);
          }
        };
      
    
const connectWallet =async()=>{
  await getProvider();
      try{
        
        if(provider){
        const account = await provider.send('eth_requestAccounts',[]);
        setCurrentUser(account[0]);
        window.ethereum?.on('accountsChanged', updateCurrentWalletAddress);
        getInstance();
        console.log("connect wallet called")
        }
      }catch(err:any){
      
        console.log(err.message)
      }
      }
      
const getInstance= async()=>{
        try{
        const signer = await provider?.getSigner();
        const contractInst = new ethers.Contract(contractAddress,abi,signer);
        setContractInstance(contractInst);
        await routeUser();
        }catch(err:any){
          console.log(err.message);
        }
      }
const routeUser= async()=>{
         const isPremiumUser= await contractInstance?.checkValidPremium();
        if(isPremiumUser){
            router.push("/Premium");
        }else{
            router.push("/payPremium");
        }
      }
    
    
      return (
        <ContractContext.Provider value={{currentUser, contractInstance, connectWallet }}>
          {children}
        </ContractContext.Provider>
      );
};

export const useContract = () => useContext(ContractContext);
