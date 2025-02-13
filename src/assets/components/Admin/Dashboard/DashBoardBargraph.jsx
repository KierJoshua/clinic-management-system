import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import productData from "../Products/ProductData";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardBarGraph = () => {
  const category1Stocks = productData
  .filter((product) => product.category === "Lens")
  .reduce((total, product) => total + product.stocks, 0);

const category2Stocks = productData
  .filter((product) => product.category === "Eyeglass Frames")
  .reduce((total, product) => total + product.stocks, 0);

const category3Stocks = productData
  .filter((product) => product.category === "Others")
  .reduce((total, product) => total + product.stocks, 0);
  const data = {
    labels: ["Lens", "Eyeglass Frames", "Others"],
    datasets: [
      {
        label: "Products",
        data: [category1Stocks, category2Stocks, category3Stocks],
        backgroundColor: ["#7ED4AD", "#EF5A6F", "black"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bar Chart Example",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default DashboardBarGraph;
