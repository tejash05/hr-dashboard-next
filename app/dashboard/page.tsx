// 'use client'

// import { useEffect, useState } from 'react'
// import CreateUserModal from '@/components/CreateUserModal'
// import Card from '@/components/Card'
// import useBookmarkStore from '@/store/bookmarksStore'
// import useSearch from '@/hooks/useSearch'
// import { getRandomDepartment, getRandomRating } from '@/lib/mock'
// import toast from 'react-hot-toast'
// import { motion, AnimatePresence } from 'framer-motion'

// const departments = ['Engineering', 'HR', 'Marketing', 'Sales', 'Design']
// const ratings = [1, 2, 3, 4, 5]
// const USERS_PER_PAGE = 6

// export default function DashboardPage() {
//   const [users, setUsers] = useState<any[]>([])
//   const [showModal, setShowModal] = useState(false)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(false)
//   const { addBookmark } = useBookmarkStore()

//   useEffect(() => {
//     fetch('https://dummyjson.com/users?limit=20')
//       .then((res) => res.json())
//       .then((data) => {
//         const enriched = data.users.map((user: any) => ({
//           ...user,
//           department: getRandomDepartment(),
//           rating: getRandomRating(),
//         }))
//         setUsers(enriched)
//       })
//       .catch(() => {
//         setError(true)
//       })
//       .finally(() => setLoading(false))
//   }, [])

//   const handleCreateUser = (newUser: any) => {
//     setUsers((prev) => [...prev, newUser])
//     toast.success('New employee added!')
//   }

//   const {
//     searchTerm,
//     setSearchTerm,
//     selectedDepts,
//     setSelectedDepts,
//     selectedRatings,
//     setSelectedRatings,
//     filteredUsers,
//   } = useSearch(users)

//   const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)
//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * USERS_PER_PAGE,
//     currentPage * USERS_PER_PAGE
//   )

//   const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//   const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

//   return (
//     <div className="p-4 space-y-6 relative z-0">
//       {/* Add Employee Button */}
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
//         >
//           ➕ Add Employee
//         </button>
//       </div>

//       {/* Filter Box */}
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">🎛️ Filters</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Search */}
//           <div className="flex flex-col">
//             <label htmlFor="search" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               🔍 Search
//             </label>
//             <input
//               id="search"
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Name, email, or department"
//               className="p-2 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Department */}
//           <div className="flex flex-col">
//             <label htmlFor="department" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               🏢 Department
//             </label>
//             <select
//               id="department"
//               multiple
//               value={selectedDepts}
//               onChange={(e) =>
//                 setSelectedDepts([...e.target.selectedOptions].map((o) => o.value))
//               }
//               className="p-2 h-32 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {departments.map((dept) => (
//                 <option key={dept} value={dept}>
//                   {dept}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Rating */}
//           <div className="flex flex-col">
//             <label htmlFor="rating" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               ⭐ Rating
//             </label>
//             <select
//               id="rating"
//               multiple
//               value={selectedRatings.map(String)} // ✅ FIXED
//               onChange={(e) =>
//                 setSelectedRatings([...e.target.selectedOptions].map((o) => Number(o.value)))
//               }
//               className="p-2 h-32 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {ratings.map((r) => (
//                 <option key={r} value={r}>
//                   {r} Stars
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Cards Grid */}
//       {error ? (
//         <p className="text-red-500 text-center font-medium">⚠️ Failed to load data. Please try again later.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {loading ? (
//             Array.from({ length: 6 }).map((_, i) => (
//               <div key={i} className="p-4 rounded shadow bg-gray-200 dark:bg-gray-700 animate-pulse space-y-3">
//                 <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
//                 <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
//                 <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
//                 <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
//                 <div className="flex gap-2 mt-3">
//                   <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
//                   <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
//                   <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
//                 </div>
//               </div>
//             ))
//           ) : (
//             <AnimatePresence>
//               {paginatedUsers.map((user) => (
//                 <motion.div
//                   key={user.id}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Card user={user} onBookmark={addBookmark} />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           )}
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="flex justify-center gap-4 mt-4">
//         <button
//           onClick={goToPrev}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded disabled:opacity-50"
//         >
//           ⬅️ Previous
//         </button>
//         <span className="text-sm mt-2 text-gray-600 dark:text-gray-300">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={goToNext}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded disabled:opacity-50"
//         >
//           Next ➡️
//         </button>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <CreateUserModal onClose={() => setShowModal(false)} onCreate={handleCreateUser} />
//       )}
//     </div>
//   )
// }



// app/page.tsx
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
      .catch(() => setError(true))
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

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Employee Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-md shadow-md transition"
        >
          ➕ Add Employee
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Filter Employee Data</h2>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Use the search or filters below to find employees quickly by department or performance rating.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-6">
    {/* Search Filter */}
    <div className="space-y-2 col-span-1">
      <label htmlFor="search" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        Search
      </label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name, email, or department"
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium transition-all"
      />
    </div>

    {/* Department Filter */}
    <div className="space-y-2 col-span-1">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Department</label>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedDepts([])}
          className={`px-4 py-1.5 rounded-full text-sm border transition font-medium ${
            selectedDepts.length === 0
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
              : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() =>
              setSelectedDepts((prev) =>
                prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
              )
            }
            className={`px-4 py-1.5 rounded-full text-sm border transition font-medium ${
              selectedDepts.includes(dept)
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>
    </div>

    {/* Rating Filter */}
    <div className="space-y-2 col-span-1">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Rating</label>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedRatings([])}
          className={`px-4 py-1.5 rounded-full text-sm border transition font-medium ${
            selectedRatings.length === 0
              ? 'bg-yellow-500 text-white border-yellow-500 shadow-md'
              : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {ratings.map((r) => (
          <button
            key={r}
            onClick={() =>
              setSelectedRatings((prev) =>
                prev.includes(r) ? prev.filter((n) => n !== r) : [...prev, r]
              )
            }
            className={`px-4 py-1.5 rounded-full text-sm border transition font-medium ${
              selectedRatings.includes(r)
                ? 'bg-yellow-500 text-white border-yellow-500 shadow-md'
                : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-gray-700'
            }`}
          >
            {r} Stars
          </button>
        ))}
      </div>
    </div>
  </div>
</div>



      {/* Cards */}
      {error ? (
        <p className="text-red-500 text-center font-medium">⚠️ Failed to load data. Please try again later.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 rounded shadow bg-gray-200 dark:bg-gray-700 animate-pulse space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                <div className="flex gap-2 mt-3">
                  <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
                  <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
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
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm font-medium text-black dark:text-white rounded disabled:opacity-50"
        >
          ⬅️ Previous
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-300">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm font-medium text-black dark:text-white rounded disabled:opacity-50"
        >
          Next ➡️
        </button>
      </div>

      {showModal && <CreateUserModal onClose={() => setShowModal(false)} onCreate={handleCreateUser} />}
    </div>
  )
}
