import React, { useState } from 'react'
import PostList from '../components/PostList'
import SideMenu from '../components/SideMenu';
import axios from 'axios'
import { useQuery} from '@tanstack/react-query'
const fetchPost=async()=>{
const res= await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
return res.data;
};
function PostListPage() {

   const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>fetchPost(),
   
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message


  
  const [open,setOpen]=useState(false);
  return (
    <div className=''>
      <h1 className='mb-8 text-2xl '>Development Blog</h1>
      <button onClick={()=>setOpen((prev)=>!prev)} className='bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden'>
        {open?"Close":"Filter or Search"}
      </button>

      <div className='flex flex-col-reverse gap-8 md:flex-row'>
        <div className="c">
          <PostList/>
        </div>
        <div className={`${open?"block":"hidden"} md:block`}>
        <SideMenu/>
          
        </div>
      </div>
    </div>
  )
}

export default PostListPage