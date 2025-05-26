'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [darkMode, setDarkMode] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light'
    setDarkMode(theme === 'dark')
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [])

  const toggleTheme = () => {
    const nextTheme = !darkMode
    setDarkMode(nextTheme)
    localStorage.setItem('theme', nextTheme ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', nextTheme)
  }

  if (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')) {
    return null
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex justify-between items-center relative">
      <div className="flex gap-6 items-center">
        <Link href="/" className="font-semibold hover:text-blue-500">Dashboard</Link>
        <Link href="/bookmarks" className="hover:text-blue-500">Bookmarks</Link>
        <Link href="/analytics" className="hover:text-blue-500">Analytics</Link>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-sm bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded"
        >
          {darkMode ? '☀ Light' : '🌙 Dark'}
        </button>

        {session?.user && (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {session.user.name?.split(' ')[0] || 'User'}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-700 rounded shadow-md z-10">
                <button
                  onClick={() => signOut({ callbackUrl: '/auth/login' })} // ✅ Added redirect
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
