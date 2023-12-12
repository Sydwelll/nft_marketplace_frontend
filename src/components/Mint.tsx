import React, { useEffect, useState } from "react";
import { Address, useAccount, useContractWrite } from "wagmi";
import { motion } from "framer-motion";

// Abis
import NFTMarketplaceABI from "@/abis/NFTMarketplace.json";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-duotone-svg-icons";

// Services
import { generateDallEImages } from "@/utils/openaiClient";
import { pinFileToIPFS, pinJSONToIPFS } from "@/utils/pinataClient";
import { stringToWei } from "@/utils/weiConverter";
import clsx from "clsx";
import { useRouter } from "next/navigation";

// utils

const MintButton = ({
  name,
  description,
  price,
  tonsOfCO2,
  isListed,
  isDisabled,
}: {
  name: string;
  description: string;
  price: number | string;
  tonsOfCO2: number;
  isListed: boolean;
  isDisabled: boolean;
}) => {
  const router = useRouter();

  const { address } = useAccount();
  const [mintStatus, setMintStatus] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const contractAddress = process.env.NEXT_PUBLIC_NFT_MARKETPLACE_ADDRESS;

  const { write, isLoading, isError } = useContractWrite({
    address: contractAddress as Address,
    abi: NFTMarketplaceABI.abi,
    functionName: "safeMint",
    // args: currentMint ? [address, currentMint] : [],
  });

  const handleMint = async () => {
    setIsMinting(true);
    setMintStatus("Preparing NFTs...");

    try {
      // Static image details
      // const imageName = "nft.png";
      // const imagePath = `/images/${imageName}`;

      // Generate and upload images for each keyword
      const dalleResponse = await generateDallEImages();
      // "I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: Please create an illustration drawn in the Japanese anime style, featuring calm colors and fine lines. It should depict a strawberry shortcake placed on a table in a cafe."
      const imageUrl = dalleResponse.data[0]?.url;
      if (!imageUrl) {
        throw new Error("Image URL is undefined");
      }

      console.log("dall e reponse url : ", imageUrl);

      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error("Failed to fetch the image from DALL-E");
      }
      const imageBlob = await imageResponse.blob();
      const imageHash = await pinFileToIPFS(imageBlob, "generatedImage.png");
      if (!imageHash) {
        throw new Error("Failed to upload image to IPFS");
      }
      //   for (const imageHash of imageHashes) {
      console.log("Image Hash:", imageHash); 

      const metadata = {
        name: name,
        description: description,
        image: imageHash ? `ipfs://${imageHash}` : null,
        tonsOfCO2: tonsOfCO2, // The amount of CO2 offset by owning this NFT
      };

      if (!metadata.image) {
        throw new Error("Metadata image URL is undefined");
      }
      console.log("Metadata before pinning:", metadata);
      // This log should show a proper IPFS URL in the image field

      const metadataHash = await pinJSONToIPFS(metadata);

      if (!metadataHash) {
        throw new Error("Failed to upload metadata to IPFS");
      }
      const metadataURI = `ipfs://${metadataHash}`;

      // Write to the contract with the necessary arguments
      write({
        args: [address, metadataURI, isListed, stringToWei(price.toString())],
      });
    } catch (error) {
      console.error("Minting error:", error);
      setMintStatus("Minting failed. Please try again.");
    } finally {
      setIsMinting(false);
      // router.push("/profile/1");
    }
  };

  useEffect(() => {
    if (!isLoading && !isError && !isMinting) {
      setMintStatus("NFT minted successfully!");
    } else if (isError && isMinting) {
      setMintStatus("Minting failed. Please try again.");
    }
  }, [isLoading, isError, isMinting]);

  return (
    <div>
      <button
        className={clsx(
          isDisabled
            ? "cursor-not-allowed bg-gray-300"
            : "bg-primary hover:bg-white hover:text-primary",
          "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white"
        )}
        onClick={handleMint}
        disabled={isMinting || isDisabled}
      >
        {isMinting ? (
          <>
            <motion.div
              animate="spin"
              variants={{
                spin: { rotate: 360 },
              }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <FontAwesomeIcon icon={faSpinner} spin />
            </motion.div>
            <span className="ml-2">{mintStatus}</span>
          </>
        ) : (
          "Mint my token"
        )}
      </button>
      {/* {mintStatus && <p>{mintStatus}</p>} */}
    </div>
  );
};

export default MintButton;
