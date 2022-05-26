import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useGetPostQuery } from '../api/apiSlice'
import { Spinner } from '../../components/Spinner'
import ReactionButtons from './ReactionButtons'

type TParams = { postId: string }
export const SinglePostPage = ({ match }: RouteComponentProps<TParams>) => {
  const { postId } = match.params
  const {
    data: post,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPostQuery(postId)

  let content
  if (isError) {
    content = <div>{error}</div>
  } else if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    )
  }

  return <section>{content}</section>
}
