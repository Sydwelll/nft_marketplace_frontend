import { ethers } from "ethers";

export const weiToEther = (wei: string) => {
  return (parseInt(wei) / Math.pow(10, 18)).toString();
};

export function stringToWei(value: string): string {
  // Convert the string value to wei
  const wei = ethers.parseEther(value);
  return wei.toString();
}
