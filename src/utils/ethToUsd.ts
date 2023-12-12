export const convertEthToUsd = (ethPrice: number) => {
  const ethToUsdRate = 3000;
  return ethPrice * ethToUsdRate; // Rounds to 2 decimal places
};
