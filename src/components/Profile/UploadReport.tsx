import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/pro-duotone-svg-icons";
import MintButton from "../Mint";
import { useZustandStore } from "@/hooks/useZustandStore";

const UploadReport = () => {
  const TON_CO2_PRICE = process.env.NEXT_PUBLIC_TON_CO2_PRICE;

  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftPrice, setNftPrice] = useState(0);
  const [nftPriceInEth, setNftPriceInEth] = useState(0);

  //   const [file, setFile] = useState();

  const [isGreenCompany, setIsGreenCompany] = useState(false);
  const [tonsOfCO2, setTonsOfCO2] = useState(0);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [ethPriceInUsd, setEthPriceInUsd] = useState(null);

  const setEmissionsData = useZustandStore(
    (state: any) => state.setEmissionsData
  );

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const ethPrice = response.data.ethereum.usd;
        setEthPriceInUsd(ethPrice);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
      }
    };

    fetchEthPrice();
  }, []);

  const handleFileChange = async (event: any) => {
    setIsUploadingFile(true);
    const selectedFile = event.target.files[0];

    // Only proceed if a file is selected
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile); // Append the file to form data

      try {
        const response = await fetch("/api/extract-emissions-data", {
          method: "POST",
          body: formData, // Send the form data
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { isGreen, emissionAbsorptionDiff, resultsArray } =
          await response.json();

        setEmissionsData(resultsArray);

        setIsGreenCompany(isGreen);
        setTonsOfCO2(emissionAbsorptionDiff);
        const pricePerTon = parseFloat(TON_CO2_PRICE || "0");
        const priceInUsd = pricePerTon * emissionAbsorptionDiff;
        setNftPrice(priceInUsd);

        // Assuming `ethPriceInUsd` is already set by the time we get here
        if (ethPriceInUsd) {
          const priceInEth = priceInUsd / ethPriceInUsd;
          setNftPriceInEth(priceInEth);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected");
    }

    setIsUploadingFile(false);
  };

  const isFormDisabled = !isGreenCompany || isUploadingFile;

  return (
    <div className="flex h-screen">
      <div className="w-full max-w-7xl px-4 py-6 sm:p-6 lg:pb-8">
        <form
          //   onSubmit={handleSubmit}
          className="overflow-y-auto lg:col-span-9 h-screen"
        >
          <div className="space-y-12">
            <div className="pb-12">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Mint NFT
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Fill out the form to mint a new NFT.
                  </p>
                </div>
                <MintButton
                  name={nftName}
                  description={nftDescription}
                  isListed={true}
                  price={nftPriceInEth.toFixed(4)}
                  tonsOfCO2={tonsOfCO2}
                  isDisabled={isFormDisabled}
                />
              </div>

              <div className="mt-10 flex-grow space-y-6">
                <div className="col-span-full">
                  <label
                    htmlFor="emission-report"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Emission Report
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                    <div className="text-center">
                      <FontAwesomeIcon
                        icon={faFileExcel}
                        className="mx-auto h-12 w-12 text-excel-green"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="emission-report"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload emission report</span>
                          <input
                            id="emission-report"
                            name="emission-report"
                            type="file"
                            accept=".xlsx, .xls"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        XLSX up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="nft-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    NFT Name
                  </label>
                  <input
                    type="text"
                    name="nft-name"
                    id="nft-name"
                    value={nftName}
                    onChange={(e) => setNftName(e.target.value)}
                    className="disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    placeholder="Enter NFT name"
                    disabled={isFormDisabled}
                  />
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="nft-description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    NFT Description
                  </label>
                  <textarea
                    id="nft-description"
                    name="nft-description"
                    rows={3}
                    value={nftDescription}
                    onChange={(e) => setNftDescription(e.target.value)}
                    className="disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    placeholder="Describe the NFT"
                    disabled={isFormDisabled}
                  />
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="nft-price-usd"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    NFT Price (in $)
                  </label>
                  <input
                    type="text"
                    name="nft-price-usd"
                    id="nft-price-usd"
                    value={nftPrice.toFixed(2) || ""}
                    className="disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    disabled
                  />
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="nft-price-eth"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    NFT Price (in ETH)
                  </label>
                  <input
                    type="text"
                    name="nft-price-eth"
                    id="nft-price-eth"
                    value={nftPriceInEth.toFixed(4) || ""}
                    className="disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    disabled
                  />
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="nft-price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    CO2 (Tons)
                  </label>
                  <input
                    type="text"
                    name="tons"
                    id="tons"
                    value={tonsOfCO2}
                    className="disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    placeholder="Tons Of CO2"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadReport;
