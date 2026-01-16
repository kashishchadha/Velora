import React from 'react'
import Image from '../components/image'
import { Link, useParams } from 'react-router-dom'
import Comments from '../components/Comments'
import PostMenueActions from '../components/PostMenueActions'
import { useQuery } from '@tanstack/react-query'
import axios from  'axios'
import { format } from 'timeago.js'

const fetchPost= async (slug)=>{
  const res=await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
}
function SinglePostPage() {
    const {slug}=useParams();
const {isPending,error,data}=useQuery({

  queryKey:["post",slug],
  queryFn:()=>fetchPost(slug),
})

if(isPending) return "Loading"
if(error) return "somthing went wrong"+error.message
if(!data) return "post not found"


  return (
    <div className='flex flex-col gap-8'>
<div className="flex gap-8">
  <div className="lg:w-3/5 flex flex-col gap-8">
  <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>{data.title} </h1>
  <div className="flex items-center gap-2 text-gray-400 text-sm">
    <span>Written by</span>
    <Link className='text-blue-800'>{data.user.username}</Link>
    <span>on</span>
    <Link className='text-blue-800'>{data.category}</Link>
    <span>{format(data.createdAt)}</span>

  </div>
  <p className='text-gray-500 font-medium'>{data.desc}</p>
</div>
  {data.img &&
  <div className="hidden lg:block w-2/5">
  <Image src={data.img}/>
  </div>}
</div>


<div className="flex flex-col md:flex-row gap-8">
  <div className="lg:text-lg flex flex-col gap-6 text-justify">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsa eligendi nobis odio eum autem? Nihil modi ipsa, repudiandae veniam, mollitia excepturi cupiditate tempore obcaecati, optio officiis molestias suscipit fugiat?
    Aliquid, eos temporibus eum commodi corporis doloremque architecto, qui maxime labore sint accusantium fugit. Quam, delectus officia molestias officiis dolor praesentium consequatur? Dolor animi nesciunt harum libero consequuntur sint non?</p>


    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsa eligendi nobis odio eum autem? Nihil modi ipsa, repudiandae veniam, mollitia excepturi cupiditate tempore obcaecati, optio officiis molestias suscipit fugiat?
    Aliquid, eos temporibus eum commodi corporis doloremque architecto, qui maxime labore sint accusantium fugit. Quam, delectus officia molestias officiis dolor praesentium consequatur? Dolor animi nesciunt harum libero consequuntur sint non?</p>


        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsa eligendi nobis odio eum autem? Nihil modi ipsa, repudiandae veniam, mollitia excepturi cupiditate tempore obcaecati, optio officiis molestias suscipit fugiat?
    Aliquid, eos temporibus eum commodi corporis doloremque architecto, qui maxime labore sint accusantium fugit. Quam, delectus officia molestias officiis dolor praesentium consequatur? Dolor animi nesciunt harum libero consequuntur sint non?</p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. jbdlbdlkb Voluptates ipsa eligendi nobis odio eum autem? Nihil modi ipsa, repudiandae veniam, mollitia excepturi cupiditate tempore obcaecati, optio officiis molestias suscipit fugiat?
    Aliquid, eos temporibus eum commodi corporis doloremque architecto, qui maxime labore sint accusantium fugit. Quam, delectus officia molestias officiis dolor praesentium consequatur? Dolor animi nesciunt harum libero consequuntur sint non?</p>

 
  </div>
  <div className="px-4 h-max sticky top-8">
    <h1 className=' mb-4 text-sm font-medium ' >Author</h1>
    <div className=" flex flex-col gap-4">
    <div className=" flex items-center gap-8 ">
      {data.user.img && 
      <Image src={data.user.img} className='w-12 h-12 rounded-full object-cover' w='48' h='48'/>}
      <Link className='text-blue-800'>{data.user.username}</Link>
        </div>
      <p className='text-sm text-gray-500 '>Lorem ipsum dolor sit ametitgn vnninl</p>
      <div className="flex gap-2">
        <Link>
        <Image src='plaintype/facebook.svg'/>
        </Link>
        <Link>
        <Image src='plaintype/facebook.svg'/>
        </Link>
         <Link>
        <Image src='plaintype/instagram.svg'/>
        </Link>
    
    </div>
    </div>
    <PostMenueActions/>
    <h1 className='mt-8 mb-4 text-sm font-medium '  >Categories</h1>
    <div className="flex flex-col gap-2  text-sm">
<Link className='underline'>All</Link>
<Link className='underline' to='/'>Web Design</Link>
<Link className='underline' to='/'>Development</Link>
<Link className='underline' to='/'>Databases</Link>
<Link className='underline' to='/'>Search Engines</Link>
<Link className='underline' to='/'>Marketing</Link>
    </div>
    <h1 className='mt-8 mb-4 text-sm font-medium '>Search</h1>
    <search/>
  </div>
</div>

<Comments postId={data._id}/>
</div>
  )
}

export default SinglePostPage