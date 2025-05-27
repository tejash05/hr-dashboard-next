// app/layout.tsx
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Providers from './providers'

export const metadata = {
  title: 'HR Dashboard',
  description: 'Manage employees effectively',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full m-0 p-0 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  )
}
