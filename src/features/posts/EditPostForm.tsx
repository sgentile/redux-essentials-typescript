import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { Spinner } from '../../components/Spinner'
import { useGetPostQuery, useUpdatePostMutation } from '../api/apiSlice'

type TParams = { postId: string }
export const EditPostForm = ({ match }: RouteComponentProps<TParams>) => {
  const { postId } = match.params

  // const post = useSelector((state) => selectPostById(state, postId))
  const {
    data: post,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPostQuery(postId)
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()

  const [title, setTitle] = useState(post?.title ?? '')
  const [content, setContent] = useState(post?.content ?? '')

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
    }
  }, [post])

  const history = useHistory()

  const onTitleChanged: ChangeEventHandler<HTMLInputElement> = (e) =>
    setTitle(e.target.value)
  const onContentChanged: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setContent(e.target.value)

  const onSavePostClicked = async () => {
    debugger
    if (title && content) {
      // dispatch(postUpdated({ id: postId, title, content }))
      const updatedPost = { ...post, title, content }
      debugger
      await updatePost(updatedPost)
      history.push(`/posts/${postId}`)
    }
  }
  let output
  if (isError) {
    output = <div>{error}</div>
  } else if (isFetching || isUpdating) {
    output = <Spinner text="Loading..." />
  } else if (isSuccess) {
    output = (
      <>
        <h2>Edit Post</h2>
        <form>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            placeholder="What's on your mind?"
            value={title}
            onChange={onTitleChanged}
          />
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
        </form>
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </>
    )
  }
  return <section>{output}</section>
}
