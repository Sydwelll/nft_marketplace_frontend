// import React, { useState } from "react";
// import { generateDallEImages } from "../utils/openaiClient";
// import { pinFileToIPFS, pinJSONToIPFS } from "@/utils/pinataClient";

// const GenerateAndUploadImage = () => {
//   const [imageIPFSHash, setImageIPFSHash] = useState("");
//   const [metadataIPFSHash, setMetadataIPFSHash] = useState("");

//   const handleImageGenerationAndUpload = async () => {
//     try {
//       // Step 1: Generate Image from DALL-E
//       const dalleResponse = await generateDallEImages("forest with red trees");
//       const imageUrl = dalleResponse.data[0]?.url;

//       if (!imageUrl) {
//         throw new Error("Image URL is undefined");
//       }

//       // Step 2: Fetch and Upload Image to IPFS
//       const imageResponse = await fetch(imageUrl);
//       if (!imageResponse.ok)
//         throw new Error("Failed to fetch the image from DALL-E");
//       const imageBlob = await imageResponse.blob();
//       const imageHash = await pinFileToIPFS(imageBlob, "generatedImage.png");
//       setImageIPFSHash(imageHash);

//       // Step 3: Create Metadata and Upload to IPFS
//       const metadata = {
//         name: "NFT Name",
//         description: "Description of your NFT",
//         image: `ipfs://${imageHash}`,
//       };
//       const metadataHash = await pinJSONToIPFS(metadata);
//       setMetadataIPFSHash(metadataHash);

//       console.log("Image and Metadata uploaded to IPFS");
//     } catch (error) {
//       console.error("Error in process:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleImageGenerationAndUpload}>
//         Generate and Upload Image
//       </button>
//       {imageIPFSHash && <p>Image IPFS Hash: {imageIPFSHash}</p>}
//       {metadataIPFSHash && <p>Metadata IPFS Hash: {metadataIPFSHash}</p>}
//     </div>
//   );
// };

// export default GenerateAndUploadImage;
