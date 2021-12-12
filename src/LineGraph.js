import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Paper from '@mui/material/Paper';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
        labels: {
            usePointStyle: true,
          },
        display: true,
        position: 'bottom',
    },
    title: {
      display: true,
      text: 'Last 30 Days',
    },
  },
};

const labels = ['30 Nov', '1 Dec', '2 Dec', '3 Dec', '4 Dec', '5 Dec', '6 Dec'];

export const data = { 
  labels,
  datasets: [
    {
      label: 'Installed Devices',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000, precision: 100 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.5,
      pointStyle: 'rectRot',
    },
    {
      label: 'Not Installed Devices',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.5,
    },
  ],
};

export default function LineGraph() {
  return <Paper elevation={3}><Line options={options} data={data} /></Paper>;
}
