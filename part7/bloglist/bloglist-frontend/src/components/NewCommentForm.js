import { useState } from 'react'
import { Button } from 'react-bootstrap'

const BlogForm = ({ handleAddComment, blog }) => {
  const [comment, setComment] = useState('')

  const handlCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()

    handleAddComment(event, comment, blog)

    setComment('')
  }

  return (
    <div>
      <form onSubmit={addComment}>
        <div>
          <input
            type="text"
            value={comment}
            name="Comment"
            onChange={handlCommentChange}
            id="comment-input"
          />
          <Button
            style={{ padding: 3, marginLeft: 5 }}
            id="add-button"
            type="submit"
          >
            Add comment
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
