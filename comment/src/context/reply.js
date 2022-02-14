import { createContext, useContext } from "react"
import { useState } from "react"
const ReplyContext = createContext()

export const useReply = () => {
  return useContext(ReplyContext)
}

export function ReplyProvider({ reply, children }) {
  const [editable, setEditable] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const value = {
    reply,
    editable,
    setEditable,
    showReply,
    setShowReply,
  }
  return <ReplyContext.Provider value={value}>{children}</ReplyContext.Provider>
}
