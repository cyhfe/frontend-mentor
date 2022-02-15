/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { CommentAvatar, ReplyAvatar } from "./Avatar"
import { CommentScore, ReplyScore } from "./Score"
import { CommentContent, ReplyContent } from "./Content"
import { CommentAddReply, ReplyAddReply } from "./AddReply"
import { useComment } from "../context/comment"
import Reply from "./Reply"
import ControlButton from "./ControlButton"
import { useReply } from "../context/reply"
import { useUser } from "../context"
import { colors } from "../utils/style"
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
    <div>
      <div
        css={css`
          padding: 1rem;
          background-color: ${colors.White};
          margin-bottom: 1rem;
          border-radius: 12px;
        `}
      >
        <div>
          {renderAvatar(type)}
          <div
            css={css`
              margin-bottom: 1rem;
            `}
          >
            {renderContent(type)}
          </div>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          {renderScore(type)}
          <ControlButton type={type} isSelf={isSelf} />
        </div>
      </div>
      {showReply && renderAddReply(type)}
      <div
        css={css`
          margin-left: 3rem;
          position: relative;
          &::before {
            position: absolute;
            content: "";
            display: block;
            left: -1.5rem;
            width: 2px;
            height: 100%;
            background-color: ${colors.Lightgray};
          }
        `}
      >
        {rederReply(type)}
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
