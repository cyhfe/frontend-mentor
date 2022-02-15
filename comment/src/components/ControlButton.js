/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useComments } from "../context"
import { useComment } from "../context/comment"
import { useReply } from "../context/reply"

import Button from "./Button"
import {
  Modal,
  ModalOpenButton,
  ModalDismissButton,
  ModalConfirmButton,
  ModalContents,
} from "./Modal"

import { IconDelete, IconEdit, IconReply } from "./Icons"

function ControlButton({ isSelf, type }) {
  const renderReplyButton = (type) => {
    return type === "comment" ? <CommentReplyButton /> : <ReplyReplyButton />
  }
  const renderEditButton = (type) => {
    return type === "comment" ? <CommentEditButton /> : <ReplyEditButton />
  }
  const renderButton = () => {
    return isSelf ? renderEditButton(type) : renderReplyButton(type)
  }

  return <div>{renderButton()}</div>
}

function Delete({ onRemove }) {
  return (
    <div>
      <Modal>
        <ModalOpenButton>
          <Button variant="danger" space>
            <IconDelete />
            Delete
          </Button>
        </ModalOpenButton>
        <ModalContents title="Delete Comment">
          <p>Are you sure you want to delete this comment?</p>
          <div
            css={css`
              display: flex;
              justify-content: right;
              column-gap: 1rem;
            `}
          >
            <ModalDismissButton>
              <Button color="danger">cancel</Button>
            </ModalDismissButton>
            <ModalConfirmButton>
              <Button
                onClick={(setIsOpen) => {
                  onRemove()
                  setIsOpen(false)
                }}
              >
                confirm
              </Button>
            </ModalConfirmButton>
          </div>
        </ModalContents>
      </Modal>
    </div>
  )
}

function EditButton({ onRemove, setEditable }) {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <Delete onRemove={onRemove} />
      <Button
        variant="primary"
        onClick={() => {
          setEditable((b) => !b)
        }}
      >
        <IconEdit />
        Edit
      </Button>
    </div>
  )
}

function CommentEditButton() {
  const { removeComment } = useComments()
  const { comment, setEditable } = useComment()
  const handleRemove = () => {
    removeComment(comment.id)
  }
  return <EditButton onRemove={handleRemove} setEditable={setEditable} />
}

function ReplyEditButton() {
  const { removeReply } = useComments()
  const { comment } = useComment()
  const { reply, setEditable } = useReply()
  const handleRemove = () => {
    removeReply(comment.id, reply.id)
  }
  return <EditButton onRemove={handleRemove} setEditable={setEditable} />
}

function ReplyButton({ setShowReply }) {
  return (
    <div>
      <Button variant="primary" onClick={() => setShowReply((b) => !b)} space>
        <IconReply />
        Reply
      </Button>
    </div>
  )
}

function CommentReplyButton() {
  const { setShowReply } = useComment()
  return <ReplyButton setShowReply={setShowReply} />
}

function ReplyReplyButton() {
  const { setShowReply } = useReply()
  return <ReplyButton setShowReply={setShowReply} />
}

export default ControlButton
