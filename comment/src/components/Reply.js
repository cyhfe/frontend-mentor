/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useComments } from "../context"
import { CommentProvider } from "../context/comment"
import CommentCard from "./CommentCard"
import Score from "./Score"
import { ReplyProvider } from "../context/reply"
function Reply({ comment, reply, user }) {
  const { replyVote, removeReply, editReply } = useComments()
  const handleVote = (commentId, replyId, action) => {
    replyVote(commentId, replyId, action)
  }

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
          <CommentCard
            comment={reply}
            user={user}
            handleDown={() => handleVote(comment.id, reply.id, "DOWN")}
            handleUp={() => handleVote(comment.id, reply.id, "UP")}
            onRemove={handleRemove}
            editComment={handleEditReply}
          >
            <Score type="reply" replyId={reply.id} />
          </CommentCard>
        </ReplyProvider>
      </CommentProvider>
    </div>
  )
}

export default Reply
