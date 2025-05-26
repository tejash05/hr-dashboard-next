import { NextResponse } from 'next/server'
import { getUsers } from '@/lib/userStore'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const users = getUsers()

  console.log('Login Attempt:', email, password)
  console.log('Stored Users:', users)

const user = users.find((u: { email: string; password: string }) => 
  u.email === email && u.password === password
)
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  return NextResponse.json({
    id: user.email,
    name: user.name,
    email: user.email,
  }, { status: 200 })
}
