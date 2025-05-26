const departments = ['Engineering', 'HR', 'Marketing', 'Sales', 'Design']

export function getRandomDepartment(): string {
  return departments[Math.floor(Math.random() * departments.length)]
}

export function getRandomRating(): number {
  return Math.floor(Math.random() * 5) + 1
}
