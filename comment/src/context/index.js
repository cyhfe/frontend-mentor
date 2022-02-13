import React, { createContext, useContext, useState } from "react"
import data from "../data.json"
import moment from "moment"
import { nanoid } from "nanoid"

const { currentUser, comments: currentComments } = data
const UserContext = createContext()
const CommentContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

function newComment(content, user) {
  return {
    id: nanoid(),
    content,
    createdAt: moment().fromNow(),
    score: 0,
    user,
    replies: [],
  }
}

export const useComments = () => {
  const { comments, setComments } = useContext(CommentContext)

  const vote = (id, action) => {
    const newComment = comments.map((comment) => {
      if (comment.id !== id) {
        return comment
      } else {
        return {
          ...comment,
          score:
            action === "up"
              ? comment.score + 1
              : action === "down"
              ? comment.score - 1
              : comment.score,
        }
      }
    })
    setComments(newComment)
  }

  const addComment = (content, user) => {
    const comment = newComment(content, user)
    setComments([...comments, comment])
  }

  return {
    comments,
    addComment,
    vote,
  }
}

export const Provider = ({ children }) => {
  const [user, setUser] = useState(currentUser)
  const [comments, setComments] = useState(currentComments)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CommentContext.Provider value={{ comments, setComments }}>
        {children}
      </CommentContext.Provider>
    </UserContext.Provider>
  )
}
