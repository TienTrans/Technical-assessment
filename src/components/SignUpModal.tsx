import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import SuccessModal from './SuccessModal'

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
  onSignUp: (user: { email: string; firstName: string; lastName: string; password: string }) => void
}

interface FormData {
  email: string
  firstName: string
  lastName: string
  password: string
  retypePassword: string
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSignUp }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>()

  const password = watch('password')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const onSubmit = (data: FormData) => {
    onSignUp(data)
    setSuccessMessage(`The user with email ${data.email} was added successfully!`)
    setIsSuccessModalOpen(true)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <h2 className='text-lg font-bold mb-4 text-start'>SIGN UP FORM</h2>
            <p className='text-lg font-bold mb-4 text-start'>Fill in the form below to sign up a new user</p>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className='w-[500px]'>
              <div className='mb-2'>
                <input
                  placeholder='Email'
                  type='email'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email format'
                    }
                  })}
                  className={`border-b p-2 w-full focus:outline-none ${errors.email ? 'border-red-500' : ''}`} // Chỉ viền dưới
                />
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
              </div>
              <div className='mb-2'>
                <input
                  placeholder='First Name'
                  type='text'
                  {...register('firstName', { required: 'First name is required' })}
                  className={`border-b p-2 w-full focus:outline-none ${errors.firstName ? 'border-red-500' : ''}`}
                />
                {errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
              </div>
              <div className='mb-2'>
                <input
                  placeholder='Last Name'
                  type='text'
                  {...register('lastName', { required: 'Last name is required' })}
                  className={`border-b p-2 w-full focus:outline-none ${errors.lastName ? 'border-red-500' : ''}`}
                />
                {errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}
              </div>
              <div className='mb-2'>
                <input
                  placeholder='Password'
                  type='password'
                  {...register('password', { required: 'Password is required' })}
                  className={`border-b p-2 w-full focus:outline-none ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
              </div>
              <div className='mb-4'>
                <input
                  placeholder='Retype Password'
                  type='password'
                  {...register('retypePassword', {
                    required: 'Please retype your password',
                    validate: (value) => value === password || 'Passwords do not match'
                  })}
                  className={`border-b p-2 w-full focus:outline-none ${errors.retypePassword ? 'border-red-500' : ''}`}
                />
                {errors.retypePassword && <p className='text-red-500'>{errors.retypePassword.message}</p>}
              </div>
              <div className='flex justify-end'>
                <button type='button' onClick={onClose} className=' text-blue-600 py-2 px-4 rounded mr-2'>
                  CANCEL
                </button>
                <button type='submit' className=' text-blue-600 py-2 px-4 rounded'>
                  SIGN UP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} message={successMessage} />
    </>
  )
}

export default SignUpModal
