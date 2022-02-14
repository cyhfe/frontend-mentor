import { createContext, useContext } from "react"

const ReplyContext = createContext()

export const useReply = () => {
  const reply = useContext(ReplyContext)

  return {
    reply,
  }
}

export function ReplyProvider({ reply, children }) {
  return <ReplyContext.Provider value={reply}>{children}</ReplyContext.Provider>
}
