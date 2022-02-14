/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useUser } from "../context"
import { useComment } from "../context/comment"
import { useReply } from "../context/reply"

function Avatar({ dataSource, user }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      <div>
        <img
          src={dataSource?.user?.image?.png}
          css={css`
            width: 30px;
            height: 30px;
          `}
        />
        {user.username === dataSource.user.username && <div>you</div>}
        <div>{dataSource?.user?.username}</div>
        <div>{dataSource?.createdAt}</div>
      </div>
    </div>
  )
}

function CommentAvatar() {
  const { comment } = useComment()
  const { user } = useUser()
  return <Avatar dataSource={comment} user={user} />
}
function ReplyAvatar() {
  const { reply } = useReply()
  const { user } = useUser()
  return <Avatar dataSource={reply} user={user} />
}
export { CommentAvatar, ReplyAvatar }
