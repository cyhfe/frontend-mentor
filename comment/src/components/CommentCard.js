/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useState } from "react"
import { useComments } from "../context"

function CommentCard({
  comment,
  user,
  editable,
  setEditable,
  editComment,
  handleUp,
  handleDown,
}) {
  return (
    <div
      css={css`
        border: 1px solid red;
      `}
    >
      <div
        className="commentCard"
        css={css`
          display: flex;
        `}
      >
        <Score handleUp={handleUp} handleDown={handleDown} comment={comment} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <Header comment={comment} user={user} />
          <Content
            comment={comment}
            editComment={editComment}
            editable={editable}
            setEditable={setEditable}
          />
        </div>
      </div>
      {comment.replies &&
        comment.replies.length > 0 &&
        comment.replies.map((reply) => (
          <Reply comment={comment} reply={reply} user={user} />
        ))}
      <Control user={user} comment={comment} />
    </div>
  )
}

function Control({ user, comment }) {
  function isSelf() {
    return user.username === comment.user.username
  }
  return (
    <div>
      {isSelf() ? <EditButton /> : <ReplyButton />}
      {/* {isSelf() ? (
        <Control comment={comment} setEditable={setEditable} />
      ) : (
        <div>
          <button onClick={() => setShowReply((show) => !show)}>reply</button>
        </div>
      )}
      {showReply && (
        <EditReply onSubmit={onSubmit} text="Replys" image={user.image.png} />
      )} */}
    </div>
  )
}

function EditButton() {
  return (
    <div>
      <button>delete</button>
      <button>edit</button>
    </div>
  )
}

function ReplyButton() {
  return (
    <div>
      <button>reply</button>
    </div>
  )
}

function Header({ comment, user }) {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <img
        src={comment?.user?.image?.png}
        css={css`
          width: 30px;
          height: 30px;
        `}
      />
      {user.username === comment.user.username && <div>you</div>}
      <div>{comment?.user?.username}</div>
      <div>{comment?.createdAt}</div>
    </div>
  )
}

function Content({ editable, setEditable, editComment, comment }) {
  const [content, setContent] = useState(comment.content)
  const handleSubmitEdit = (e) => {
    e.preventDefault()
    editComment(comment.id, content)
    setEditable(false)
  }
  return (
    <div>
      <div>
        {editable ? (
          <div>
            <form onSubmit={handleSubmitEdit}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <input type="submit" value="update" />
            </form>
          </div>
        ) : (
          comment?.content
        )}
      </div>
    </div>
  )
}

function Score({ handleUp, handleDown, comment }) {
  return (
    <div>
      <button onClick={handleUp}>+</button>
      <div>{comment.score}</div>
      <button onClick={handleDown}>-</button>
    </div>
  )
}

function Reply({ comment, reply, user }) {
  const { replyVote } = useComments()
  const handleVote = (commentId, replyId, action) => {
    replyVote(commentId, replyId, action)
  }

  return (
    <div
      css={css`
        margin-left: 2rem;
      `}
    >
      return{" "}
      <CommentCard
        comment={reply}
        user={user}
        handleDown={() => handleVote(comment.id, reply.id, "DOWN")}
        handleUp={() => handleVote(comment.id, reply.id, "UP")}
      />
    </div>
  )
}

export default CommentCard
