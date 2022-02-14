import { useComments } from "../context"
import Comment from "./Comment"
import AddComment from "./AddComment"

function CommentList() {
  const { comments, vote } = useComments()
  return (
    <div>
      {comments.map((comment) => (
        <Comment comment={comment} vote={vote} key={comment.id} />
      ))}
      <AddComment />
    </div>
  )
}

export default CommentList
