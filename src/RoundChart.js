import React, { useState, useEffect, useRef } from "react";
import sampleData from "./sampleChartData.json";

function RoundChart({
  apiUrl,
  colors = { errors: "#ff6384", correct: "#36a2eb", empty: "#cc65fe" },
  size = 200,
}) {
  const [data, setData] = useState({ errors: 0, correct: 0, empty: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Replace this with actual API call
        // const response = await fetch("apiUrl");
        // const newData = await response.json();
        setData(sampleData);
        console.log("Fetched data:", sampleData); // Debugging: Log fetched data
      } catch (err) {
        setError(err.message);
        console.error("Fetching error:", err); // Debugging: Log errors
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  useEffect(() => {
    if (canvasRef.current && !isLoading && !error) {
      console.log("Drawing chart with data:", data); // Debugging: Check if drawing function is called

      const canvas = canvasRef.current;
      canvas.width = size; // Debugging: Check size adjustment
      console.log("Canvas size set to:", size);

      const ctx = canvas.getContext("2d");
      drawChart(ctx, data, size);
    }
  }, [data, isLoading, error, size]);

  const calculateAngles = (data) => {
    const total = data.errors + data.correct + data.empty;
    return {
      errors: (data.errors / total) * 2 * Math.PI, // Proportion of 'errors' segment times the full circle angle (2π radians)
      correct: (data.correct / total) * 2 * Math.PI, // Proportion of 'correct' segment times the full circle angle (2π radians)
      empty: (data.empty / total) * 2 * Math.PI, // Proportion of 'empty' segment times the full circle angle (2π radians)
    };
  };

  const drawSegment = (ctx, color, startAngle, endAngle, size) => {
    const radius = size / 2;
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius - 10, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  };

  const drawChart = (ctx, data, size) => {
    ctx.clearRect(0, 0, size, size);
    const angles = calculateAngles(data);
    let startAngle = 0;
    let endAngle = 0;

    for (const key in angles) {
      endAngle = startAngle + angles[key];
      drawSegment(ctx, colors[key], startAngle, endAngle, size);
      startAngle = endAngle;
    }
  };

  if (isLoading) return <p>Loading chart...</p>;
  if (error) return <p>Error loading chart: {error}</p>;

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  };

  return (
    <canvas
      id="roundChartCanvas" // Ensure this is unique if using multiple charts
      draggable="true"
      onDragStart={handleDragStart}
      ref={canvasRef}
      width={size}
      height={size}
    ></canvas>
  );
}

export default RoundChart;
