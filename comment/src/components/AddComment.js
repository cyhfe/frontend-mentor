/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useComments, useUser } from "../context"
import EditReply from "./EditReply"

function AddComment() {
  const { addComment } = useComments()
  const { user } = useUser()
  const handleSubmit = (content) => {
    addComment(content, user)
  }
  return (
    <div
      css={css`
        padding: 1rem;
        background-color: #fff;
        border-radius: 12px;
      `}
    >
      <EditReply onSubmit={handleSubmit} text="Send" image={user.image.png} />
    </div>
  )
}

export default AddComment
