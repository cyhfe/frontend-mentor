import { useComments, useUser } from "../context"
import EditReply from "./EditReply"

function AddComment() {
  const { addComment } = useComments()
  const { user } = useUser()
  const handleSubmit = (content) => {
    addComment(content, user)
  }
  return (
    <EditReply onSubmit={handleSubmit} text="submit" image={user.image.png} />
  )
}

export default AddComment
