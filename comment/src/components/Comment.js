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

  const handleSubmitEdit = (e) => {
    e.preventDefault()
    editComment(comment.id, content)
    setEditable(false)
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
      <div>
        <button onClick={handleUp}>+</button>
        <div>{comment.score}</div>
        <button onClick={handleDown}>-</button>
      </div>

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
  const { user } = useUser()
  const onSubmit = (content) => {}
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
