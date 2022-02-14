import { useState } from "react"
import { useComments, useUser } from "../context"
import EditReply from "./EditReply"
import CommentCard from "./CommentCard"
import {
  Modal,
  ModalOpenButton,
  ModalDismissButton,
  ModalConfirmButton,
  ModalContents,
} from "./Modal"
function Comment({ comment, vote }) {
  const { addReply, editComment } = useComments()
  const { user } = useUser()
  const [showReply, setShowReply] = useState(false)
  const [editable, setEditable] = useState(false)
  const [content, setContent] = useState(comment.content)

  const handleUp = () => {
    vote(comment.id, "up")
  }
  const handleDown = () => {
    vote(comment.id, "down")
  }

  const onSubmit = (content) => {
    addReply(comment, content, user)
  }

  return (
    <div>
      <CommentCard
        type="comment"
        comment={comment}
        user={user}
        editComment={editComment}
        editable={editable}
        setEditable={setEditable}
        handleDown={handleDown}
        handleUp={handleUp}
      />
      {/* <div>
        <button onClick={handleUp}>+</button>
        <div>{comment.score}</div>
        <button onClick={handleDown}>-</button>
      </div> */}

      {comment.replies.length > 0 &&
        comment.replies.map((reply) => <div>{reply.content}</div>)}
      {user.username === comment.user.username ? (
        <Control comment={comment} setEditable={setEditable} />
      ) : (
        <div>
          <button onClick={() => setShowReply((show) => !show)}>reply</button>
        </div>
      )}
      {showReply && (
        <EditReply onSubmit={onSubmit} text="Replys" image={user.image.png} />
      )}
    </div>
  )
}

function Control({ comment, setEditable }) {
  return (
    <>
      <Delete comment={comment} />
      <Edit setEditable={setEditable} />
    </>
  )
}

function Edit({ setEditable }) {
  // const {} = useComments()

  return (
    <div>
      <button onClick={() => setEditable((b) => !b)}>edit</button>
      {/* <EditReply onSubmit={onSubmit} text="Replys" image={user.image.png} /> */}
    </div>
  )
}

function Delete({ comment }) {
  const { removeComment } = useComments()
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
                removeComment(comment.id)
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

export default Comment
