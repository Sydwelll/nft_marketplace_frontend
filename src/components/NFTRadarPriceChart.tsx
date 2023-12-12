import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const nftData = [
  // Replace with your actual NFT data
  { price: 100, co2Tons: 2900 },
  { price: 150, co2Tons: 5000 },
  { price: 220, co2Tons: 100 },
  { price: 100, co2Tons: 2000 },
  { price: 500, co2Tons: 10000 },
  { price: 100, co2Tons: 10 },
  { price: 100, co2Tons: 1200 },
  { price: 50, co2Tons: 5000 },
  { price: 100, co2Tons: 2500 },
  // ... other NFTs
];

const options = {
  scales: {
    x: {
      title: {
        display: true,
        text: "Price ($)",
      },
      beginAtZero: true,
    },
    y: {
      title: {
        display: true,
        text: "CO2 Tons",
      },
      beginAtZero: true,
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.dataset.label || "";
          const xLabel = context.raw.x;
          const yLabel = context.raw.y;
          return `${label}: ($${xLabel}, ${yLabel} CO2 Tons)`;
        },
      },
    },
  },
};

const getBubbleColor = (price) => {
  // This is a simple function to interpolate between green and red based on price
  // More sophisticated functions can be used to adjust the interpolation
  const maxPrice = 500; // Define the max price for the most expensive NFT
  const intensity = Math.min(1, price / maxPrice);
  return `rgba(${255 * intensity}, ${255 * (1 - intensity)}, 0, 0.5)`;
};

const calculateBubbleSizes = (data) => {
  // This is a placeholder for the actual implementation
  // which would calculate the density of NFTs around each point
  // and then return an array of sizes based on that density
  // For now, we'll return a fixed size for simplicity
  return data.map(() => 10); // Replace with density-based sizes
};

// Function to calculate dataset for the bubble chart
const getBubbleDataset = () => {
  const bubbleSizes = calculateBubbleSizes(nftData);
  return {
    label: "NFT Data",
    data: nftData.map((nft, index) => ({
      x: nft.price,
      y: nft.co2Tons,
      r: bubbleSizes[index],
    })),
    backgroundColor: nftData.map((nft) => getBubbleColor(nft.price)),
  };
};

const data = {
  datasets: [getBubbleDataset()],
};

export const NFTPriceCO2BubbleChart = () => {
  return <Bubble options={options} data={data} />;
};
