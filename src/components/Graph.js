import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const GraphComponent = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Deaths",
        data: [],
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
      {
        label: "Hospitalized Cases",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Positive Cases",
        data: [],
        backgroundColor: "rgba(255, 152, 0, 0.5)",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      yAxes: [
        {
          type: "linear",
          ticks: {
            beginAtZero: true,
          },
          title: {
            display: true,
            text: "Cases",
          },
        },
      ],
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default GraphComponent;
