import { useEffect, useState } from 'react'
import { BiHeart } from 'react-icons/bi'
import { useRouter } from 'next/navigation';

import { useContract, } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
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
}


const NFTCard = ({ listing }) => {
  const {contract} = useContract("0xF5e97d49d3Be3Ad7737862aA897Caa8927f6bdd3", 'marketplace-v3');
  const Router = useRouter()
  const [isListed, setIsListed] = useState(false)
  const [price, setPrice] = useState(0)
 const {authContract} = useAuthContract();

  useEffect(() => {
    if (Boolean(listing)) {
      setIsListed(true)
      setPrice(listing.currencyValuePerToken.displayValue)
    }
  }, [listing])
  const buyoutListing = async () => {
    const buyer = await authContract?.checkcheckValidBuyer();
    if(!buyer){
      Router.push('/PayPremium')
    }else{
    try {
      
      await contract?.buyout_listing(BigNumber.from(listing.asset.id), 1);
      } catch (e) {
      alert(e);
      }}
      };
  
  return (
    <div
      className={style.wrapper}
      // onClick={() => {
      //   Router.push( `/nfts/${listing.asset.id}` )
      // }}
    >
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
         <button
type="button"className="rounded-lg bg-blue-700 px-5 py-4 text-base font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
onClick={buyoutListing}
>
Purchase
</button>
        <div className={style.likes}>
          <span className={style.likeIcon}>
            <BiHeart />
          </span>{' '}
          {2}
        </div>
      </div>
    </div>
  )
}

export default NFTCard
