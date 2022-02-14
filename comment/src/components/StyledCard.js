/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { CommentAvatar, ReplyAvatar } from "./Avatar"
import { CommentScore, ReplyScore } from "./Score"
import { CommentContent, ReplyContent } from "./Content"
import { CommentAddReply, ReplyAddReply } from "./AddReply"
import { useComment } from "../context/comment"
import Reply from "./Reply"
import AddReply from "./AddReply"
import ControlButton from "./ControlButton"
import { useReply } from "../context/reply"
import { useUser } from "../context"
function StyledCard({ dataSource, type, showReply, isSelf }) {
  const renderScore = (type) => {
    return type === "comment" ? <CommentScore /> : <ReplyScore />
  }

  const renderContent = (type) => {
    return type === "comment" ? <CommentContent /> : <ReplyContent />
  }

  const renderAvatar = (type) => {
    return type === "comment" ? <CommentAvatar /> : <ReplyAvatar />
  }

  const rederReply = (type) => {
    return (
      type === "comment" &&
      dataSource.replies &&
      dataSource.replies.length > 0 &&
      dataSource.replies.map((reply) => (
        <Reply comment={dataSource} reply={reply} key={reply.id} />
      ))
    )
  }

  const renderAddReply = (type) => {
    return type === "comment" ? <CommentAddReply /> : <ReplyAddReply />
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
          <ControlButton type={type} isSelf={isSelf} />
        </div>
        {renderContent(type)}
        {rederReply(type)}
        {showReply && renderAddReply(type)}
      </div>
    </div>
  )
}

function StyledCommentCard() {
  const { comment, showReply } = useComment()
  const { user } = useUser()
  const isSelf = () => {
    return comment.user.username === user.username
  }
  return (
    <StyledCard
      dataSource={comment}
      type="comment"
      isSelf={isSelf()}
      showReply={showReply}
    />
  )
}

function StyledReplyCard() {
  const { reply, showReply } = useReply()
  const { user } = useUser()
  const isSelf = () => {
    return reply.user.username === user.username
  }
  return (
    <StyledCard
      dataSource={reply}
      type="reply"
      isSelf={isSelf()}
      showReply={showReply}
    />
  )
}

export { StyledCommentCard, StyledReplyCard }
