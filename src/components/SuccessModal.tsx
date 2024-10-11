import React from 'react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
  return isOpen ? (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded shadow-lg'>
        <h2 className='text-lg font-bold mb-4'>Registration Successful</h2>
        <p>{message}</p>
        <div className='flex justify-end mt-4'>
          <button onClick={onClose} className='bg-blue-500 text-white py-2 px-4 rounded'>
            OK
          </button>
        </div>
      </div>
    </div>
  ) : null
}

export default SuccessModal
