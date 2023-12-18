import React, { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale
);

const generateDummyData = (resolution) => {
  let data = [];
  const now = new Date();
  let step = 24 * 60 * 60 * 1000; // 1 day in milliseconds for the base data (1 month)
  let rate = 11; // Starting exchange rate

  const randomIncrement = () => Math.random() * (0.75 - 0.1) + 0.1; // Generates a random increment between 0.1 and 0.75

  // First, generate data for 1 month
  for (let i = 0; i < 30; i++) {
    data.push({
      x: new Date(now.getTime() + step * i),
      y: rate,
    });
    rate += randomIncrement();
  }
  data.reverse(); // Reverse to get chronological order

  // Now, extract data for the desired resolution
  switch (resolution) {
    case "1day":
      // Generate 15-minute intervals for the last day
      const oneDayData = [];
      const lastDay = data[data.length - 1].x; // Get the last day from the month data
      let lastRate = data[data.length - 1].y; // Starting rate for the last day
      step = 15 * 60 * 1000; // 15 minutes in milliseconds
      for (let i = 0; i < 96; i++) {
        // 24 hours * 4 intervals per hour
        oneDayData.push({
          x: new Date(lastDay.getTime() + step * i),
          y: lastRate,
        });
        lastRate += randomIncrement();
      }
      return oneDayData;
    case "1week":
      // Extract the last 7 days
      return data.slice(-7); // Last 7 days
    case "1month":
      // Return the full month data
      return data;
    default:
      throw new Error("Unsupported resolution");
  }
};

const ChartComponent = () => {
  // Initialize data with a valid structure, including an empty datasets array
  const [data, setData] = useState({
    datasets: [],
  });
  const [resolution, setResolution] = useState("1day");

  useEffect(() => {
    const dummyData = generateDummyData(resolution);
    // Update state with new data
    setData({
      datasets: [
        {
          label: "Dummy Data",
          data: dummyData,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    });
  }, [resolution]);

  const handleResolutionChange = (newResolution) => {
    setResolution(newResolution);
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time", // Make sure 'time' scale is registered
        time: {
          unit:
            resolution === "1day"
              ? "minute"
              : resolution === "1week"
              ? "hour"
              : "day",
          stepSize:
            resolution === "1day" ? 15 : resolution === "1week" ? 60 : 1440,
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },

    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
      <div>
        <button onClick={() => handleResolutionChange("1day")}>1 Day</button>
        <button onClick={() => handleResolutionChange("1week")}>1 Week</button>
        <button onClick={() => handleResolutionChange("1month")}>
          1 Month
        </button>
        {/* Implement custom time selection component */}
      </div>
    </div>
  );
};

export default ChartComponent;
