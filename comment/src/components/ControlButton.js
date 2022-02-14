import { useComments, useUser } from "../context"
import { useComment } from "../context/comment"
import { useState } from "react"
import AddReply from "./AddReply"
import {
  Modal,
  ModalOpenButton,
  ModalDismissButton,
  ModalConfirmButton,
  ModalContents,
} from "./Modal"
import { useReply } from "../context/reply"

function ControlButton({ type, editable, setEditable }) {
  const { user } = useUser()
  const { comment } = useComment()
  const isSelf = () => {
    return user.username === comment.user.username
  }

  return (
    <div>
      {isSelf() ? (
        <EditButton type={type} editable={editable} setEditable={setEditable} />
      ) : (
        "reply"
      )}
    </div>
  )
}
// (
//   <ReplyButton comment={comment} />
// )
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
function EditButton({ type, editable, setEditable }) {
  const { removeComment, removeReply } = useComments()
  const { comment } = useComment()
  const { reply } = useReply()
  const handleRemove = () => {
    if (type === "comment") {
      removeComment(comment.id)
    } else if (type === "reply") {
      removeReply(comment.id, reply.id)
    }
  }

  return (
    <div>
      <Delete onRemove={handleRemove} />
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
export default ControlButton
