import React, { useMemo } from 'react'
import PostExcerpt from './PostExcerpt'
import { useGetPostsQuery } from '../api/apiSlice'
import { Spinner } from '../../components/Spinner'

export const PostsList = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery(null)

  // useMemo prevents sorting on every rerender
  const sortedPosts = useMemo(() => {
    const sortedPosts = posts?.slice() || []
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])

  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    // content = <div>{JSON.stringify(data)}</div>
    content = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
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
