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

import {IKContext,IKUpload} from "imagekitio-react"
const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};


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
const onError=(err)=>{
  console.log(err);
  toast.error("Image upload failed!");
};
const onSuccess=(res)=>{
  console.log(res)
 }

  return (
    <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1 className='text-cl font-light'>Create a New Post</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-6'>
   <IKContext
      publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
   
      />
   
    </IKContext>      
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
    <div className="flex flex-1 ">
          <div className="flex flex-col gap-2 mr-2">
            <div>
🌆
            </div>
            <div>
 ▶️
            </div>
        
          </div>
<ReactQuill value={value} onChange={setValue} theme='snow' className='flex-1 rounded-xl bg-white shadow-md'/>
</div>
<button disabled={mutation.isPending} className='bg-blue-800 text-white font-medium rounded-xl m-4 p-2 w-36  disabled:bg-blue-400 disabled:cursor-not-allowed'>{mutation.isPending?"Loading...":"Send"}</button>
{mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  )
}

export default Write