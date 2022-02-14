import { createContext, useContext } from "react"
import { useComments } from "./index"
import { useState } from "react"
const CommentContext = createContext()

export const useComment = () => {
  const { comment, editable, setEditable, showReply, setShowReply } =
    useContext(CommentContext)
  const { vote, removeComment, editComment } = useComments()
  const voteUp = () => {
    vote(comment.id, "up")
  }

  const voteDown = () => {
    vote(comment.id, "down")
  }

  const handleRemoveComment = () => {
    removeComment(comment.id)
  }

  const handleEditComment = (content) => {
    editComment(comment.id, content)
  }

  return {
    comment,
    editable,
    setEditable,
    showReply,
    setShowReply,

    voteUp,
    voteDown,
    handleEditComment,
    handleRemoveComment,
  }
}

export function CommentProvider({ comment, children }) {
  const [editable, setEditable] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const value = {
    comment,
    editable,
    setEditable,
    showReply,
    setShowReply,
  }
  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  )
}
