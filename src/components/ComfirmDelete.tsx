import React from 'react'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const ComfirmDelete: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return isOpen ? (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded shadow-lg'>
        <h2 className='text-lg font-bold mb-4'>Delete User?</h2>
        <p>Are you sure want to delete this user?</p>
        <div className='flex justify-end mt-4'>
          <button onClick={onClose} className='bg-blue-600 text-white py-2 px-4 rounded mr-2'>
            Cancle
          </button>
          <button onClick={onConfirm} className='bg-blue-600 text-white py-2 px-4 rounded'>
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : null
}

export default ComfirmDelete
