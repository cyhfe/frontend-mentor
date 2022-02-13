import { useComments, useUser } from "../context"

function Reply({ commentId }) {
  const { user } = useUser()
  const { addReply } = useComments()
  const handleReply = (e) => {
    e.preventDefault()
    addReply(commentId, content, user)
  }
  return (
    <div>
      <form onSubmit={handleReply}>
        <img src={user.image.png} />
        <textarea />
        <input type="submit" value="reply" />
      </form>
    </div>
  )
}

export default Reply
