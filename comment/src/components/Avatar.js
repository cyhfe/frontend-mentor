/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { useUser } from "../context"
import { useComment } from "../context/comment"
import { useReply } from "../context/reply"
import { colors } from "../utils/style"

function Avatar({ dataSource, user }) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        column-gap: 1rem;
        margin-bottom: 1rem;
      `}
    >
      <img
        alt="user"
        src={dataSource?.user?.image?.png}
        css={css`
          width: 32px;
          height: 32px;
        `}
      />
      {user.username === dataSource.user.username && <Tag>you</Tag>}
      <div
        css={css`
          font-weight: 500;
        `}
      >
        {dataSource?.user?.username}
      </div>
      <div
        css={css`
          color: ${colors.GrayishBlue};
        `}
      >
        {dataSource?.createdAt}
      </div>
    </div>
  )
}

const Tag = styled.div`
  color: ${colors.White};
  background-color: ${colors.Moderateblue};
  padding: 4px 6px;
  border-radius: 4px;
`

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
