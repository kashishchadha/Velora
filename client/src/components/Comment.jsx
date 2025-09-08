import React from 'react'
import Image from './image'
function Comment() {
  return (
    <div className='p-4 bg-slate-50 rounded-xl mb-8'>
        <div className="flex items-center gap-4">
            <Image src="plaintype/userImg.jpeg" className="w-10" w='40'/>
            <span className='font-medium'> John Doe</span>
            <span className='text-sm text-gray-500'>2 days ago</span>
        </div>
        <div className="mt-4">
<p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero dolorem, ea possimus rem veritatis at laudantium voluptate similique amet quis aspernatur 
</p>

        </div>
    </div>
  )
}

export default Comment