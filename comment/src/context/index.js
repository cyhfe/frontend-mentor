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

function newReply(content, to, user) {
  return {
    id: nanoid(),
    content,
    createdAt: moment().fromNow(),
    score: 0,
    replyingTo: to,
    user,
  }
}

export const useComments = () => {
  const { comments, setComments } = useContext(CommentContext)

  const vote = (id, action) => {
    const newComments = comments.map((comment) => {
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
    setComments(newComments)
  }

  const replyVote = (commentId, replyId, action) => {
    const newComments = comments.map((comment) => {
      if (comment.id !== commentId) {
        return comment
      } else {
        const newReplies = comment.replies.map((reply) => {
          if (reply.id !== replyId) return reply
          const newReply = {
            ...reply,
            score:
              action === "UP"
                ? reply.score + 1
                : action === "DOWN"
                ? reply.score - 1
                : reply.score,
          }
          return newReply
        })
        return {
          ...comment,
          replies: newReplies,
        }
      }
    })
    setComments(newComments)
  }

  const addComment = (content, user) => {
    const comment = newComment(content, user)
    setComments([...comments, comment])
  }

  const addReply = (commentId, content, user) => {
    const newComments = comments.map((comment) => {
      if (comment.id !== commentId) return comment
      const to = "comment.user.username"
      const reply = newReply(content, to, user)
      return {
        ...comment,
        replies: [...comment.replies, reply],
      }
    })
    setComments(newComments)
  }

  const removeComment = (id) => {
    const newComments = comments.filter((comment) => comment.id !== id)
    setComments(newComments)
  }

  const editComment = (id, content) => {
    const newComments = comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          content,
        }
      } else {
        return comment
      }
    })
    setComments(newComments)
  }

  const removeReply = (commentId, replyId) => {
    const newComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const newReplies = comment.replies.filter(
          (reply) => reply.id !== replyId
        )
        return {
          ...comment,
          replies: newReplies,
        }
      } else {
        return comment
      }
    })
    setComments(newComments)
  }

  const editReply = (commentId, replyId, content) => {
    const newComments = comments.map((comment) => {
      if (comment.id !== commentId) return comment
      const newReplies = comment.replies.map((reply) => {
        if (reply.id !== replyId) return reply
        return {
          ...reply,
          content,
        }
      })
      return {
        ...comment,
        replies: newReplies,
      }
    })
    setComments(newComments)
  }

  return {
    comments,
    addComment,
    addReply,
    removeComment,
    editComment,
    vote,
    replyVote,
    removeReply,
    editReply,
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
