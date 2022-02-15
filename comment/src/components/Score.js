/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { useComment } from "../context/comment"
import { useComments } from "../context"
import { useReply } from "../context/reply"
import { colors } from "../utils/style"
import { IconPlus, IconMinus } from "./Icons"

function Score({ score, onVote }) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        column-gap: 6px;
        background-color: ${colors.Verylightgray};
        padding: 4px 12px;
        border-radius: 4px;
      `}
    >
      <StyledButton onClick={() => onVote("DOWN")}>
        <IconMinus />
      </StyledButton>
      <div
        css={css`
          min-width: 20px;
          text-align: center;
          font-weight: 500;
          color: ${colors.Moderateblue};
        `}
      >
        {score}
      </div>
      <StyledButton onClick={() => onVote("UP")}>{<IconPlus />}</StyledButton>
    </div>
  )
}

const StyledButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`

function CommentScore() {
  const { comment } = useComment()
  const { vote } = useComments()
  const handleVote = (action) => {
    vote(comment.id, action)
  }
  return <Score onVote={handleVote} score={comment.score} />
}

function ReplyScore() {
  const { comment } = useComment()
  const { reply } = useReply()
  const { replyVote } = useComments()
  const handleVote = (action) => {
    replyVote(comment.id, reply.id, action)
  }
  return <Score onVote={handleVote} score={reply.score} />
}

export { CommentScore, ReplyScore }
