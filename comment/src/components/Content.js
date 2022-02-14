import { useComments } from "../context"
import { useComment } from "../context/comment"
import { useState } from "react"
import { useReply } from "../context/reply"

function Content({ type, editable, setEditable }) {
  const { comment } = useComment()
  const { reply } = useReply()
  const { editComment } = useComments()

  const [content, setContent] = useState(comment.content)
  const handleSubmitEdit = (e) => {
    e.preventDefault()
    editComment(comment.id, content)
    setEditable(false)
  }

  return (
    <div>
      <div>
        {editable ? (
          <div>
            <form onSubmit={handleSubmitEdit}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <input type="submit" value="update" />
            </form>
          </div>
        ) : (
          comment?.content
        )}
      </div>
    </div>
  )
}

export default Content
