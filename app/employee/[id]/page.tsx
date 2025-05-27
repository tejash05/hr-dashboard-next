'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'
import { getRandomDepartment, getRandomRating } from '@/lib/mock'
import { LineChart } from '@mui/x-charts'

export default function EmployeeDetails() {
  const params = useParams()
  const id = params?.id
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'feedback'>('overview')
  const [feedback, setFeedback] = useState('')
  const [submittedFeedback, setSubmittedFeedback] = useState<string[]>([])

  useEffect(() => {
    if (!id) return

    fetch(`https://dummyjson.com/users/${id}`)
      .then(res => res.json())
      .then(data => {
        const mockProjects = [
          { name: 'Website Redesign', year: '2023–24' },
          { name: 'CRM Integration', year: '2022–23' },
          { name: 'AI Chatbot Rollout', year: '2024–25' },
          { name: 'Employee Portal Upgrade', year: '2021–22' },
        ]

        const enriched = {
          ...data,
          department: getRandomDepartment(),
          rating: getRandomRating(),
          bio: 'Passionate and results-driven individual with a strong background in collaboration and leadership.',
          performanceHistory: [
            { year: 2021, rating: getRandomRating() },
            { year: 2022, rating: getRandomRating() },
            { year: 2023, rating: getRandomRating() },
            { year: 2024, rating: getRandomRating() },
            { year: 2025, rating: getRandomRating() },
          ],
          assignedProjects: mockProjects
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 3) + 1)
        }
        setUser(enriched)
      })
  }, [id])

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedback.trim()) {
      toast.error('Feedback cannot be empty!')
      return
    }
    setSubmittedFeedback(prev => [...prev, feedback])
    setFeedback('')
    toast.success('Feedback submitted successfully!')
  }

  if (!user) return <p className="text-center p-4">Loading employee...</p>

  const tabVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* LEFT: Profile */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center justify-start h-[515px]">
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold text-white mb-6 shadow-md">
          {user.firstName[0]}
        </div>

        {/* Name */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 text-center">
          {user.firstName} {user.lastName}
        </h2>

        {/* Divider */}
        <div className="w-12 border-b-2 border-blue-500 my-2" />

        {/* Info with labels */}
        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3 mt-4 w-full">
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Phone:</span> {user.phone}</p>
          <p><span className="font-semibold">Department:</span> {user.department}</p>
          <p><span className="font-semibold">Rating:</span> {'⭐'.repeat(user.rating)} ({user.rating}/5)</p>
        </div>
      </div>

      {/* RIGHT: Tabs and Chart */}
      <div className="md:col-span-2 space-y-6">
        {/* Tabs */}
        <div className="border-b border-gray-300 dark:border-gray-600 flex gap-6">
          {['overview', 'projects', 'feedback'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-2 transition font-medium ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
<motion.div
key="overview"
variants={tabVariants}
initial="initial"
animate="animate"
exit="exit"
transition={{ duration: 0.3 }}
className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow"
>
<h3 className="font-semibold text-lg mb-2">Bio</h3>
<p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{user.bio}</p>

<h3 className="font-semibold text-lg mb-2">Performance Chart</h3>

<LineChart
xAxis={[
    {
data: user.performanceHistory.map((p: any) => p.year),
label: 'Year',
labelStyle: { fill: '#9ca3af', fontWeight: 500 },
tickLabelStyle: { fill: '#9ca3af' },
    },
  ]}
yAxis={[
    {
min: 0,
max: 5,
label: 'Ratings',
labelStyle: { fill: '#9ca3af', fontWeight: 500 },
tickLabelStyle: { fill: '#9ca3af' },
    },
  ]}
series={[{ data: user.performanceHistory.map((p: any) => p.rating) }]}
height={300}
grid={{ vertical: true, horizontal: true }}
sx={{
'.MuiLineElement-root': { stroke: '#3b82f6' },
'.MuiMarkElement-root': { fill: '#3b82f6' },
  }}
/>

</motion.div>
)}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow"
            >
              {user.assignedProjects && user.assignedProjects.length > 0 ? (
                <ul className="space-y-2">
                  {user.assignedProjects.map((proj: any, idx: number) => (
                    <li key={idx} className="p-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{proj.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Year: {proj.year}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">No active projects assigned.</p>
              )}
            </motion.div>
          )}

          {activeTab === 'feedback' && (
            <motion.div
              key="feedback"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow space-y-4"
            >
              <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Write your feedback..."
                  className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none"
                  rows={3}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Submit Feedback
                </button>
              </form>

              {submittedFeedback.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Submitted Feedback:</h3>
                  <ul className="list-disc ml-5">
                    {submittedFeedback.map((fb, i) => (
                      <li key={i}>{fb}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
