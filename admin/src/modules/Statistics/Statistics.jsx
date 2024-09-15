import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export function Statistics({ adminsCount, gameCount, clientCount }) {
  const data = {
    labels: ['Admins', 'Clients', 'Games'],
    datasets: [
      {
        label: 'Diagrams',
        data: [adminsCount, gameCount, clientCount],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#4ade80',
          custor: 'pointer',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Count: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="p-8 px-16  min-h-[50%] overflow-y-scroll bg-white  rounded-2xl shadow-md ">
      <h1 className="text-3xl font-semibold mb-6 text-sidebarBg">Statistics</h1>
      <div className="bg-sidebarBg p-10 flex items-center justify-center rounded-lg h-[450px] text-mainText shadow-lg">
        <Bar data={data} className='text-white' options={options} />
      </div>
    </div>
  );
}
