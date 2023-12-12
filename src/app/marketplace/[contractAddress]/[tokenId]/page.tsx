// "use client";

// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faStar,
//   faDollarSign,
//   faShoppingCart,
//   faChartBar,
// } from "@fortawesome/pro-solid-svg-icons";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// );

// import clsx from "clsx";
// import Image from "next/image";

// const nft = {
//   name: "Unique Digital Artwork",
//   href: "#",
//   price: "2.5 ETH",
//   description:
//     "This unique digital artwork is one of a kind and part of a limited series...",
//   mainImgSrc: "/images/nft-test.png",
//   burntImgSrc: "/images/nft-burnt.png",
//   imageAlt: "Unique digital artwork",
//   creator: "Artist Name",
//   collection: "Art Collection",
//   properties: [
//     { name: "Size", value: "500 x 500 px" },
//     { name: "Format", value: "JPEG" },
//   ],
//   isSold: false, // Assuming a flag to indicate if the NFT is sold
// };
// const reviews = { average: 4.6, totalCount: 320 };
// const priceHistory = {
//   labels: ["January", "February", "March", "April", "May"],
//   datasets: [
//     {
//       label: "Price History",
//       data: [2.1, 2.2, 2.3, 2.4, 2.5],
//       fill: false,
//       backgroundColor: "rgb(75, 192, 192)",
//       borderColor: "rgba(75, 192, 192, 0.2)",
//     },
//   ],
// };

// const NFTPage = () => {
//   const [selectedOption, setSelectedOption] = useState(nft.properties[0]);

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8">
//         {/* NFT Image */}
//         <div className="lg:col-start-2 lg:mt-0 lg:self-center">
//           <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
//             <Image
//               src={nft.isSold ? nft.burntImgSrc : nft.mainImgSrc}
//               alt={nft.imageAlt}
//               className="h-full w-full object-cover object-center"
//               width={400}
//               height={400}
//             />
//           </div>
//         </div>

//         {/* NFT Details */}
//         <div className="lg:max-w-lg lg:self-end">
//           <div className="mt-4">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//               {nft.name}
//             </h1>
//           </div>

//           <section aria-labelledby="information-heading" className="mt-4">
//             <h2 id="information-heading" className="sr-only">
//               NFT Information
//             </h2>

//             <div className="flex items-center">
//               <p className="text-lg text-gray-900 sm:text-xl">{nft.price}</p>

//               {/* Optional: Ratings and Reviews */}
//               <div className="ml-4 border-l border-gray-300 pl-4">
//                 <div className="flex items-center">
//                   {[0, 1, 2, 3, 4].map((rating) => (
//                     <FontAwesomeIcon
//                       icon={faStar}
//                       key={rating}
//                       className={clsx(
//                         reviews.average > rating
//                           ? "text-yellow-400"
//                           : "text-gray-300",
//                         "h-5 w-5 flex-shrink-0"
//                       )}
//                       aria-hidden="true"
//                     />
//                   ))}
//                   <p className="ml-2 text-sm text-gray-500">
//                     {reviews.totalCount} reviews
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 space-y-6">
//               <p className="text-base text-gray-500">{nft.description}</p>
//               {/* Price History Chart */}
//               {/* Price History Chart */}
//               <div className="mt-6">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   Price History
//                 </h3>
//                 <div className="mt-4">
//                   <FontAwesomeIcon
//                     icon={faChartBar}
//                     className="h-6 w-6 text-gray-900"
//                   />
//                   <Line data={priceHistory} />
//                 </div>
//               </div>

//               {/* Buy Button */}
//               <div className="mt-6">
//                 <button
//                   type="button"
//                   className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
//                 >
//                   <FontAwesomeIcon
//                     icon={faShoppingCart}
//                     className="h-5 w-5 mr-2"
//                   />
//                   Buy for {nft.price}
//                 </button>
//               </div>

//               {/* NFT Properties */}
//               <div className="mt-6">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   Properties
//                 </h3>
//                 <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
//                   {nft.properties.map((property) => (
//                     <div
//                       key={property.name}
//                       className="py-3 flex justify-between text-sm font-medium"
//                     >
//                       <dt className="text-gray-500">{property.name}</dt>
//                       <dd className="text-gray-900">{property.value}</dd>
//                     </div>
//                   ))}
//                 </dl>
//               </div>

