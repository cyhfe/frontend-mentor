/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useState } from "react"
import { colors } from "../utils/style"
import Button from "./Button"
function EditReply({ onSubmit, image, text, initContent = "" }) {
  const [content, setContent] = useState(initContent)
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(content)
    setContent("")
  }
  return (
    <div
      css={css`
        background-color: #fff;
      `}
    >
      <form
        onSubmit={handleSubmit}
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 1rem;
        `}
      >
        <textarea
          css={css`
            resize: none;
            border-radius: 6px;
            border-color: ${colors.Lightgray};
            padding: 8px;
            overflow: auto;
            min-height: 60px;
          `}
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <div
            css={css`
              width: 32px;
              height: 32px;
            `}
          >
            <img src={image} alt="img" />
          </div>
          <div>
            <Button type="Submit">{text}</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditReply
