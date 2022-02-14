/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useState } from "react"

function CommentCard({
  type,
  comment,
  user,
  editable,
  setEditable,
  editComment,
  handleUp,
  handleDown,
  replies,
}) {
  // const [content, setContent] = useState()
  return (
    <div
      className="commentCard"
      css={css`
        display: flex;
      `}
    >
      <Score handleUp={handleUp} handleDown={handleDown} comment={comment} />
      <Header comment={comment} user={user} />
      <Content
        comment={comment}
        editComment={editComment}
        editable={editable}
        setEditable={setEditable}
      />
      {replies && <Reply replies={replies} />}
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
      <img src={comment?.user?.image?.png} />
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

function Reply({ replies }) {
  return <CommentCard comment={replies} />
}

export default CommentCard
