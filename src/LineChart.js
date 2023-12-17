/**
 * @component LineChart
 * @description
 * A reusable and customizable line chart component for React applications.
 * Renders a line chart using HTML5 Canvas API based on provided data.
 *
 * @prop {Function} dataFetcher - Function to fetch data for the chart.
 *   Should return a Promise that resolves to a numeric value.
 * @prop {Object} size - Object containing width and height of the chart
 *   e.g., { width: 800, height: 400 }.
 * @prop {number} updateInterval - Interval in milliseconds for updating
 *   the chart with new data.
 * @prop {number} maxDataPoints - Maximum number of data points to display.
 * @prop {number} yAxisLabelInterval - Interval for labeling the Y-axis.
 * @prop {string} xAxisLabel - Label for the X-axis. Defaults to "Geçen Zaman".
 * @prop {number} yAxisMax - Maximum value for the Y-axis.
 *
 * @example
 * <LineChart
 *   dataFetcher={() => fetchChartData()}
 *   size={{ width: 800, height: 400 }}
 *   updateInterval={1000}
 *   maxDataPoints={20}
 *   yAxisLabelInterval={100}
 *   xAxisLabel="Time Elapsed"
 *   yAxisMax={1000}
 * />
 *
 * @remarks
 * - The component automatically updates at the specified interval.
 * - Ensure that the dataFetcher function is optimized for performance.
 * - This component is designed to be adaptable to various data visualization needs.
 */

import React, { useState, useEffect, useRef } from "react";

const LineChart = ({
  dataFetcher, // Function to fetch data for the chart
  size, // Size of the chart (width and height)
  updateInterval, // Interval at which data is fetched and chart is updated
  maxDataPoints, // Maximum number of data points to display in the chart
  yAxisLabelInterval, // Interval for labeling the Y-axis
  xAxisLabel, // Label for the X-axis
  yAxisMax, // Maximum value for the Y-axis
}) => {
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  // State to store the data points for the chart
  const [dataPoints, setDataPoints] = useState([]);
  // Ref for direct DOM manipulation of the canvas element
  const canvasRef = useRef(null);

  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  // Function to draw the static elements (axes and labels) on the canvas
  const drawStaticElements = (ctx) => {
    // Clear the entire canvas
    ctx.clearRect(0, 0, size.width, size.height);
    // Begin drawing axes
    ctx.beginPath();
    ctx.strokeStyle = "#000"; // Black color for axes
    // Draw the Y-axis
    ctx.moveTo(40, size.height - 40);
    ctx.lineTo(40, 40);
    // Draw the X-axis
    ctx.moveTo(40, size.height - 40);
    ctx.lineTo(size.width - 40, size.height - 40);
    ctx.stroke();

    // Add labels to the Y-axis
    ctx.fillStyle = "#000"; // Black color for text
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let i = 0; i <= yAxisMax; i += yAxisLabelInterval) {
      const y = size.height - 40 - (i / yAxisMax) * (size.height - 80);
      ctx.fillText(i.toString(), 35, y);
    }

    // Add label for the X-axis
    ctx.textAlign = "center";
    ctx.fillText(xAxisLabel, size.width / 2, size.height - 15);
  };

  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  // Function to draw the dynamic elements (data line) on the canvas
  const drawDynamicElements = (ctx, dataPoints) => {
    // Calculate width and height for the chart area
    const chartWidth = size.width - 80;
    const chartHeight = size.height - 80;

    // Begin drawing the data line
    ctx.beginPath();
    ctx.strokeStyle = "#007bff"; // Blue color for the data line
    // Move to the first data point
    // Set the starting point for drawing the data line
    // The 'moveTo' method of the canvas context positions the starting point of the new sub-path
    // Here, we calculate the initial X and Y coordinates for the line based on the first data point
    //
    // X Coordinate:
    // We set a fixed margin of 40 pixels from the left, hence '40'
    // This ensures that our line starts after the Y-axis and within the chart area
    //
    // Y Coordinate:
    // The Y-coordinate is calculated based on the first data point's value
    // - 'size.height - 40' represents the bottom margin of the chart
    // - 'dataPoints[0]' is the first data point's value
    // - '/ yAxisMax' normalizes the data point value relative to the maximum Y-axis value
    // - 'dataPoints[0] / yAxisMax': Normalizes the first data point's value relative to the maximum Y-axis value.
    // - '* chartHeight' scales the normalized value to the chart's height
    // - The whole expression is subtracted from 'size.height - 40' to invert the Y-axis (canvas has a top-left origin)
    // The result is the Y-coordinate where the first data point will be plotted
    ctx.moveTo(40, size.height - 40 - (dataPoints[0] / yAxisMax) * chartHeight);

    // Draw lines connecting each data point on the canvas
    dataPoints.forEach((point, index) => {
      // Calculate the X coordinate for each data point
      // - '40': The starting X position, aligning with the margin and Y-axis
      // - 'index / (maxDataPoints - 1)': Calculates the relative position of the data point
      //   based on its index. It divides the chart width into equal segments for each data point.
      const x = 40 + (index / (maxDataPoints - 1)) * chartWidth;

      // Calculate the Y coordinate for each data point
      // - 'point / yAxisMax': Normalizes the data point's value relative to the maximum Y-axis value
      // - The result is scaled to the chart height and inverted due to the canvas's top-left origin
      const y = size.height - 40 - (point / yAxisMax) * chartHeight;

      // Draw a line to the calculated X and Y coordinates from the current path position
      ctx.lineTo(x, y);
    });

    // Render the line on the canvas
    // The 'stroke' method draws the path defined by 'lineTo' methods
    ctx.stroke();
  };

  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  // useEffect hook to set up the chart initially and start the data update loop
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    drawStaticElements(ctx); // Draw static elements on mount

    // Set an interval to fetch new data and update the chart
    const intervalId = setInterval(() => {
      dataFetcher().then((newData) => {
        setDataPoints((prevDataPoints) => [
          ...prevDataPoints.slice(-maxDataPoints + 1),
          newData,
        ]);
      });
    }, updateInterval);

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [dataFetcher, maxDataPoints, updateInterval, size.width, size.height]);

  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  // useEffect hook to redraw the dynamic elements (data line) when new data is received
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    // Clear area for dynamic elements and redraw
    ctx.clearRect(40, 40, size.width - 80, size.height - 80);
    drawStaticElements(ctx); // Redraw static elements
    drawDynamicElements(ctx, dataPoints); // Draw dynamic elements
  }, [dataPoints, size.width, size.height]);

  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  // Render the canvas element
  return (
    <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
  );
};

export default LineChart;
