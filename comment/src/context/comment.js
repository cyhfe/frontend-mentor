import { createContext, useContext } from "react"

const CommentContext = createContext()

export const useComment = () => {
  return useContext(CommentContext)
}

export function CommentProvider({ comment, children }) {
  return (
    <CommentContext.Provider value={comment}>
      {children}
    </CommentContext.Provider>
  )
}
