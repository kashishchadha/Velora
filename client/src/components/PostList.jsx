import React from 'react'
import PostListItem from './PostListItem'
import InfiniteScroll from 'react-infinite-scroll-component'

const PostList = ({posts, fetchNextPage, hasNextPage, isFetchingNextPage}) => {
  const allPosts = posts?.pages?.flatMap((page)=>page.posts) || []

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      endMessage={
        <p>
          <b>All posts loaded!</b>
        </p>
      }
    >
      {allPosts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  )
}

export default PostList