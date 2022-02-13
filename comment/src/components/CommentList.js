import { useComments } from "../context"
import Comment from "./Comment"
function CommentList() {
  const { comments, vote } = useComments()
  return (
    <div>
      {comments.map((comment) => (
        <Comment comment={comment} vote={vote} key={comment.id} />
      ))}
    </div>
  )
}

export default CommentList
