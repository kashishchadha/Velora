import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className='mt-4 flex flex-col gap-4'>

      <div className='flex gap-4'>
        <Link to='/'>Home</Link>
        <span>*</span>
        <span className='text-blue-800'>Blogs and Articles</span>
      </div>
    </div>
  )
}

export default HomePage