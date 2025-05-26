import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'users.json')

// Read users from file
export function getUsers() {
  if (!fs.existsSync(filePath)) return []
  const data = fs.readFileSync(filePath, 'utf-8')
  return data ? JSON.parse(data) : []
}

// Write new user to file
export function addUser(user: { name: string; email: string; password: string }) {
  const users = getUsers()
  users.push(user)
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}
