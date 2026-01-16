import React from 'react'
import Comment from './Comment'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchComment= async (postId)=>{
  const res=await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`);
  return res.data;
}
function Comments() {
  const {isPending,error,data}=useQuery({

  queryKey:["comments",postId],
  queryFn:()=>fetchComment(postId),
})

if(isPending) return "Loading"
if(error) return "something went wrong"+error.message
if(!data) return "comment not found"

  return (
    <div className='flex flex-col gap-8 lg:w-3/5'>
<h1 className='text-xl text-gray-500 underline'>Comments</h1>
<div className='flex items-center justify-between gap-8 w-full'>
    <textarea placeholder="Write a comment.." className="w-full p-4 bg-white rounded-xl"/>
    <button className='bg-blue-800 px-4 py-3 text-white font-medium rounded-xl'>Send</button>
</div>

{data.map((Comment)=>(
<Comment key={Comment._id} Comment={Comment}/>
))}

<Comment/>
<Comment/>
<Comment/>
<Comment/>
<Comment/>
<Comment/>
    </div>
  )
}

export default Comments