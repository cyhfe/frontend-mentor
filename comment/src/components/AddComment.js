import { useComments, useUser } from "../context"
import { useState } from "react"

function AddComment() {
  const [content, setContent] = useState("")
  const { addComment } = useComments()
  const { user } = useUser()
  const handleSubmitComment = (e) => {
    e.preventDefault()
    addComment(content, user)
    setContent("")
  }
  return (
    <div>
      <form onSubmit={handleSubmitComment}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  )
}

export default AddComment
