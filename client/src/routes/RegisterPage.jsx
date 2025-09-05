import { SignUp } from '@clerk/clerk-react'
import React from 'react'

function RegisterPage() {
  return (
    <div className='flex items-center justify-center h-[calc(100vh-80px'>
      <SignUp signInUrl='/login'/>
    </div>
  )
}

export default RegisterPage 