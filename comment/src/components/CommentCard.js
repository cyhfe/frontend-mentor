/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useState } from "react"
import { useComments, useUser } from "../context"

import EditReply from "./EditReply"
import {
  Modal,
  ModalOpenButton,
  ModalDismissButton,
  ModalConfirmButton,
  ModalContents,
} from "./Modal"

function CommentCard({
  comment,
  user,
  editComment,
  handleUp,
  handleDown,
  onRemove,
}) {
  const [editable, setEditable] = useState(false)
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
      <Control
        user={user}
        comment={comment}
        onRemove={onRemove}
        editable={editable}
        setEditable={setEditable}
      />
    </div>
  )
}

function Control({ user, comment, onRemove, editable, setEditable }) {
  function isSelf() {
    return user.username === comment.user.username
  }
  return (
    <div>
      {isSelf() ? (
        <EditButton
          comment={comment}
          onRemove={onRemove}
          editable={editable}
          setEditable={setEditable}
        />
      ) : (
        <ReplyButton />
      )}
    </div>
  )
}
function Delete({ onRemove }) {
  return (
    <div>
      <Modal>
        <ModalOpenButton>
          <button>delete</button>
        </ModalOpenButton>
        <ModalContents>
          <div>Are you sure you want to delete this comment?</div>
          <ModalDismissButton>
            <button>cancel</button>
          </ModalDismissButton>
          <ModalConfirmButton>
            <button
              onClick={(setIsOpen) => {
                onRemove()
                setIsOpen(false)
              }}
            >
              confirm
            </button>
          </ModalConfirmButton>
        </ModalContents>
      </Modal>
    </div>
  )
}
function EditButton({ comment, onRemove, editable, setEditable }) {
  return (
    <div>
      <Delete onRemove={onRemove} />
      <button
        onClick={() => {
          setEditable((b) => !b)
        }}
      >
        edit
      </button>
    </div>
  )
}

function ReplyButton() {
  const [showReply, setShowReply] = useState(false)
  return (
    <div>
      <button onClick={() => setShowReply((b) => !b)}>reply</button>
      {showReply && <AddReply />}
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
    editComment(content)
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
  const { replyVote, removeReply, editReply } = useComments()
  const handleVote = (commentId, replyId, action) => {
    replyVote(commentId, replyId, action)
  }

  const handleRemove = () => {
    removeReply(comment.id, reply.id)
  }

  const handleEditReply = (content) => {
    editReply(comment.id, reply.id, content)
  }

  return (
    <div
      css={css`
        margin-left: 2rem;
      `}
    >
      <CommentCard
        comment={reply}
        user={user}
        handleDown={() => handleVote(comment.id, reply.id, "DOWN")}
        handleUp={() => handleVote(comment.id, reply.id, "UP")}
        onRemove={handleRemove}
        editComment={handleEditReply}
      />
    </div>
  )
}

function AddReply() {
  const { addComment } = useComments()
  const { user } = useUser()
  const handleSubmit = (content) => {
    addComment(content, user)
  }
  return (
    <EditReply onSubmit={handleSubmit} text="submit" image={user.image.png} />
  )
}

export default CommentCard
