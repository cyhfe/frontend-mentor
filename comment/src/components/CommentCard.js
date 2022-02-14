/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useState } from "react"
import Reply from "./Reply"

import AddReply from "./AddReply"

import {
  Modal,
  ModalOpenButton,
  ModalDismissButton,
  ModalConfirmButton,
  ModalContents,
} from "./Modal"

function CommentCard({ comment, user, onRemove, children }) {
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
        {children}
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <Header comment={comment} user={user} />
          <Content editable={editable} setEditable={setEditable} />
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
        <ReplyButton comment={comment} />
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

function ReplyButton({ comment }) {
  const [showReply, setShowReply] = useState(false)
  return (
    <div>
      <button onClick={() => setShowReply((b) => !b)}>reply</button>
      {showReply && <AddReply comment={comment} />}
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

export default CommentCard
