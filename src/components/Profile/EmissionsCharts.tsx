import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useZustandStore } from "@/hooks/useZustandStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Emissions and Absorptions Chart",
    },
  },
};

const EmissionsChart = () => {
  const emissionsData = useZustandStore((state) => state.emissionsData);

  console.log("Emissions Data : ", emissionsData);

  // Prepare data for the chart
  const labels = Object.keys(emissionsData);
  const emissions = labels.map((month) => emissionsData[month][0]);
  const absorptions = labels.map((month) => emissionsData[month][1]);

  const data = {
    labels,
    datasets: [
      {
        label: "Emissions",
        data: emissions,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Absorptions",
        data: absorptions,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div style={{ height: "100%" }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default EmissionsChart;
