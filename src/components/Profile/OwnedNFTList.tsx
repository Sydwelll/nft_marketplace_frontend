import { useEffect, useState } from "react";
import { Address, useAccount, useContractRead } from "wagmi";
import { motion } from "framer-motion";
import { BigNumberish } from "ethers";
import { NFT, NFTMetadata } from "@/types/nft";
import Image from "next/image";

import NFTMarketplaceABI from "@/abis/NFTMarketplace.json";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { weiToEther } from "@/utils/weiConverter";
import { faLeaf } from "@fortawesome/pro-duotone-svg-icons";

const OwnedNFTsList = () => {
  const contractAddress = process.env.NEXT_PUBLIC_NFT_MARKETPLACE_ADDRESS;
  const { address: userAddress } = useAccount();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [activeNft, setActiveNft] = useState<NFT | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTokenId, setActiveTokenId] = useState<BigNumberish | null>(null);

  // Loading animation component
  const LoadingAnimation = () => (
    <motion.div
      className="flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Here you can add a cool loading spinner or animation */}
      <div className="text-2xl text-gray-600">Loading...</div>
    </motion.div>
  );

  // No NFTs message component
  const NoNFTsMessage = () => (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-xl text-gray-600">No NFTs to display.</div>
    </motion.div>
  );

  const {
    data: tokensData,
    isError: tokenIdsError,
    isLoading: tokenIdsLoading,
  } = useContractRead({
    address: contractAddress as Address,
    abi: NFTMarketplaceABI.abi,
    functionName: "tokensOfOwner",
    args: [userAddress],
  });

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!userAddress || tokenIdsError || tokenIdsLoading || !tokensData) {
        setIsLoading(false);
        return;
      }

      const [tokenIds, tokenUris] = tokensData;
      const fetchedNfts = await Promise.all(
        tokenUris.map(async (uri, index) => {
          const formattedUri = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
          const response = await fetch(formattedUri);
          const metadata: NFTMetadata = await response.json();

          return {
            tokenId: tokenIds[index].toString(),
            imageUrl: metadata.image,
            title: metadata.name,
            description: metadata.description,
            tonsOfCO2: metadata.tonsOfCO2,
            contractAddress,
          };
        })
      );

      setNfts(fetchedNfts);
      setIsLoading(false);
    };

    fetchNFTs();
  }, [
    userAddress,
    tokensData,
    tokenIdsError,
    tokenIdsLoading,
    contractAddress,
  ]);

  const onSlideChange = (swiper) => {
    const nft = nfts[swiper.activeIndex];
    setActiveNft(nft);
    setActiveTokenId(nft ? nft.tokenId : null);
  };

  const { data: salePriceData } = useContractRead({
    address: contractAddress as Address,
    abi: NFTMarketplaceABI.abi,
    functionName: "getTokenSalePrice",
    args: activeTokenId ? [activeTokenId] : null,
    skip: !activeTokenId,
  });

  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="flex w-full max-w-7xl mx-auto">
        {/* Swiper Container */}
        <div className="w-1/2">
          {isLoading ? (
            <LoadingAnimation />
          ) : nfts.length === 0 ? (
            <NoNFTsMessage />
          ) : (
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              onSlideChange={onSlideChange}
              onSwiper={(swiper) => setActiveNft(nfts[swiper.activeIndex])} // Set initial active NFT
            >
              {nfts.map((nft) => (
                <SwiperSlide key={nft.tokenId}>
                  <Image
                    src={nft.imageUrl.replace(
                      "ipfs://",
                      "https://scarlet-raw-lobster-381.mypinata.cloud/ipfs/"
                    )}
                    alt={nft.title}
                    // width={500}
                    // height={800}
                    layout="fill" // change from 'responsive' to 'fill'
                    objectFit="cover" // ensures the image covers the entire area of the slide
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        {/* NFT Information */}
        <div className="w-1/2 p-8">
          {activeNft && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {activeNft.title}
              </h3>
              <p className="text-md text-gray-900 font-semibold mb-4">
                <FontAwesomeIcon
                  icon={faLeaf}
                  className="mr-2 text-green-700"
                />
                {activeNft.tonsOfCO2} tons of CO2
              </p>
              <p className="text-sm text-gray-600 mb-8">
                {activeNft.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnedNFTsList;
