/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Avatar from "./Avatar"
import { CommentScore, ReplyScore } from "./Score"
import Content from "./Content"
import { useState } from "react"
import { useComment } from "../context/comment"
import Reply from "./Reply"
import ControlButton from "./ControlButton"
import { useReply } from "../context/reply"
function StyledCard({ dataSource, type }) {
  const [editable, setEditable] = useState(false)

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
          {/* <ControlButton
            type={type}
            editable={editable}
            setEditable={setEditable}
          /> */}
        </div>
        {/* <Content type={type} editable={editable} setEditable={setEditable} /> */}
        {type === "comment" &&
          dataSource.replies &&
          dataSource.replies.length > 0 &&
          dataSource.replies.map((reply) => (
            <Reply comment={dataSource} reply={reply} key={reply.id} />
          ))}
      </div>
    </div>
  )
}

function StyledCommentCard() {
  const { comment } = useComment()

  return <StyledCard dataSource={comment} type="comment" />
}

function StyledReplyCard() {
  const { reply } = useReply()

  return <StyledCard dataSource={reply} type="reply" />
}

export { StyledCommentCard, StyledReplyCard }
