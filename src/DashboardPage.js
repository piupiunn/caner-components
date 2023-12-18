import React from "react";
import RoundChart from "./RoundChart";
import LineChart from "./LineChart";
import ChartComponent from "./ChartComponent";

function DashboardPage() {
  const handleDrop = (e) => {
    e.preventDefault();
    const chartId = e.dataTransfer.getData("text/plain");
    const chart = document.getElementById(chartId);
    e.target.appendChild(chart);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  //

  const size = { width: 800, height: 400 };

  const fetchData = () => {
    // Veri çekme işlevi
    return Promise.resolve(Math.floor(Math.random() * 1001));
  };
  return (
    <div>
      <div
        id="dropZone1"
        className="dropZone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: "100%",
          height: "200px",
          border: "1px dashed #ccc",
          marginBottom: "10px",
        }}
      >
        Drop Zone 1
      </div>
      <div
        id="dropZone2"
        className="dropZone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: "100%",
          height: "200px",
          border: "1px dashed #ccc",
          marginBottom: "10px",
        }}
      >
        Drop Zone 2
      </div>
      <div
        id="dropZone3"
        className="dropZone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ width: "100%", height: "200px", border: "1px dashed #ccc" }}
      >
        Drop Zone 3
      </div>

      <div
        id="originalPosition"
        className="dropZone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: "100%",
          height: "200px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      >
        Original Position (Place Chart Here)
        {/* Initially, the RoundChart will be here */}
        <RoundChart />
      </div>
      <LineChart
        dataFetcher={fetchData}
        size={size}
        xAxisLabel="Geçen Zaman"
        maxDataPoints={20}
        updateInterval={1000}
        yAxisMax={1000}
        yAxisLabelInterval={100}
      />

      <ChartComponent />
    </div>
  );
}
export default DashboardPage;
