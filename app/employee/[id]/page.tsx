'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { getRandomDepartment, getRandomRating } from '@/lib/mock'
import { AnimatePresence, motion } from 'framer-motion'

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
      .then((res) => res.json())
      .then((data) => {
        const enriched = {
          ...data,
          department: getRandomDepartment(),
          rating: getRandomRating(),
          bio: 'Passionate and results-driven individual with a strong background in collaboration and leadership.',
          performanceHistory: [
            { year: 2022, rating: getRandomRating() },
            { year: 2023, rating: getRandomRating() }
          ]
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
    setSubmittedFeedback((prev) => [...prev, feedback])
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
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        {user.firstName} {user.lastName}
      </h1>
      <p className="text-sm text-gray-600 mb-1">{user.email}</p>
      <p className="text-sm mb-1">Phone: {user.phone}</p>
      <p className="text-sm mb-1">Department: {user.department}</p>
      <p className="text-sm mb-2">Rating: {'⭐'.repeat(user.rating)}</p>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        {['overview', 'projects', 'feedback'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-1 border-b-2 transition ${
              activeTab === tab ? 'border-blue-500 text-blue-600 font-medium' : 'border-transparent'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content with animation */}
      <div className="text-sm text-gray-800 dark:text-gray-200 min-h-[140px]">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold mb-1">Bio:</h3>
              <p className="mb-3">{user.bio}</p>
              <h3 className="font-semibold mb-1">Performance History:</h3>
              <ul className="list-disc ml-5">
                {user.performanceHistory.map((p: any) => (
                  <li key={p.year}>{p.year}: {'⭐'.repeat(p.rating)}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.p
              key="projects"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              No active projects assigned. (mocked data)
            </motion.p>
          )}

          {activeTab === 'feedback' && (
            <motion.div
              key="feedback"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
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
                <div className="mt-4">
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
