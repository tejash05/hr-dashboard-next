import { NextResponse } from 'next/server'
import { getUsers, addUser } from '@/lib/userStore'

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const users = getUsers()
  const exists = users.find((u: { email: string }) => u.email === email)
  if (exists) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 })
  }

  addUser({ name, email, password })
  console.log('Registered Users:', getUsers())

  return NextResponse.json({ id: email, name, email }, { status: 201 })
}
