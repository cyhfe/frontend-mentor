import { useComment } from "../context/comment"
import { useComments } from "../context"
import { useUser } from "../context"
import EditReply from "./EditReply"

function AddReply() {
  const {
    comment: { id },
  } = useComment()
  const { addReply } = useComments()
  const { user } = useUser()
  const handleSubmit = (content) => {
    addReply(id, content, user)
  }
  return (
    <EditReply onSubmit={handleSubmit} text="submit" image={user.image.png} />
  )
}

export default AddReply
