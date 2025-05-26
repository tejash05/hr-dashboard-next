'use client'

import { useEffect, useState } from 'react'
import CreateUserModal from '@/components/CreateUserModal'
import Card from '@/components/Card'
import useBookmarkStore from '@/store/bookmarksStore'
import useSearch from '@/hooks/useSearch'
import { getRandomDepartment, getRandomRating } from '@/lib/mock'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const departments = ['Engineering', 'HR', 'Marketing', 'Sales', 'Design']
const ratings = [1, 2, 3, 4, 5]
const USERS_PER_PAGE = 6

export default function DashboardPage() {
  const [users, setUsers] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { addBookmark } = useBookmarkStore()

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=20')
      .then((res) => res.json())
      .then((data) => {
        const enriched = data.users.map((user: any) => ({
          ...user,
          department: getRandomDepartment(),
          rating: getRandomRating(),
        }))
        setUsers(enriched)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleCreateUser = (newUser: any) => {
    setUsers((prev) => [...prev, newUser])
    toast.success('New employee added!')
  }

  const {
    searchTerm,
    setSearchTerm,
    selectedDepts,
    setSelectedDepts,
    selectedRatings,
    setSelectedRatings,
    filteredUsers,
  } = useSearch(users)

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  )

  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  return (
    <div className="p-4 space-y-6 relative z-0">
      {/* Add Employee Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          ➕ Add Employee
        </button>
      </div>

      {/* Filter Box */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">🎛️ Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div className="flex flex-col">
            <label htmlFor="search" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              🔍 Search
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Name, email, or department"
              className="p-2 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label htmlFor="department" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              🏢 Department
            </label>
            <select
              id="department"
              multiple
              value={selectedDepts}
              onChange={(e) =>
                setSelectedDepts([...e.target.selectedOptions].map((o) => o.value))
              }
              className="p-2 h-32 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div className="flex flex-col">
            <label htmlFor="rating" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              ⭐ Rating
            </label>
            <select
              id="rating"
              multiple
              value={selectedRatings}
              onChange={(e) =>
                setSelectedRatings([...e.target.selectedOptions].map((o) => Number(o.value)))
              }
              className="p-2 h-32 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ratings.map((r) => (
                <option key={r} value={r}>
                  {r} Stars
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      {error ? (
        <p className="text-red-500 text-center font-medium">⚠️ Failed to load data. Please try again later.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 rounded shadow bg-gray-200 dark:bg-gray-700 animate-pulse space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
                <div className="flex gap-2 mt-3">
                  <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
                  <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
                  <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              </div>
            ))
          ) : (
            <AnimatePresence>
              {paginatedUsers.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card user={user} onBookmark={addBookmark} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={goToPrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded disabled:opacity-50"
        >
          ⬅️ Previous
        </button>
        <span className="text-sm mt-2 text-gray-600 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded disabled:opacity-50"
        >
          Next ➡️
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <CreateUserModal onClose={() => setShowModal(false)} onCreate={handleCreateUser} />
      )}
    </div>
  )
}
