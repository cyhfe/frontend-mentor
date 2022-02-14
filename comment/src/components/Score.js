import { useComment } from "../context/comment"
import { useComments } from "../context"
import { useReply } from "../context/reply"
function Score({ type }) {
  const { comment } = useComment()
  const { reply } = useReply()
  const { replyVote, vote } = useComments()

  const handleVote = (action) => {
    if (type === "comment") {
      vote(comment.id, action)
    } else if (type === "reply") {
      replyVote(comment.id, reply.id, action)
    }
  }

  return (
    <div>
      <button onClick={() => handleVote("UP")}>+</button>
      <div>{type === "comment" ? comment.score : reply.score}</div>
      <button onClick={() => handleVote("DOWN")}>-</button>
    </div>
  )
}

export default Score
