import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
function MainCategories() {
  return (
    <div className='hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8'>
        <div className='flex-1 flex items-center justify-between flex-wrap'>
            <Link to='/posts' className='bg-blue-800 text-white rounded-full px-3 py-1'>All Posts</Link>

                        <Link to='/posts?cat=web-design' className=' hover:bg-blue-50  rounded-full px-3 py-1'>Web Design</Link>

                          <Link to='/posts?cat=development' className=' hover:bg-blue-50  rounded-full px-3 py-1'>Development</Link>

                            <Link to='/posts?cat=databases' className=' hover:bg-blue-50  rounded-full px-3 py-1'>Databases</Link>
                              <Link to='/posts?cat=seo' className=' hover:bg-blue-50  rounded-full px-3 py-1'>Search Engines</Link>
                                <Link to='/posts?cat=marketing' className=' hover:bg-blue-50  rounded-full px-3 py-1'>Marketing</Link>

        </div>
<span className='text-xl font-medium'>|</span>

       <Search/>

    </div>
  )
}

export default MainCategories