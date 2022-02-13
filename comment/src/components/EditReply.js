import { useState } from "react"

function EditReply({ onSubmit, image, text }) {
  const [content, setContent] = useState("")
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
