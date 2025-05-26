'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const BarChart = dynamic(() => import('./BarChart'), { ssr: false })

type ChartData = {
  labels: string[]
  data: number[]
  title: string
  color?: string
}

export default function AnalyticsCharts({
  departmentData,
  bookmarkData,
}: {
  departmentData: ChartData
  bookmarkData: ChartData
}) {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          📊 Department-wise Rating Analytics
        </h1>
        <Suspense fallback={<p>Loading chart...</p>}>
          <BarChart {...departmentData} />
        </Suspense>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          🔖 Bookmark Trends (Mocked)
        </h2>
        <Suspense fallback={<p>Loading chart...</p>}>
          <BarChart {...bookmarkData} />
        </Suspense>
      </div>
    </>
  )
}
