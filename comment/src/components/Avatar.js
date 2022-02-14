/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useUser } from "../context"
import { useComment } from "../context/comment"

function Avatar() {
  const { comment } = useComment()
  const { user } = useUser()
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      <div>
        <img
          src={comment?.user?.image?.png}
          css={css`
            width: 30px;
            height: 30px;
          `}
        />
        {user.username === comment.user.username && <div>you</div>}
        <div>{comment?.user?.username}</div>
        <div>{comment?.createdAt}</div>
      </div>
    </div>
  )
}

export default Avatar
