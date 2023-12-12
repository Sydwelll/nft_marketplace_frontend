import { useEffect, useState } from "react";
import { Address, useContractWrite } from "wagmi";
import { ethers } from "ethers";

// ABIs
import NFTMarketplaceABI from "@/abis/NFTMarketplace.json";

// Icons & Utils
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faLeaf,
  faList,
  faMoneyBill,
  faShoppingCart,
  faSpinner,
  faTag,
} from "@fortawesome/pro-duotone-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import clsx from "clsx";

type NFT = {
  name: string;
  price: string; // String Price
  usdPrice: number;
  tonsOfCO2: number;
  description?: string;
};

type DescriptionCardProps = {
  nft: any;
  contractAddress: Address;
  tokenId: number;
  isOwner: boolean;
};

const DescriptionCard = ({
  nft,
  contractAddress,
  tokenId,
  isOwner,
  isSold,
}: DescriptionCardProps & { isSold: boolean }) => {
  const [isBuying, setIsBuying] = useState(false);
  const [buyStatus, setBuyStatus] = useState("");

  const { write, isLoading, isError } = useContractWrite({
    address: contractAddress,
    abi: NFTMarketplaceABI.abi,
    functionName: "buyCredit",
    // args: [tokenId],
  });

  const handleBuy = async () => {
    setIsBuying(true);
    setBuyStatus("Processing purchase...");

    try {
      write({
        args: [tokenId],
        value: ethers.parseEther(nft.price),
      });
    } catch (error) {
      console.error("Buying error:", error);
      setBuyStatus("Purchase failed. Please try again.");
    } finally {
      setIsBuying(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !isError && isBuying) {
      setBuyStatus("Purchase successful!");
    } else if (isError && isBuying) {
      setBuyStatus("Purchase failed. Please try again.");
    }
  }, [isLoading, isError, isBuying]);

  return (
    <div className="relative overflow-hidden bg-white bg-opacity-90 dark:bg-gray-900 p-5 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 space-y-3">
      {isSold && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute transform rotate-45 bg-red-500 text-center text-white font-semibold py-1 shadow-xl right-[-35px] top-[32px] w-[170px]">
            NFT Sold
          </div>
        </motion.div>
      )}

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        {nft.name} #{tokenId}
      </h1>
      <p className="text-md text-gray-900 dark:text-gray-200">
        Owned by <strong>GreenMarket</strong>
      </p>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-2 text-md text-gray-700 dark:text-gray-300">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-blue-500 h-5 w-5 mr-1"
            />
            <span>Contract:</span>
          </span>
          <span className="font-mono text-lg text-blue-400 dark:text-blue-400">
            {contractAddress}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-2 text-md text-gray-700 dark:text-gray-300">
            <FontAwesomeIcon
              icon={faTag}
              className="text-purple-700 h-5 w-5 mr-1"
            />
            <span>Token ID:</span>
          </span>
          <span className="font-mono text-lg text-gray-900 dark:text-white">
            {tokenId}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-2 text-md text-gray-700 dark:text-gray-300">
            <FontAwesomeIcon
              icon={faLeaf}
              className="text-green-600 h-5 w-5 mr-1"
            />
            <span>CO2 Offset:</span>
          </span>
          <span className="font-mono text-lg text-gray-900 dark:text-white">
            {nft.tonsOfCO2} tons
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center space-x-2 text-md text-gray-700 dark:text-gray-300">
          <FontAwesomeIcon
            icon={faList}
            className="text-yellow-500 h-5 w-5 mr-1"
          />
          <span>Description:</span>
        </span>
        <p className="font-mono text-lg text-gray-900 dark:text-white">
          {nft.description || "No description provided."}
        </p>
      </div>
      <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
        <div className="flex items-start justify-between">
          <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
            Current Price
          </span>
          <div className="text-right">
            <div className="flex flex-col items-end">
              <span className="flex items-center text-lg font-bold text-gray-900 dark:text-white">
                <FontAwesomeIcon
                  icon={faEthereum}
                  className="text-blue-500 h-7 w-7"
                />
                {nft.price} ETH
              </span>
              <span className="text-md text-gray-500 dark:text-gray-400">
                ≈ $
                {nft.usdPrice.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}{" "}
                USD
              </span>
            </div>
          </div>
        </div>
        {!isSold && (
          <button
            className={clsx(
              "w-full flex items-center justify-center px-4 py-2 mt-8 border border-transparent shadow-sm text-md font-medium rounded-md transition duration-300 ease-in-out",
              isOwner || isSold
                ? "bg-gray-200 cursor-not-allowed text-gray-900"
                : "bg-primary text-white hover:bg-white hover:text-primary hover:border-2 hover:border-primary"
            )}
            onClick={handleBuy}
            disabled={isOwner || isBuying || isSold}
          >
            {isBuying ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5 mr-2" />
            )}
            {isBuying ? <span className="ml-2">Processing...</span> : "Buy now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DescriptionCard;
