import { useState } from "react"

function EditReply({ onSubmit, image, text, initContent = "" }) {
  const [content, setContent] = useState(initContent)
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(content)
    setContent("")
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <img src={image} />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input type="submit" value={text} />
      </form>
    </div>
  )
}

export default EditReply
