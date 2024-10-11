import React, { useState } from 'react'
import SignUpModal from './SignUpModal'
import RightArrow from '../assets/right.png'
import ComfirmDelete from './ComfirmDelete'
import SuccessModal from './SuccessModal'
import exportFromJSON from 'export-from-json'
// Định nghĩa kiểu cho User
interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}

// Dữ liệu mẫu cho ví dụ
const initialUsers: User[] = [
  { id: 1, firstName: 'FN1', lastName: 'LN1', email: 'email1@example.com' },
  { id: 2, firstName: 'FN2', lastName: 'LN2', email: 'email2@example.com' },
  { id: 3, firstName: 'FN3', lastName: 'LN3', email: 'email3@example.com' },
  { id: 4, firstName: 'FN4', lastName: 'LN4', email: 'email4@example.com' },
  { id: 5, firstName: 'FN5', lastName: 'LN5', email: 'email5@example.com' },
  { id: 6, firstName: 'FN6', lastName: 'LN6', email: 'email6@example.com' },
  { id: 7, firstName: 'FN7', lastName: 'LN7', email: 'email7@example.com' }
  // Thêm nhiều người dùng khác nếu cần
]

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [page, setPage] = useState<number>(1)
  const itemsPerPage = 5
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false)
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)
  const [deletedUserEmail, setDeletedUserEmail] = useState<string>('')

  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleDeleteUser = () => {
    if (userIdToDelete !== null) {
      const userToDelete = users.find((user) => user.id === userIdToDelete)
      if (userToDelete) {
        setDeletedUserEmail(userToDelete.email)
        setUsers(users.filter((user) => user.id !== userIdToDelete))
        setIsSuccessModalOpen(true)
      }
      setUserIdToDelete(null)
    }
    setIsConfirmModalOpen(false)
  }

  const handleSignUp = (newUser: { email: string; firstName: string; lastName: string; password: string }) => {
    const newUserEntry = {
      id: users.length + 1,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    }
    setUsers([...users, newUserEntry])
  }

  const handleExport = () => {
    if (selectedUsers.length === 0) {
      alert('No users selected for export.')
      return
    }

    const usersToExport = users.filter((user) => selectedUsers.includes(user.id))

    const dataToExport = usersToExport.map((user, index) => ({
      id: `${index + 1}`,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName
    }))

    const fileName = 'user_data'
    const exportType = 'csv'

    exportFromJSON({
      data: dataToExport,
      fileName,
      exportType
    })
  }

  const totalPages = Math.ceil(users.length / itemsPerPage)
  const paginatedUsers = users.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-end mb-4 gap-2'>
        <button onClick={() => setIsModalOpen(true)} className='bg-blue-500 text-white py-2 px-4 rounded'>
          SIGN UP
        </button>

        <button onClick={handleExport} className='bg-blue-500 text-white py-2 px-4 rounded'>
          EXPORT
        </button>
      </div>
      <table className='min-w-full bg-white border border-gray-300'>
        <thead>
          <tr>
            <th className='border-b py-2 text-center '>
              <input
                type='checkbox'
                onChange={(e) => setSelectedUsers(e.target.checked ? users.map((user) => user.id) : [])}
              />
            </th>
            <th className='border-b py-2 text-center'>First name</th>
            <th className='border-b py-2 text-center'>Last name</th>
            <th className='border-b py-2 text-center'>Email</th>
            <th className='border-b py-2 text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <td className='border-b py-2'>
                <input
                  type='checkbox'
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                />
              </td>
              <td className='border-b py-2'>{user.firstName}</td>
              <td className='border-b py-2'>{user.lastName}</td>
              <td className='border-b py-2'>{user.email}</td>
              <td className='border-b py-2'>
                <button
                  onClick={() => {
                    setUserIdToDelete(user.id)
                    setIsConfirmModalOpen(true)
                  }}
                  className='text-blue-700'
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-end mt-4 gap-2'>
        <span>{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`bg-white ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <img src={RightArrow} alt='Previous' className='w-4 h-4 mr-2 transform rotate-180' />
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`bg-white ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <img src={RightArrow} alt='Next' className='w-4 h-4 mr-2' />
        </button>
      </div>
      <SignUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSignUp={handleSignUp} />
      <ComfirmDelete
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteUser}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={`The user with email ${deletedUserEmail} was deleted successfully!`} // Thông điệp thành công
      />
    </div>
  )
}

export default UserTable
