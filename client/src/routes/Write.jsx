import React from 'react'
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css";
import { useUser } from '@clerk/clerk-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Write() {
  const navigate=useNavigate()
  const {isLoaded,isSignedIn}=useUser();
  const [value,setValue]=useState('');
  const {getToken}=useAuth();
  const mutation = useMutation({
    mutationFn:async (newPost) => {
      const token=await getToken(); 
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });
    },
    onSuccess:(res)=>{
      toast.success("post has been created")
navigate(`/${res.data.slug}`)
    }
  })
  if(!isLoaded){
    return <div className=''>Loading...</div>
  }
  if(isLoaded && !isSignedIn ){
    return <div className=''>You should Login</div>
  }
  
const handleSubmit=(e)=>{
e.preventDefault();
const formData=new FormData(e.target)

const data={
  title:formData.get("title"),
  category:formData.get("category"),
  desc:formData.get("desc"),
  content:value,
}
console.log(data)
mutation.mutate(data)
}
  return (
    <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1 className='text-cl font-light'>Create a New Post</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-6'>
        <button className='w-max p-2 shadow-md rounded-xl text-gray-500 bg-white'>Add a cover Image</button>
        <input className='text-4xl font-semibold bg-transparent outline-none' type="text" placeholder="My Awesome Story" name="title"/>
        <div className="flex items-center gap-4">
          <label htmlFor='' className='p-2 rounded-xl bg-white shadow-md'>Choose a category:</label>
          <select name='category' id=''>
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
<textarea name='desc' className='p-2 rounded-xl bg-white shadow-md' placeholder='A Short Description'/>
<ReactQuill value={value} onChange={setValue} theme='snow' className='flex-1 rounded-xl bg-white shadow-md'/>
<button disable={mutation.isPending} className='bg-blue-800 text-white font-medium rounded-xl m-4 p-2 w-36  disabled:bg-blue-400 disabled:cursor-not-allowed'>{mutation.isPending?"Loading...":"Send"}</button>
{mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  )
}

export default Write