// Define a type for your NFT metadata
export type NFTMetadata = {
  image: string;
  name: string;
  description: string;
  price: string; // Assuming price is a string; if not, adjust accordingly
};

// Define a type for the NFT to be stored in state
export type NFT = {
  tokenId: string;
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  contractAddress: string;
};
