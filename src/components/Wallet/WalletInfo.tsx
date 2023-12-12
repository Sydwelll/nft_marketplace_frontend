'use client';

import { useAccount, useBalance, useNetwork } from 'wagmi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCoins,
  faNetworkWired,
  faWallet,
} from '@fortawesome/pro-solid-svg-icons';
import copyToClipboard from '@/utils/copyToClipboard';
import { useState } from 'react';

export const WalletInfo = () => {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address: address });
  const { chain } = useNetwork();

  const [copied, setCopied] = useState(false); // To handle the address copy

  if (!address || !chain) return null;

  //   const truncatedAddress = `${address.substring(0, 6)}...${address.substring(
  //     address.length - 4,
  //   )}`;

  const handleCopy = async () => {
    await copyToClipboard(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex gap-2">
      {/* Balance Badge */}
      {balanceData && (
        <div className="flex items-center bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
          <FontAwesomeIcon icon={faCoins} className="h-4 w-4 mr-2" />
          <span>
            {balanceData.formatted} {chain.nativeCurrency.symbol}
          </span>
        </div>
      )}

      {/* Chain Badge */}
      {chain && (
        <div className="flex items-center bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
          <FontAwesomeIcon icon={faNetworkWired} className="h-4 w-4 mr-2" />
          <span>{chain.nativeCurrency.name}</span>
        </div>
      )}

      {/* Address Badge */}
      <div
        className="flex items-center bg-gray-700 text-white text-sm font-bold px-3 py-1 rounded-full cursor-pointer"
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        <FontAwesomeIcon
          icon={copied ? faCheck : faWallet}
          className="h-4 w-4 mr-2"
        />
        {copied ? '' : address}
      </div>
    </div>
  );
};
