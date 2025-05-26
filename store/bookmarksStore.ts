import { create } from 'zustand'

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  department: string
  rating: number
}

type BookmarkState = {
  bookmarks: User[]
  addBookmark: (user: User) => void
  removeBookmark: (id: number) => void
}

const useBookmarkStore = create<BookmarkState>((set) => ({
  bookmarks: [],
  addBookmark: (user) =>
    set((state) => ({
      bookmarks: [...state.bookmarks, user],
    })),
  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((u) => u.id !== id),
    })),
}))

export default useBookmarkStore
