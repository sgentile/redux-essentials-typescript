import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchPosts, selectPostIds } from './postSlice'
import PostExcerpt from './PostExcerpt'
import { RootState, useAppDispatch } from '../../app/store'
import { useGetPostsQuery } from '../api/apiSlice'
import { Spinner } from '../../components/Spinner'
import { Post } from '../../app/types'

export const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery(null)

  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = <div>Count: {posts.length}</div>
    // content = posts.map((post) => (
    //   <PostExcerpt key={post.id} postId={post.id} />
    // ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
