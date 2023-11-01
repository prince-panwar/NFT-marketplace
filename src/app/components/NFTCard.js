import { useEffect, useState } from 'react';
import { BiHeart } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import {
  useBuyDirectListing,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import { useAuthContract } from '../Context/ContractContext';

const style = {
  wrapper: `bg-[#303339] flex-auto w-[14rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer`,
  imgContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full object-cover`,
  details: `p-3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  assetName: `font-bold text-lg mt-2`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
  likeIcon: `text-xl mr-2`,
};

const NFTCard = ({ listing }) => {
  const { contract } = useContract("0xF5e97d49d3Be3Ad7737862aA897Caa8927f6bdd3", 'marketplace-v3');
  const Router = useRouter();
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState(0);
  const currentuser = useAuthContract()?.currentUser;
  const nftContract = useAuthContract()?.contractInstance;
  const [isBuyer, setIsBuyer] = useState(undefined);
  useEffect(() => {
    const checkBuyer = async () => {
      try {
        const Buyer = await nftContract?.checkValidBuyer();
        setIsBuyer(Buyer);
        if (isBuyer==false) {
          NotPremiumUser();
        }
        console.log("Buyer",Buyer)
      } catch (err) {
        alert(err);
      }
    };
  
    checkBuyer();
  
    
  }, []);
  
 
  
  const NotPremiumUser = () => {
    const goToPayPremium = () => {
      Router.push('/PayPremium');
      
    };
  
    const toastId = toast.success(
      <div>
        You are not a premium User. So you can't buy NFT. Please purchase a premium 
        <br />
        <button onClick={goToPayPremium}>Here</button>
      </div>, 
      {
        style: {
          background: '#04111d',
          color: '#fff',
        },
        duration: 20000,
      }
    );
  };

  useEffect(() => {
    if (Boolean(listing)) {
      setIsListed(true);
      setPrice(listing.currencyValuePerToken.displayValue);
    }
  }, [listing]);

  const {
    mutateAsync: buyDirectListing,
    isLoading,
    error,
  } = useBuyDirectListing(contract);

  useEffect(() => {
    if (error) {
      const showError = (toastHandler = toast) => {
        toastHandler.success(`Error while purchasing check if you have sufficient funds`, {
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

  return (
    <div className={style.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={style.imgContainer}>
        <img src={listing.asset.image} alt={listing.asset.name} className={style.nftImg} />
      </div>
      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>{listing.asset.name}</div>
            <div className={style.assetName}>{listing.asset.name}</div>
          </div>
          {isListed && (
            <div className={style.infoRight}>
              <div className={style.priceTag}>Price</div>
              <div className={style.priceValue}>
                <img
                  src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026"
                  alt="eth"
                  className={style.ethLogo}
                />
                {price}
              </div>
            </div>
          )}
        </div>
        {isBuyer && (
  <Web3Button
    contractAddress="0xF5e97d49d3Be3Ad7737862aA897Caa8927f6bdd3"
    action={() =>
      buyDirectListing({
        listingId: listing.id.toString(),
        quantity: "1",
        buyer: currentuser,
      })
    }
  >
    Buy Now
  </Web3Button>
) }
 
        <div className={style.likes}>
          <span className={style.likeIcon}>
            <BiHeart />
          </span>{' '}
          {2}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
