import { useComments, useUser } from "../context"
import CommentCard from "./CommentCard"
import { CommentProvider, useComment } from "../context/comment"
import Score from "./Score"
function Comment({ comment, vote }) {
  const { editComment, removeComment } = useComments()
  const { user } = useUser()
  const { voteUp, voteDown } = useComment()

  const handleUp = () => {
    vote(comment.id, "up")
  }
  const handleDown = () => {
    vote(comment.id, "down")
  }

  const handleRemove = () => {
    removeComment(comment.id)
  }

  const handleEditComment = (content) => {
    editComment(comment.id, content)
  }

  return (
    <div>
      <CommentProvider comment={comment}>
        <CommentCard
          comment={comment}
          user={user}
          editComment={handleEditComment}
          handleDown={handleDown}
          handleUp={handleUp}
          onRemove={handleRemove}
        >
          <Score type="comment" />
        </CommentCard>
      </CommentProvider>
    </div>
  )
}

export default Comment
