/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Avatar from "./Avatar"
import { CommentScore, ReplyScore } from "./Score"
import Content from "./Content"
import { useState } from "react"
import { useComment } from "../context/comment"
import Reply from "./Reply"
import ControlButton from "./ControlButton"
function StyledCard({ type }) {
  const [editable, setEditable] = useState(false)
  const { comment } = useComment()

  return (
    <div
      css={css`
        display: flex;
        border: 1px solid red;
      `}
    >
      {type === "comment" ? <CommentScore /> : <ReplyScore />}
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <Avatar />
          <ControlButton
            type={type}
            editable={editable}
            setEditable={setEditable}
          />
        </div>
        <Content type={type} editable={editable} setEditable={setEditable} />
        {type === "comment" &&
          comment.replies &&
          comment.replies.length > 0 &&
          comment.replies.map((reply) => (
            <Reply comment={comment} reply={reply} key={reply.id} />
          ))}
      </div>
    </div>
  )
}

export default StyledCard
