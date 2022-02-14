/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useComments } from "../context"
import { CommentProvider } from "../context/comment"
import { ReplyProvider } from "../context/reply"
import StyledCard from "./StyledCard"

function Reply({ comment, reply }) {
  const { removeReply, editReply } = useComments()

  const handleRemove = () => {
    removeReply(comment.id, reply.id)
  }

  const handleEditReply = (content) => {
    editReply(comment.id, reply.id, content)
  }

  return (
    <div
      css={css`
        margin-left: 2rem;
      `}
    >
      <CommentProvider comment={comment}>
        <ReplyProvider reply={reply}>
          <StyledCard type="reply" />
        </ReplyProvider>
      </CommentProvider>
    </div>
  )
}

export default Reply