//               {/* Creator Information */}
//               <div className="mt-6">
//                 <h3 className="text-lg font-medium text-gray-900">Creator</h3>
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-500">
//                     Created by{" "}
//                     <a
//                       href="#"
//                       className="text-indigo-600 hover:text-indigo-500"
//                     >
//                       {nft.creator}
//                     </a>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NFTPage;

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
    ],
  }
  ```
*/
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAccount, useContractRead, Address } from "wagmi";
import { faExternalLink, faHeart } from "@fortawesome/pro-duotone-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useTheme } from "next-themes";
import NFTMarketplaceABI from "@/abis/NFTMarketplace.json";
import DescriptionCard from "@/components/DescriptionCard";
import { NFTPriceCO2BubbleChart } from "@/components/NFTRadarPriceChart";
import { weiToEther } from "@/utils/weiConverter";
import { ethers } from "ethers";

interface NFT {
  name: string;
  image: string;
  description: string;
  price?: string; // Add price to NFT type
}

interface NFTProps {
  params: {
    contractAddress: Address;
    tokenId: string;
  };
}

const NFT: React.FC<NFTProps> = ({ params }) => {
  const { contractAddress, tokenId } = params;
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  const { address: userAddress } = useAccount();
  const [isOwner, setIsOwner] = useState(false);
  const [nft, setNft] = useState<NFT | null>(null);
  const [isSold, setIsSold] = useState(false);

  const isLightTheme =
    theme === "light" || (theme === "system" && systemTheme === "light");

  const { data: tokenUriData } = useContractRead({
    address: contractAddress,
    abi: NFTMarketplaceABI.abi,
    functionName: "tokenURI",
    args: [tokenId],
  });

  const { data: ownerAddress, isError: isOwnerAddressError } = useContractRead({
    address: contractAddress,
    abi: NFTMarketplaceABI.abi,
    functionName: "ownerOf",
    args: [tokenId],
  });

  const { data: salePriceData } = useContractRead({
    address: contractAddress,
    abi: NFTMarketplaceABI.abi,
    functionName: "getTokenSalePrice",
    args: [tokenId],
  });

  useEffect(() => {
    const fetchMetadataAndPrice = async () => {
      if (tokenUriData) {
        const formattedUri = tokenUriData.replace(
          "ipfs://",
          "https://scarlet-raw-lobster-381.mypinata.cloud/ipfs/"
        );
        try {
          const response = await fetch(formattedUri);
          const metadata = await response.json();
          const priceInEth = weiToEther(salePriceData.toString());

          // Fetch real-time USD price
          const priceResponse = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
          );
          const priceData = await priceResponse.json();
          const ethToUsdPrice = priceData.ethereum.usd;
          const usdPrice = ethToUsdPrice * parseFloat(priceInEth);

          setNft({ ...metadata, price: priceInEth, usdPrice });
        } catch (error) {
          console.error("Error fetching NFT metadata or price:", error);
        }
      }
    };

    fetchMetadataAndPrice();
  }, [tokenUriData, salePriceData]);

  // useEffect(() => {
  //   const checkIfSold = async () => {
  //     // Here, you would call a contract read function to check if the NFT is sold
  //     // This is a placeholder for where you would put the logic
  //     // For example, it might look something like this:
  //     const { data: isForSale } = useContractRead({
  //       address: contractAddress,
  //       abi: NFTMarketplaceABI.abi,
  //       functionName: "isTokenForSale",
  //       args: [tokenId],
  //     });

  //     // If isForSale is available and false, it means the NFT is sold
  //     if (isForSale !== undefined) {
  //       setIsSold(!isForSale);
  //     }
  //   };

  //   checkIfSold();
  // }, [contractAddress, tokenId]);

  // TODO: Update this because it's not the right way to check if sold or not
  useEffect(() => {
    const checkIfSold = async () => {
      if (ownerAddress) {
        // Assuming ownerAddress is the result of a useContractRead call
        if (ownerAddress.isLoading || ownerAddress.isError) {
          // If still loading or there's an error, don't do anything yet
          return;
        }

        // Check if the data is a zero address, indicating the NFT might be sold or not minted
        if (!ownerAddress.data) {
          setIsSold(true);
        } else {
          setIsSold(false);
        }
      }
    };

    checkIfSold();
  }, [ownerAddress]);

  useEffect(() => {
    if (userAddress && ownerAddress) {
      setIsOwner(userAddress.toLowerCase() === ownerAddress.toLowerCase());
    }
  }, [userAddress, ownerAddress]);

  if (!nft) {
    return <div>Loading...</div>;
  }

  const urlImage = nft.image.replace(
    "ipfs://",
    "https://scarlet-raw-lobster-381.mypinata.cloud/ipfs/"
  );

  return (
    <div className="w-full">
      <div className="pt-6">
        <div className="mx-auto mt-2 px-4">
          {/* NFT Card and Description */}
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-4">
            {/* NFT Card */}
            <div className="lg:col-span-4 lg:col-start-1 lg:row-span-3 bg-black rounded-lg h-[70vh]">
              <div className="flex justify-between items-center p-2 text-white">
                <FontAwesomeIcon
                  icon={faEthereum}
                  className={clsx(
                    isLightTheme ? "text-white" : "text-[#627EEA]",
                    "mr-1 h-6 w-6"
                  )}
                />
                <div className="flex items-center">
                  <button className="p-2">
                    <FontAwesomeIcon
                      icon={faExternalLink}
                      className="h-7 w-7"
                      onClick={() => router.push(urlImage)}
                    />
                  </button>
                  <button className="ml-2 p-2">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="h-7 w-7 text-pink-500"
                    />
                  </button>
                </div>
              </div>
              <div className="relative w-full h-[70vh]">
                <Image
                  src={urlImage}
                  alt={"NFT image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-b-lg"
                />
              </div>
            </div>

            {/* Description Card */}
            <div className="relative w-full h-[70vh] lg:col-span-8 lg:col-start-5 lg:row-span-3">
              <DescriptionCard
                nft={nft}
                contractAddress={contractAddress}
                tokenId={tokenId}
                isOwner={isOwner} // Pass the isOwner prop to the component
                isSold={false} // TODO: Handle isSold ?
              />
            </div>
          </div>

          {/* NFT Bubble Chart */}
          {/* <div className="mt-20">
            <h2 className="text-xl font-bold">Tons of CO2 / Price</h2>
            <div className="w-full h-[100vh]">
              <NFTPriceCO2BubbleChart />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NFT;

{
  /* <div className="my-8">
          <h2 className="text-xl font-bold">Tons of CO2 / Price</h2>
          <div className="h-68 rounded-lg p-4">
            <NFTPriceCO2BubbleChart />
          </div>
        </div>

        <div className="my-8">
          <h2 className="text-xl font-bold">Ownership History</h2>
          <div className="bg-gray-200 h-32 rounded-lg p-4">
            Table placeholder
          </div>
        </div> */
}
