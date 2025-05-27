// 'use client'

// import Link from 'next/link'
// import toast from 'react-hot-toast'

// type User = {
//   id: number
//   firstName: string
//   lastName: string
//   email: string
//   age: number
//   department: string
//   rating: number
// }

// type CardProps = {
//   user: User
//   onBookmark: (user: User) => void
//   onPromote?: (user: User) => void
//   isBookmarked?: boolean
// }

// export default function Card({
//   user,
//   onBookmark,
//   onPromote,
//   isBookmarked = false,
// }: CardProps) {
//   const handleBookmark = () => {
//     onBookmark(user)
//     toast.success(
//       isBookmarked ? 'Removed from bookmarks!' : 'Bookmarked successfully!'
//     )
//   }

//   const handlePromotion = () => {
//     if (onPromote) {
//       onPromote(user)
//     } else {
//       toast.success(`${user.firstName} has been promoted! 🎉`)
//     }
//   }

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded p-4 flex flex-col gap-2 transition-all">
//       <h2 className="text-lg font-bold text-gray-900 dark:text-white">
//         {user.firstName} {user.lastName}
//       </h2>
//       <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
//       <p className="text-sm text-gray-800 dark:text-gray-300">Age: {user.age}</p>
//       <p className="text-sm text-gray-800 dark:text-gray-300">
//         Department: {user.department}
//       </p>
//       <p className="text-sm text-gray-800 dark:text-gray-300">
//         Rating: {'⭐'.repeat(user.rating)}
//       </p>

//       <div className="flex gap-2 mt-3">
//         <Link
//           href={`/employee/${user.id}`}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//         >
//           View
//         </Link>

//         <button
//           onClick={handleBookmark}
//           className={`${
//             isBookmarked
//               ? 'bg-red-500 hover:bg-red-600'
//               : 'bg-yellow-500 hover:bg-yellow-600'
//           } text-white px-3 py-1 rounded`}
//         >
//           {isBookmarked ? 'Remove' : 'Bookmark'}
//         </button>

//         <button
//           onClick={handlePromotion}
//           className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
//         >
//           Promote
//         </button>
//       </div>
//     </div>
//   )
// }




'use client'

import Link from 'next/link'
import toast from 'react-hot-toast'

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  department: string
  rating: number
}

type CardProps = {
  user: User
  onBookmark: (user: User) => void
  onPromote?: (user: User) => void
  isBookmarked?: boolean
}

export default function Card({
  user,
  onBookmark,
  onPromote,
  isBookmarked = false,
}: CardProps) {
  const handleBookmark = () => {
    onBookmark(user)
    toast.success(
      isBookmarked ? 'Removed from bookmarks!' : 'Bookmarked successfully!'
    )
  }

  const handlePromotion = () => {
    if (onPromote) {
      onPromote(user)
    } else {
      toast.success(`${user.firstName} has been promoted! 🎉`)
    }
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">Age: {user.age}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">Department: {user.department}</p>
      <p className="text-sm text-yellow-600 dark:text-yellow-400">
        {'⭐'.repeat(user.rating)}
      </p>

      <div className="flex gap-2 mt-4">
        <Link
          href={`/employee/${user.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded transition"
        >
          View
        </Link>
        <button
          onClick={handleBookmark}
          className={`px-4 py-1.5 rounded transition text-white ${
            isBookmarked
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          {isBookmarked ? 'Remove' : 'Bookmark'}
        </button>
        <button
          onClick={handlePromotion}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded transition"
        >
          Promote
        </button>
      </div>
    </div>
  )
}
