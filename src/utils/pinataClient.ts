import FormData from "form-data";

const JWT = process.env.NEXT_PUBLIC_PINATA_IPFS_API_KEY; // Store your JWT in environment variables for security

// const pinFileToIPFS = async (
//   fileBlob: Blob,
//   fileName: string
// ): Promise<void> => {
//   const formData = new FormData();

//   formData.append("file", fileBlob, fileName);

//   const pinataMetadata = {
//     name: fileName,
//   };
//   formData.append("pinataMetadata", JSON.stringify(pinataMetadata));

//   const pinataOptions = {
//     cidVersion: 0,
//   };
//   formData.append("pinataOptions", JSON.stringify(pinataOptions));

//   console.log("IPFS KEY : ", process.env.NEXT_PUBLIC_PINATA_IPFS_API_KEY);

//   const response = await fetch(
//     "https://api.pinata.cloud/pinning/pinFileToIPFS",
//     {
//       method: "POST",
//       body: formData as any,
//       headers: {
//         Authorization: `Bearer ${JWT}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Pinata error: ${response.statusText}`);
//   }

//   const data = await response.json();
//   console.log("Data from IPFS = ", data);
// };

const pinFileToIPFS = async (fileBlob, fileName) => {
  const formData = new FormData();
  formData.append("file", fileBlob, fileName);

  const pinataOptions = {
    cidVersion: 0,
  };
  formData.append("pinataOptions", JSON.stringify(pinataOptions));

  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      body: formData as any,
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Pinata error: ${response.statusText} - ${errorBody}`);
  }

  const data = await response.json();
  return data.IpfsHash;
};

const pinJSONToIPFS = async (jsonBody: any) => {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set content type to application/json
      Authorization: `Bearer ${JWT}`,
    },
    body: JSON.stringify(jsonBody), // Send the JSON body as a string
  });

  if (!response.ok) {
    throw new Error(`Pinata error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.IpfsHash;
};

export { pinFileToIPFS, pinJSONToIPFS };
