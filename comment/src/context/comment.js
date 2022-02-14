import { createContext, useContext } from "react"
import { useComments } from "./index"

const CommentContext = createContext()

export const useComment = () => {
  const comment = useContext(CommentContext)
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
    voteUp,
    voteDown,
    handleEditComment,
    handleRemoveComment,
  }
}

export function CommentProvider({ comment, children }) {
  return (
    <CommentContext.Provider value={comment}>
      {children}
    </CommentContext.Provider>
  )
}
