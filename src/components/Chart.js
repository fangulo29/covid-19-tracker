import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const ChartComponent = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Positive Cases",
        data: [],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.covidtracking.com/v1/us/daily.json?date=2023-09-19&endDate=2023-09-19"
        );

        const data = response.data;
        const dates = data.map((item) => item.date);
        const positiveCases = data.map((item) => item.positive);

        setChartData({
          ...chartData,
          labels: dates,
          datasets: [
            {
              ...chartData.datasets[0],
              data: positiveCases,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array means it will fetch data once when the component mounts

  const chartOptions = {
    scales: {
      x: [
        {
          type: "time", // Specify the X-axis as a time scale
          time: {
            unit: "day", // You can adjust the time unit as needed
            parser: "YYYYMMDD", // Date format in your data
            tooltipFormat: "ll", // Tooltip date format
          },
          title: {
            display: true,
            text: "Date", // X-axis label
          },
        },
      ],
      y: [
        {
          type: "linear", // Specify the Y-axis as a linear scale
          title: {
            display: true,
            text: "Positive Cases", // Y-axis label
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
