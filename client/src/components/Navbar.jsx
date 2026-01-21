import { useState } from "react"
import {IKImage} from 'imagekitio-react'
import {Link} from 'react-router-dom'
import Image from "./image"
import {SignedIn,SignedOut,SignInButton,UserButton} from '@clerk/clerk-react'
const Navbar=()=>{
    const [open,setOpen]=useState(false)
    return(
        <div  className="w-full h-16 md:h-20 flex items-center justify-between">
<Link to="/" className=" flex items-center gap-4 text-2xl font-bold">
    <Image src="/plaintype/logo.png" alt="velora logo" w={32 } h={32}/>
    <span>Velora</span>
</Link>
<div className="md:hidden">
    <div className=" cursor-pointer text-4xl" onClick={() => setOpen((prev)=>!prev)}>
        {open?"X":  "☰"}
    </div>

    <div className={`w-full h-screen  flex flex-col items-center justify-center font-medium gap-8 text-lg absolute top-16   transition-all ease-in-out ${open?"-right-0":"-right-(100%)"}`}>

 <Link to="/">Home</Link>
    <Link to="/posts?sort=popular">Most Popular</Link>
    <Link to="/">About</Link>
    
    <Link to="/">Trending</Link>
    <Link to="/">
    <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login</button>
    </Link>

    </div>
</div>

{/* desktop */}
<div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
  <Link to="/">Home</Link>
    <Link to="/posts?sort=popular">Most Popular</Link>
    <Link to="/">About</Link>
   
    <Link to="/">Trending</Link>
   

     <SignedOut>
        <Link to="/login">
    <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login</button>
    </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>


</div>





        </div>
    )
}
export default Navbar