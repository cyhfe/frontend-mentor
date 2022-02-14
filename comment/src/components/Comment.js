import { useComments, useUser } from "../context"

import { CommentProvider } from "../context/comment"

import { StyledCommentCard } from "./StyledCard"
function Comment({ comment }) {
  // const { editComment, removeComment } = useComments()

  // const { user } = useUser()

  // const handleRemove = () => {
  //   removeComment(comment.id)
  // }

  // const handleEditComment = (content) => {
  //   editComment(comment.id, content)
  // }

  return (
    <div>
      <CommentProvider comment={comment}>
        <StyledCommentCard />
      </CommentProvider>
    </div>
  )
}

export default Comment
