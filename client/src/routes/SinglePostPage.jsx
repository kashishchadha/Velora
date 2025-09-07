import React from 'react'
import Image from '../components/image'
import { Link } from 'react-router-dom'
function SinglePostPage() {
  return (
    <div className='flex flex-col gap-8'>
<div className="flex gap-8">
  <div className="lg:w-3/5 flex flex-col gap-8">
  <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>Lorem ipsum dolor sit amet consectetur adipis icing elit. Doloremque illo praesentium reiciendis deleniti quaerat aut </h1>
  <div className="flex items-center gap-2 text-gray-400 text-sm">
    <span>Written by</span>
    <Link className='text-blue-800'>John Doe</Link>
    <span>on</span>
    <Link className='text-blue-800'>Web Design</Link>
    <span>2 days ago</span>

  </div>
  <p className='text-gray-500 font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem totam aperiam, architecto voluptatem adipisci error nemo doloremque mollitia voluptatum ab, excepturi enim magni placeat, temporibus quia quos? Illum, nihil ratione.</p>
</div>
  
  <div className="hidden lg:block w-2/5">
  <Image src="plaintype/postImg.jpeg"/>
  </div>
</div>


<div className="flex flex-col md:flex-row gap-8">
  <div className="lg:text-lg flex flex-col gap-6 text-justify">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsa eligendi nobis odio eum autem? Nihil modi ipsa, repudiandae veniam, mollitia excepturi cupiditate tempore obcaecati, optio officiis molestias suscipit fugiat?
    Aliquid, eos temporibus eum commodi corporis doloremque architecto, qui maxime labore sint accusantium fugit. Quam, delectus officia molestias officiis dolor praesentium consequatur? Dolor animi nesciunt harum libero consequuntur sint non?</p>


        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsa eligendi nobis odio eum autem? Nihil modi ipsa, repudiandae veniam, mollitia excepturi cupiditate tempore obcaecati, optio officiis molestias suscipit fugiat?
    Aliquid, eos temporibus eum commodi corporis doloremque architecto, qui maxime labore sint accusantium fugit. Quam, delectus officia molestias officiis dolor praesentium consequatur? Dolor animi nesciunt harum libero consequuntur sint non?</p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsa eligendi nobis odio eum autem? Nihil modi ipsa, repudiandae veniam, mollitia excepturi cupiditate tempore obcaecati, optio officiis molestias suscipit fugiat?
    Aliquid, eos temporibus eum commodi corporis doloremque architecto, qui maxime labore sint accusantium fugit. Quam, delectus officia molestias officiis dolor praesentium consequatur? Dolor animi nesciunt harum libero consequuntur sint non?</p>

 
  </div>
  <div className="px-4 h-max sticky top-8">
    <h1>Author</h1>
    <div className="t">
      <Image src='plaintype/userImg.jpeg' className='w-12 h-12 rounded-full object-cover' w='48' h='48'/>
      <Link>John Doe</Link>
      <p>Lorem ipsum dolor sit ametitgn vnninl</p>
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
  </div>
</div>


</div>
  )
}

export default SinglePostPage