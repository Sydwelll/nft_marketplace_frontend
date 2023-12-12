"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Address, useContractRead /*, useContractWrite */ } from "wagmi";
import NFTMarketplaceABI from "@/abis/NFTMarketplace.json";

import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

// Interface for NFT data
interface NFTCardProps {
  imageUrl: string;
  title: string;
  price: string;
  creator: string;
  tokenId: number;
  contractAddress: string;
}

interface NFT {
  tokenId: number;
  name?: string;
  image?: string;
  description?: string;
  // Add any other relevant fields
}

import { faCheckCircle } from "@fortawesome/pro-solid-svg-icons";
import MintButton from "@/components/Mint";
import { weiToEther } from "@/utils/weiConverter";
import { faFrownOpen } from "@fortawesome/pro-duotone-svg-icons";

const NFTCard = ({
  imageUrl,
  title,
  price,
  creator,
  tokenId,
  contractAddress,
}: NFTCardProps) => {
  const router = useRouter();

  return (
    <div
      className="w-96 h-[28rem] overflow-hidden rounded-xl shadow-lg bg-black relative group cursor-pointer"
      onClick={() => router.push(`/marketplace/${contractAddress}/${tokenId}`)}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-full h-full absolute inset-0"
      >
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-500 group-hover:opacity-80"
        />
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute bottom-0 p-4 w-full">
        <div className="flex items-center text-white">
          <p className="text-sm font-extrabold">{title}</p>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-blue-500 ml-1"
          />
        </div>
        <div className="flex items-center text-white">
          <FontAwesomeIcon
            icon={faEthereum}
            className="text-[#627EEA] -ml-1 mr-1 h-6 w-6"
          />
          <span className="text-lg font-extrabold text-white">{price}</span>
        </div>
      </div>
    </div>
    // {/* </div> */}
  );
};

const NFTSkeleton = () => (
  <div className="w-full inline-block px-5">
    <div className="w-96 h-[28rem] animate-pulse bg-gray-300 rounded-xl"></div>
  </div>
);

const EmptyNFTCard = () => {
  return (
    <div className="w-96 h-[28rem] flex flex-col items-center justify-center rounded-xl shadow-lg bg-gray-100">
      <FontAwesomeIcon icon={faFrownOpen} className="text-6xl text-gray-600" />
      <h2 className="text-xl font-bold mt-4">No NFTs Listed Yet</h2>
      <p className="text-gray-600">Check back later or start minting!</p>
    </div>
  );
};

const Marketplace = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const contractAddress = process.env
    .NEXT_PUBLIC_NFT_MARKETPLACE_ADDRESS as string;

  // Fetching the list of minted tokens from the contract
  const {
    data: tokenDataArray,
    isError,
    isLoading: isReading,
  } = useContractRead({
    address: contractAddress as Address,
    abi: NFTMarketplaceABI.abi,
    functionName: "getAllListedTokens",
    watch: true, // Set to true to re-fetch on every new block
  });

  useEffect(() => {
    const fetchNFTs = async () => {
      if (isError || !tokenDataArray) {
        setIsLoading(false);
        return;
      }

      const [tokenIds, tokenUris, tokenPrices] =
        tokenDataArray &&
        tokenDataArray.map((array: any[]) =>
          array.map((item) => item.toString())
        );

      const nftsData = await Promise.all(
        tokenUris.map(async (uri: string, index: number) => {
          try {
            const formattedUri = uri.replace(
              "ipfs://",
              "https://scarlet-raw-lobster-381.mypinata.cloud/ipfs/"
            );
            const response = await fetch(formattedUri);
            if (!response.ok) {
              console.error(
                "Failed to fetch:",
                formattedUri,
                response.statusText
              );
              return null;
            }
            const metadata = await response.json();
            return {
              tokenId: parseInt(tokenIds[index]),
              image: metadata.image,
              name: metadata.name,
              description: metadata.description,
              price: weiToEther(tokenPrices[index]),
              contractAddress,
            };
          } catch (error) {
            console.error("Error fetching NFT metadata:", error);
            return null;
          }
        })
      );

      setNfts(nftsData.filter((nft: NFT) => nft)); // Filter out null values
      setIsLoading(false);
    };

    if (!isReading) {
      fetchNFTs();
    }
  }, [tokenDataArray, isError, isReading, contractAddress]);

  if (isLoading) {
    return (
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-1 lg:p-4">
            <NFTSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (isError) return <div>Error loading NFTs.</div>;

  return (
    <div className="flex flex-wrap justify-center -mx-1 lg:-mx-4">
      {nfts.length > 0 ? (
        nfts.map((nft) => (
          <div
            key={nft.tokenId}
            className="p-1 lg:p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <NFTCard
              imageUrl={nft.image.replace(
                "ipfs://",
                "https://scarlet-raw-lobster-381.mypinata.cloud/ipfs/"
              )}
              title={nft.name || "NFT Title"}
              price={nft.price}
              creator={nft.creator || "NFT Creator"}
              tokenId={nft.tokenId}
              contractAddress={contractAddress}
            />
          </div>
        ))
      ) : (
        <div className="w-full text-center">
          <EmptyNFTCard />
        </div>
      )}
    </div>
  );
};

export default Marketplace;
