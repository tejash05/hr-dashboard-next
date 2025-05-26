'use client'

import useBookmarkStore from '@/store/bookmarksStore'
import Card from '@/components/Card'
import toast from 'react-hot-toast'

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarkStore()

  const handleUnbookmark = (user: any) => {
    removeBookmark(user.id)
  }

  const handlePromote = (user: any) => {
    toast.success(`${user.firstName} has been promoted! 🎉`)
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Bookmarked Employees
      </h1>

      {bookmarks.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300 space-y-2">
          <img
            src="/empty-bookmark.png"
            alt="No bookmarks"
            className="mx-auto w-40 opacity-60"
          />
          <p>No bookmarks yet. Go back to the Dashboard and add some!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bookmarks.map((user: any) => (
            <Card
              key={user.id}
              user={user}
              onBookmark={handleUnbookmark}
              onPromote={handlePromote}
              isBookmarked
            />
          ))}
        </div>
      )}
    </div>
  )
}
