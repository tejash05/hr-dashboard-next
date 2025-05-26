// lib/analyticsData.ts
const departments = ['Engineering', 'HR', 'Marketing', 'Sales', 'Design']

export async function getAverageRatingsData() {
  const res = await fetch('https://dummyjson.com/users?limit=20')
  const data = await res.json()

  const enriched = data.users.map((user: any) => ({
    ...user,
    department: departments[Math.floor(Math.random() * departments.length)],
    rating: Math.floor(Math.random() * 5) + 1,
  }))

  const grouped: Record<string, number> = {}
  departments.forEach((dept) => {
    const users = enriched.filter((u) => u.department === dept)
    const avg = users.reduce((sum, u) => sum + u.rating, 0) / (users.length || 1)
    grouped[dept] = parseFloat(avg.toFixed(2))
  })

  return {
    labels: Object.keys(grouped),
    data: Object.values(grouped),
    title: 'Average Ratings by Department',
    color: 'rgba(59, 130, 246, 0.7)',
  }
}

export function getBookmarkTrendsData() {
  return {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [2, 5, 3, 7],
    title: 'Bookmarks Added Over Time',
    color: 'rgba(34, 197, 94, 0.7)',
  }
}
