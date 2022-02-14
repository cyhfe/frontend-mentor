import { useComment } from "../context/comment"
import { useComments } from "../context"
import { useReply } from "../context/reply"
function Score({ score, onVote }) {
  return (
    <div>
      <button onClick={() => onVote("UP")}>+</button>
      <div>{score}</div>
      <button onClick={() => onVote("DOWN")}>-</button>
    </div>
  )
}

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
