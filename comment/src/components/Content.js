/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useComments } from "../context"
import { useComment } from "../context/comment"
import { useReply } from "../context/reply"
import EditReply from "./EditReply"
import { colors } from "../utils/style"

function Content({ dataSource, editable, setEditable, onEdit }) {
  const handleSubmitEdit = (content) => {
    onEdit(content)
    setEditable(false)
  }

  const renderContent = () => {
    return (
      <div
        css={css`
          color: ${colors.GrayishBlue};
          font-size: 16px;
          line-height: 1.6;
        `}
      >
        {dataSource.replyingTo && (
          <span
            css={css`
              margin-right: 6px;
              font-weight: 500;
              color: ${colors.Moderateblue};
            `}
          >
            @{dataSource.replyingTo}
          </span>
        )}
        {dataSource.content}
      </div>
    )
  }

  return (
    <div>
      <div>
        {editable ? (
          <EditReply
            text="Submit"
            onSubmit={handleSubmitEdit}
            initContent={dataSource.content}
          />
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
