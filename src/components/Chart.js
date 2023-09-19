import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function ChartComponent({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map((entry) => entry.date),
          datasets: [
            {
              label: 'Cases',
              borderColor: '#8884d8',
              backgroundColor: 'rgba(136, 132, 216, 0.2)',
              data: data.map((entry) => entry.cases),
              fill: true,
            },
            {
              label: 'Deaths',
              borderColor: '#82ca9d',
              backgroundColor: 'rgba(130, 202, 157, 0.2)',
              data: data.map((entry) => entry.deaths),
              fill: true,
            },
            {
              label: 'Recovered',
              borderColor: '#ffc658',
              backgroundColor: 'rgba(255, 198, 88, 0.2)',
              data: data.map((entry) => entry.recovered),
              fill: true,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'MMM D',
                },
              },
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Count',
              },
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef} width="600" height="300"></canvas>
    </div>
  );
}

export default ChartComponent;
