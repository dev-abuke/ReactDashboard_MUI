import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Paper from '@mui/material/Paper';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: [""],
    title:  'Chart.js Pie Chart',
    datasets: [
        {
            label: '# of Votes',
            data: [16, 8, 3, 8],
            backgroundColor: [
                'rgba(230, 70, 38, 1)',
                'rgba(129, 130, 133, 1)',
                'rgba(230, 70, 38, 1)',
                'rgba(129, 130, 133, 1)',
            ],
            borderColor: [
                'rgba(255, 255, 255, 255)',
            ],

            borderWidth: [16, 0, 0, 0],
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        marginLeft: "5px",
        align: 'center',
        display: true,
        text: 'Installation By Team',
      },
    },
};

export default function PieChart() {
    return <Paper elevation={3}><Pie data={data} options={options} /></Paper>;
}