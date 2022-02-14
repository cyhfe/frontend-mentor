import { useComments } from "../context"
import { useComment } from "../context/comment"
import { useReply } from "../context/reply"

import {
  Modal,
  ModalOpenButton,
  ModalDismissButton,
  ModalConfirmButton,
  ModalContents,
} from "./Modal"

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

function EditButton({ onRemove, setEditable }) {
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

function CommentEditButton() {
  const { removeComment, removeReply } = useComments()
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
      <button onClick={() => setShowReply((b) => !b)}>reply</button>
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
