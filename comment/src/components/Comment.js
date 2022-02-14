import { useComments, useUser } from "../context"
import CommentCard from "./CommentCard"

function Comment({ comment, vote }) {
  const { addReply, editComment, removeComment } = useComments()
  const { user } = useUser()

  const handleUp = () => {
    vote(comment.id, "up")
  }
  const handleDown = () => {
    vote(comment.id, "down")
  }

  const onSubmit = (content) => {
    addReply(comment, content, user)
  }

  const handleRemove = () => {
    removeComment(comment.id)
  }

  const handleEditComment = (content) => {
    editComment(comment.id, content)
  }

  return (
    <div>
      <CommentCard
        comment={comment}
        user={user}
        editComment={handleEditComment}
        handleDown={handleDown}
        handleUp={handleUp}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default Comment
