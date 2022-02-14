import { useComments } from "../context"
import { useComment } from "../context/comment"
import { useState } from "react"
import { useReply } from "../context/reply"

function Content({ dataSource, editable, setEditable, onEdit }) {
  const [content, setContent] = useState(dataSource.content)
  const handleSubmitEdit = (e) => {
    e.preventDefault()
    onEdit(content)
    setEditable(false)
  }

  const renderContent = () => {
    return (
      <div>
        @<span>{dataSource && dataSource.replyingTo}</span>
        {dataSource.content}
      </div>
    )
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
          renderContent()
        )}
      </div>
    </div>
  )
}

function CommentContent() {
  const { editComment } = useComments()
  const { comment, editable, setEditable } = useComment()
  const handleEditComment = (content) => {
    editComment(comment.id, content)
  }
  return (
    <Content
      dataSource={comment}
      editable={editable}
      setEditable={setEditable}
      onEdit={handleEditComment}
    />
  )
}
function ReplyContent() {
  const { editReply } = useComments()
  const { reply, editable, setEditable } = useReply()
  const { comment } = useComment()
  const handleEditReply = (content) => {
    editReply(comment.id, reply.id, content)
  }
  return (
    <Content
      dataSource={reply}
      editable={editable}
      setEditable={setEditable}
      onEdit={handleEditReply}
    />
  )
}

export { CommentContent, ReplyContent }
