// app/analytics/page.tsx
import { getAverageRatingsData, getBookmarkTrendsData } from '@/lib/analyticsData'
import AnalyticsCharts from '@/components/AnalyticsCharts'

export default async function AnalyticsPage() {
  const departmentData = await getAverageRatingsData()
  const bookmarkData = await getBookmarkTrendsData()

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-10">
      <AnalyticsCharts departmentData={departmentData} bookmarkData={bookmarkData} />
    </div>
  )
}
