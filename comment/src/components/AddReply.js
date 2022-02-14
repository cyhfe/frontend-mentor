import { useComment } from "../context/comment"
import { useComments } from "../context"
import { useUser } from "../context"
import EditReply from "./EditReply"
import { useReply } from "../context/reply"

function AddReply({ onSubmit }) {
  const { user } = useUser()
  const handleSubmit = (content) => {
    onSubmit(content)
  }
  return (
    <EditReply onSubmit={handleSubmit} text="submit" image={user.image.png} />
  )
}

function CommentAddReply() {
  const { addReply } = useComments()
  const { comment } = useComment()
  const { user } = useUser()
  const handleSubmit = (content) => {
    addReply(comment.id, content, user)
  }
  return <AddReply onSubmit={handleSubmit} />
}

function ReplyAddReply() {
  const { addReply } = useComments()
  const { comment } = useComment()
  const { reply } = useReply()
  const { user } = useUser()
  const handleSubmit = (content) => {
    addReply(comment.id, content, user, reply.user.username)
  }
  return <AddReply onSubmit={handleSubmit} />
}

export { CommentAddReply, ReplyAddReply }
