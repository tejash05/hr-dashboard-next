// 'use client'

// import { signIn } from 'next-auth/react'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'
// import { FcGoogle } from 'react-icons/fc'

// export default function LoginPage() {
//   const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [name, setName] = useState('')
//   const [isLogin, setIsLogin] = useState(true)
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     if (!email || !password || (!isLogin && !name)) {
//       toast.error('Please fill all fields')
//       setLoading(false)
//       return
//     }

//     if (isLogin) {
//       const res = await signIn('credentials', {
//         redirect: false,
//         email,
//         password,
//       })

//       setLoading(false)

//       if (res?.ok) {
//         toast.success('Logged in successfully')
//         router.push('/dashboard')
//       } else {
//         toast.error(res?.error || 'Invalid credentials')
//       }
//     } else {
//       try {
//         const res = await fetch('/api/auth/register', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ name, email, password }),
//         })

//         const data = await res.json()
//         if (!res.ok) throw new Error(data.error || 'Signup failed')

//         toast.success('Registered successfully. You can now log in.')
//         setIsLogin(true)
//       } catch (err: any) {
//         toast.error(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }
//   }

//   const handleGoogleLogin = async () => {
//     const res = await signIn('google', { callbackUrl: '/dashboard' })
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
//       {/* ✅ Centered FLAM Title */}
//       <h1 className="text-3xl font-extrabold text-blue-600 dark:text-white mb-8">FLAM</h1>

//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
//           {isLogin ? 'Welcome Back' : 'Create an Account'}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <input
//               type="text"
//               placeholder="Name"
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
//           >
//             {loading ? 'Submitting...' : isLogin ? 'Sign In' : 'Register'}
//           </button>
//         </form>

//         <div className="my-4 text-center text-gray-500 dark:text-gray-400">OR</div>

//         <button
//           onClick={handleGoogleLogin}
//           className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//         >
//           <FcGoogle className="text-xl" />
//           Continue with Google
//         </button>

//         <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
//           {isLogin ? "Don’t have an account?" : "Already have an account?"}{' '}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-blue-600 hover:underline font-medium"
//           >
//             {isLogin ? 'Register' : 'Login'}
//           </button>
//         </p>
//       </div>
//     </div>
//   )
// }





'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!email || !password || (!isLogin && !name)) {
      toast.error('Please fill all fields')
      setLoading(false)
      return
    }

    if (isLogin) {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      setLoading(false)

      if (res?.ok) {
        toast.success('Logged in successfully')
        router.push('/dashboard')
      } else {
        toast.error(res?.error || 'Invalid credentials')
      }
    } else {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Signup failed')

        toast.success('Registered successfully. You can now log in.')
        setIsLogin(true)
      } catch (err: any) {
        toast.error(err.message)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-purple-600 to-indigo-700">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-white font-bold text-lg tracking-wide">FLAM</h1>
        <h2 className="text-white opacity-75 font-semibold text-md tracking-wider hidden sm:block">
          FLAM HR Dashboard
        </h2>
        <div className="w-12" /> {/* spacing placeholder */}
      </div>

      {/* Main Auth Container */}
      <div className="flex justify-center">
        <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-xl shadow-xl flex overflow-hidden">
          {/* Left Side */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-700 to-indigo-700 items-center justify-center p-10">
            <div className="text-white space-y-4">
              <h1 className="text-4xl font-bold">Welcome back!</h1>
              <p className="text-lg text-gray-200">
                Sign in to access your dashboard and manage performance.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 p-8 sm:p-10">
            <h1 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-6">
              {isLogin ? 'Sign In to FLAM' : 'Register on FLAM'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}

              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition font-medium"
              >
                {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Register'}
              </button>
            </form>

            <div className="my-4 text-center text-gray-500 dark:text-gray-400">or</div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
              {isLogin ? 'New to FLAM?' : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 hover:underline font-medium"
              >
                {isLogin ? 'Create an Account' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="text-center text-white text-sm mt-6 mb-4 opacity-70">
        Empowering people, empowering performance. 🚀
      </div>
    </div>
  )
}
