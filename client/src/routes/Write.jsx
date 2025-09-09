import React from 'react'
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css";
import { useUser } from '@clerk/clerk-react';
function Write() {
  const {isLoaded,isSignedIn}=useUser();
  if(!isLoaded){
    return <div className=''>Loading...</div>
  }
  if(isLoaded && !isSignedIn ){
    return <div className=''>You should Login</div>
  }

  return (
    <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1 className='text-cl font-light'>Create a New Post</h1>
      <form className='flex flex-col gap-6 flex-1 mb-6'>
        <button className='w-max p-2 shadow-md rounded-xl text-gray-500 bg-white'>Add a cover Image</button>
        <input className='text-4xl font-semibold bg-transparent outline-none' type="text" placeholder="My Awesome Story"/>
        <div className="flex items-center gap-4">
          <label htmlFor='' className='p-2 rounded-xl bg-white shadow-md'>Choose a category:</label>
          <select name='cat' id=''>
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
<textarea name='desc' className='p-2 rounded-xl bg-white shadow-md' placeholder='A Short Description'/>
<ReactQuill theme='snow' className='flex-1 rounded-xl bg-white shadow-md'/>
<button className='bg-blue-800 text-white font-medium rounded-xl m-4 p-2 w-36'>Send</button>

      </form>
    </div>
  )
}

export default Write