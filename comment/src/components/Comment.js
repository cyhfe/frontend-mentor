function Comment({ comment, vote }) {
  const handleUp = () => {
    vote(comment.id, "up")
  }
  const handleDown = () => {
    vote(comment.id, "down")
  }
  return (
    <div>
      <div>
        <img src={comment?.user?.image?.png} />
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
      <div>
        <button>replay</button>
      </div>
      {/* {comment.replies &&
        comment.replies.map((comment) => {
          return <Comment comment={comment} />
        })} */}
    </div>
  )
}

export default Comment
