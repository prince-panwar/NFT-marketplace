import React from 'react';
import { OwnedNft } from 'alchemy-sdk';

function NftCard({ nft }: { nft: OwnedNft }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
      <div className="rounded-md overflow-hidden">
        <img
          className="object-cover h-48 sm:h-64 md:h-72 lg:h-80 xl:h-80 w-full"
          src={nft.media[0]?.gateway}
          alt={nft.title}
        />
      </div>
      <div className="flex flex-col justify-between bg-slate-100 rounded-b-md p-2 sm:p-3 md:p-4 lg:p-4 xl:p-4 h-28 sm:h-32 md:h-36 lg:h-40 xl:h-40">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-gray-800">{nft.title}</h2>
        <p className="text-gray-600">Id: {nft.tokenId.substring(nft.tokenId.length-4)}</p>
        <p className="text-gray-600">{`${nft.contract.address.substring(0, 4)}...${nft.contract.address.substring(nft.contract.address.length - 4)}`}</p>
     
      </div>
      <div className="flex-grow mt-2 h-24  overflow-y-auto scrollbar-none ">
        <p className="text-gray-600">
        {nft.description ? (
        nft.description.substring(0, 150)
        ) : (
        <span className="text-gray-400 italic">No description</span>
        )}
        </p>
       </div>
        <div className="flex justify-center mt-2">
          <a
            target="_blank"
            href={`https://etherscan.io/token/${nft.contract.address}`}
            className="py-2 px-4 bg-blue-500 w-2/3 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 text-center rounded-m text-white cursor-pointer"
          >
            View on Etherscan
          </a>
        </div>
    </div>
  );
}

export default NftCard;

