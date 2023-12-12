// "use client";

// import React, { useState, useEffect } from "react";
// import { Address, useAccount, useContractRead } from "wagmi";

// import { motion } from "framer-motion";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHexagonVerticalNft } from "@fortawesome/pro-duotone-svg-icons";

// import NFTMarketplaceABI from "@/abis/NFTMarketplace.json";

// const NFTSlider = () => {
//   const contractAddress = process.env
//     .NEXT_PUBLIC_NFT_MARKETPLACE_ADDRESS as Address;

//   const [nfts, setNfts] = useState([]);
//   // const [currentSlide, setCurrentSlide] = useState(0);

//   // const { address } = useAccount();

//   const { data, isError, isLoading } = useContractRead({
//     address: contractAddress as Address,
//     abi: NFTMarketplaceABI.abi,
//     functionName: "getAllAvailableNFTs", // Replace with your actual contract function
//   });
//   useEffect(() => {
//     if (data) {
//       console.log("Data in the useEffect ", data);
//       setNfts(data);
//     }
//   }, [data]);

//   {
//     JSON.stringify("nfff : ", nfts);
//   }
//   if (!nfts.length) return <div>Loading...</div>;

//   return (
//     <div>
//       {data?.map((nft) => (
//         <div key={nft.tokenId}>
//           {/* Display NFT details here */}
//           <p>Token ID: {nft.tokenId}</p>
//           {/* Additional NFT details */}
//         </div>
//       ))}
//     </div>
//   );
// };

// //   const slideRight = () => {
// //     setCurrentSlide((prev) => (prev + 1) % nfts.length);
// //   };

// //   const slideLeft = () => {
// //     setCurrentSlide((prev) => (prev - 1 + nfts.length) % nfts.length);
// //   };

// //   return (
// //     <div className="relative flex items-center justify-center">
// //       <motion.div
// //         className="flex overflow-x-hidden"
// //         initial={{ x: 0 }}
// //         animate={{ x: -currentSlide * 100 + "%" }}
// //         transition={{ type: "tween", duration: 0.5 }}
// //       >
// //         {nfts.map((nft, index) => (
// //           <div key={index} className="flex-none w-full max-w-md p-4">
// //             <img
// //               src={nft.image}
// //               alt={nft.title}
// //               className="w-full h-auto object-cover"
// //             />
// //             <div className="text-lg font-semibold">{nft.title}</div>
// //             <div className="text-sm text-gray-500">
// //               {<FontAwesomeIcon icon={faHexagonVerticalNft} />}{" "}
// //               {/* Replace with actual verified icon */}
// //               Created by Me
// //               {/* {nft.creator} */}
// //             </div>
// //             <div className="text-sm">{nft.price}</div>
// //           </div>
// //         ))}
// //       </motion.div>
// //       <button onClick={slideLeft} className="absolute left-0 p-4">
// //         {"<"}
// //       </button>
// //       <button onClick={slideRight} className="absolute right-0 p-4">
// //         {">"}
// //       </button>
// //     </div>
// //   );
// // };

// export default NFTSlider;

"use client";

import React from "react";
import { Address, useContractRead } from "wagmi";
import NFTMarketplaceABI from "@/abis/NFTMarketplace.json";

const DisplayTokens = () => {
  const contractAddress = process.env
    .NEXT_PUBLIC_NFT_MARKETPLACE_ADDRESS as Address;

  // Use Wagmi's useContractRead hook to read data from the contract
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: NFTMarketplaceABI.abi,
    functionName: "getAllMintedNFTs",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error fetching tokens.</div>;

  return (
    <div>
      <h2>Minted Tokens</h2>
      <ul>
        {data?.map((token, index) => (
          <li key={index}>Token ID: {token.toString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayTokens;
