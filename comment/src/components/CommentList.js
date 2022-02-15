/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useComments } from "../context"
import Comment from "./Comment"
import AddComment from "./AddComment"

function CommentList() {
  const { comments } = useComments()
  return (
    <div
      css={css`
        padding: 1rem;
      `}
    >
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
      <AddComment />
    </div>
  )
}

export default CommentList
