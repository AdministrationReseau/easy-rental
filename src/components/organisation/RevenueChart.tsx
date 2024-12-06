'use client';

import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register components
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

interface RevenueChartProps {
    revenues : number[],
    totalRevenue : number
}

const RevenueChart = ({revenues, totalRevenue}: RevenueChartProps) => {
  // Revenues for the week
  // This next line get the day of today and get the names of the 7 previous days
  const today = new Date();
  const days = Array.from({ length: 8 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }).reverse();

  // Calculate the average revenue
  const weeklyRevenue = revenues.reduce((sum, value) => sum + value, 0);
  const averageRevenue = weeklyRevenue / revenues.length;

  // Data for the chart
  const data = {
    labels: days,
    datasets: [
      {
        label: 'Revenues',
        data: revenues,
        borderColor: '#005FFE',
        backgroundColor: 'white',
        pointBackgroundColor: '#005FFE',
        pointBorderColor: '#fff',
        borderWidth: 3,
        tension: 0.1,
      },
      {
        label: 'Average Revenue',
        data: new Array(revenues.length).fill(averageRevenue),
        backgroundColor: 'white',
        borderColor: '#FF5D47',
        borderWidth: 1,
        borderDash: [5, 5], // Dashed line
        pointRadius: 0
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        // Get revenues sum
        text: `Weekly Revenues (${weeklyRevenue} FCFA)`,
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '[ Revenue (FCFA) ]',
        },
        ticks: {
            font: {
              weight: 'bold',
            },
        },
      },
      x: {
        title: {
          display: true,
          text: '[ Days ]',
        },
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
