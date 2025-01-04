'use client';

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

interface VisitorsChartProps {
    nbVisitors: number,
    nbLocationVisitors: number,
}

export default function VisitorsChart({nbVisitors, nbLocationVisitors}: VisitorsChartProps) {
    const classicVisitors = nbVisitors - nbLocationVisitors;

  // Data for the pie chart
  const data = {
    labels: [`Clients who made locations : ${nbLocationVisitors}`, `Classic visitors : ${classicVisitors}`],
    datasets: [
      {
        label: 'Votes',
        data: [nbLocationVisitors, classicVisitors],
        backgroundColor: [
          '#005FFE',
          'rgba(54, 162, 235, 0.25)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
            align: 'start' as const,
            textAlign: 'left' as const,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className='w-[250px] h-[250px] mx-auto mt-4' >
      <h2 className='font-bold text-xl text-gray-500 text-center mb-1'>{nbVisitors} Visitors</h2>
      <Pie data={data} options={options} />
    </div>
  );
}
