import { CommentProvider } from "../context/comment"

import { StyledCommentCard } from "./StyledCard"
function Comment({ comment }) {
  return (
    <div>
      <CommentProvider comment={comment}>
        <StyledCommentCard />
      </CommentProvider>
    </div>
  )
}

export default Comment
