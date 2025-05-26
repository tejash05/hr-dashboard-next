'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {
  labels: string[]
  data: number[]
  title: string
  color?: string
}

export default function BarChart({ labels, data, title, color = 'rgba(59, 130, 246, 0.7)' }: Props) {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: color,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#9ca3af' },
      },
      title: {
        display: true,
        text: title,
        color: '#9ca3af',
      },
    },
    scales: {
      x: { ticks: { color: '#9ca3af' } },
      y: { ticks: { color: '#9ca3af' } },
    },
  }

  return <Bar data={chartData} options={options} />
}
