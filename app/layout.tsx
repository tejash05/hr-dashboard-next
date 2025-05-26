import './globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'
import type { Metadata } from 'next'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'HR Dashboard',
  description: 'Manage employees effectively',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Providers>
          <Navbar />
          <main className="p-4">{children}</main>
          <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  )
}
