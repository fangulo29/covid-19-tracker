import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const ChartComponent = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Deaths",
        data: [],
        fill: false,
        borderColor: "rgba(255, 0, 0, 1)",
      },
      {
        label: "Hospitalized Cases",
        data: [],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Positive Cases",
        data: [],
        fill: false,
        borderColor: "rgba(255, 152, 0, 1)",
      },
    ],
  });

  useEffect(() => {
    const dates = data.map((item) => item.date);
    const deathCases = data.map((item) => item.death);
    const hospitalizedCases = data.map((item) => item.hospitalized);
    const positiveCases = data.map((item) => item.positive);

    setChartData({
      ...chartData,
      labels: dates,
      datasets: [
        {
          ...chartData.datasets[0],
          data: deathCases,
        },
        {
          ...chartData.datasets[1],
          data: hospitalizedCases,
        },
        {
          ...chartData.datasets[2],
          data: positiveCases,
        },
      ],
    });
  }, [data]);

  const chartOptions = {
    scales: {
      x: [
        {
          type: "time",
          time: {
            unit: "day",
            parser: "YYYYMMDD",
            tooltipFormat: "ll",
          },
          title: {
            display: true,
            text: "Date",
          },
        },
      ],
      y: [
        {
          type: "linear",
          title: {
            display: true,
            text: "Positive Cases",
          },
        },
      ],
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default ChartComponent;
