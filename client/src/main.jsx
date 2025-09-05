import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter , Route,Link ,RouterProvider} from 'react-router-dom';
import HomePage from './routes/HomePage.jsx';
import PostListPage from './routes/PostListPage.jsx';
import Write from './routes/Write.jsx';
import LoginPage from './routes/LoginPage.jsx';
import RegisterPage from './routes/RegisterPage.jsx';
import SinglePostPage from './routes/SinglePostPage.jsx';
const router=createBrowserRouter([
  {
    path:"/",
    element:(
<HomePage/>
    )
  },
  {

     path:"/posts",
    element:(
<PostListPage/>
    )

  },

    {

     path:"/write",
    element:(
<Write/>
    )

  },
    {

     path:"/login",
    element:(
<LoginPage/>
    )

  },
    {

     path:"/register",
    element:(
<RegisterPage/>
    )

  },
    {

     path:"/:slug",
    element:(
<SinglePostPage/>
    )

  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/> 
  </StrictMode>,
)
