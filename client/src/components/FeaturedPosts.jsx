import React from 'react'
import Image from './image'
import { Link } from 'react-router-dom'
function FeaturedPosts() {
  return (
    <div className='mt-8 flex flex-col lg:flex-row gap-8'>
<div className="w-full lg:w-1/2 flex flex-col gap-4">
<Image src="/plaintype/featured1.jpeg" className="rounded-3xl object-cover"/>

<div className="flex items-center gap-4">
    <h1 className='font-semibold lg:text-lg'>01</h1>
    <Link className='text-blue-800 lg:text-lg'>Web Design</Link>
    <span className='text-gray-500'>2 days ago</span>
</div>

<Link to='/test' className='text-xl lg;text-3xl font-semibold lg:font-bold'> Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Link>
</div>

<div className="w-full lg:w-1/2 flex flex-col gap-4">

<div className="h-1/3 flex justify-between gap-4">
<Image src='/plaintype/featured2.jpeg' className='rounded-3xl object-cover w-1/3 aspect-video'/>
<div className="w-2/3">
<div className="flex items-center gap-4 text-sm lg:text-base mb-4">
    <h1 className='font-semibold'>02.</h1>
    <Link className='text-blue-800'>Web Design</Link>
    <span className='text-gray-500 text-sm'>2 days ago</span>
</div>

<Link to='/test' className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
Lorem ipsum dolor sit amet consectetur adipisicing elit.
</Link>
</div>


</div>



<div className="h-1/3 flex justify-between gap=4"></div>


<div className="h-1/3 flex justify-between gap=4"></div>




</div>
    </div>
  )
}

export default FeaturedPosts