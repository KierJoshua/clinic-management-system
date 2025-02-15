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
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
    maintainAspectRatio: false, // Allows flexible height/width
    aspectRatio: 1, // Ensures better scaling
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: window.innerWidth < 768 ? 10 : 14, // Adjust font size for mobile
          },
        },
      },
      title: {
        display: true,
        text: "Product Stock Overview",
        font: {
          size: window.innerWidth < 768 ? 14 : 18, // Adjust title size
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12, // Adjust X-axis labels
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12, // Adjust Y-axis labels
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-lg mx-auto md:max-w-2xl lg:max-w-4xl p-4">
      <div className="relative h-60 sm:h-80 md:h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardBarGraph;
