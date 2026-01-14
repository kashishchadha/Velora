import React from 'react'
import Image from './image'
import { Link } from 'react-router-dom'

function PostListItem() {
  return (
    <div className='flex flex-col xl:flex-row gap-8 mb-12' >
        <div className="md:hidden xl:block xl:w-1/3">
        <Image src='plaintype/postImg.jpeg' className='rounded-2xl object-cover' w="735"></Image>
        </div>

        <div className="flex flex-col gap-4">
            <Link to='/test' className='text-4xl font-semibold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe perspiciatis nam</Link>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Written by</span>
                <Link className='text-blue-800'>John Doe</Link>
                <span>On</span>
                <Link className='text-blue-800'>Web Design</Link>
                <span>2 Days ago</span>
            </div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et neque ex animi quisquam illo autem quos quidem eligendi optio. Aliquam unde facilis voluptatem suscipit maiores accusantium ipsum accusamus neque ab!</p>
            <Link to="/test" className='underline text-blue-800 text-sm'>Read More</Link>
        </div>

    </div>
  )
}

export default PostListItem