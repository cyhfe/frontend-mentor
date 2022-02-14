/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { CommentAvatar, ReplyAvatar } from "./Avatar"
import { CommentScore, ReplyScore } from "./Score"
import { CommentContent, ReplyContent } from "./Content"
import { useState } from "react"
import { useComment } from "../context/comment"
import Reply from "./Reply"
import ControlButton from "./ControlButton"
import { useReply } from "../context/reply"
function StyledCard({ dataSource, type }) {
  const [editable, setEditable] = useState(false)

  const renderScore = (type) => {
    return type === "comment" ? <CommentScore /> : <ReplyScore />
  }

  const renderContent = (type) => {
    return type === "comment" ? (
      <CommentContent editable={editable} setEditable={setEditable} />
    ) : (
      <ReplyContent editable={editable} setEditable={setEditable} />
    )
  }

  const renderAvatar = () => {
    return type === "comment" ? <CommentAvatar /> : <ReplyAvatar />
  }

  return (
    <div
      css={css`
        display: flex;
        border: 1px solid red;
      `}
    >
      {renderScore(type)}
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
          {renderAvatar(type)}
          {/* <ControlButton
            type={type}
            editable={editable}
            setEditable={setEditable}
          /> */}
        </div>
        {renderContent(type)}
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
