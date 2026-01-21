import React, { useState } from 'react'
import PostList from '../components/PostList'
import SideMenu from '../components/SideMenu'
import axios from 'axios'
import { useInfiniteQuery, useQuery} from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

function PostListPage() {
  const [searchParams] = useSearchParams();
  
  const fetchPosts = async(pageParam) => {
    const searchParamsObj = Object.fromEntries([...searchParams]);
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      params: { page: pageParam, ...searchParamsObj },
    });
    return res.data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', searchParams.toString()],
    queryFn: ({pageParam=1}) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined,
  })

  console.log(data);
  
  const [open, setOpen] = useState(false);

  if (status === "loading") return 'Loading...'
  if (status === "error") return 'An error has occurred: ' + error.message

  return (
    <div className=''>
      <h1 className='mb-8 text-2xl '>Development Blog</h1>
      <button onClick={() => setOpen((prev) => !prev)} className='bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden'>
        {open ? "Close" : "Filter or Search"}
      </button>

      <div className='flex flex-col-reverse gap-8 md:flex-row'>
        <div className="c">
          <PostList posts={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  )
}

export default PostListPage