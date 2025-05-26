import { useMemo, useState } from 'react'

export default function useSearch(users: any[]) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepts, setSelectedDepts] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDept =
        selectedDepts.length === 0 || selectedDepts.includes(user.department)

      const matchesRating =
        selectedRatings.length === 0 || selectedRatings.includes(user.rating)

      return matchesSearch && matchesDept && matchesRating
    })
  }, [users, searchTerm, selectedDepts, selectedRatings])

  return {
    searchTerm,
    setSearchTerm,
    selectedDepts,
    setSelectedDepts,
    selectedRatings,
    setSelectedRatings,
    filteredUsers,
  }
}
