/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { CommentProvider } from "../context/comment"
import { ReplyProvider } from "../context/reply"
import { StyledReplyCard } from "./StyledCard"

function Reply({ comment, reply }) {
  return (
    <div css={css``}>
      <CommentProvider comment={comment}>
        <ReplyProvider reply={reply}>
          <StyledReplyCard type="reply" />
        </ReplyProvider>
      </CommentProvider>
    </div>
  )
}

export default Reply
