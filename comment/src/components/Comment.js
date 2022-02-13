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
function Comment({ comment, vote }) {
  const { addReply } = useComments()
  const { user } = useUser()
  const [showReply, setShowReply] = useState(false)
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
      <div>
        <img src={comment?.user?.image?.png} />
        {user.username === comment.user.username && <div>you</div>}
        <div>{comment?.user?.username}</div>
        <div>{comment?.createdAt}</div>
      </div>
      <div style={{ border: "1px solid red", padding: "1rem" }}>
        {comment?.content}
      </div>
      <div>
        <button onClick={handleUp}>+</button>
        <div>{comment.score}</div>
        <button onClick={handleDown}>-</button>
      </div>

      {comment.replies.length > 0 &&
        comment.replies.map((reply) => <div>{reply.content}</div>)}
      {user.username === comment.user.username ? (
        <Control comment={comment} />
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

function Control({ comment }) {
  const { removeComment } = useComments()
  return (
    <div>
      {/* <button>edit</button>
      <button onClick={open}>delete</button> */}
      {/* <Dialog isOpen={showDialog} onDismiss={close}>
        <h4>Delete comment</h4>
        <p>Are you sure you want to delete this comment?</p>
        <button onClick={close}>CANCEL</button>
        <button onClick={() => handleRemoveComment(comment.id)}>DELETE</button>
      </Dialog> */}
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
      <Modal>
        <ModalOpenButton>
          <button>edit</button>
        </ModalOpenButton>
        <ModalContents></ModalContents>
      </Modal>
    </div>
  )
}

export default Comment
