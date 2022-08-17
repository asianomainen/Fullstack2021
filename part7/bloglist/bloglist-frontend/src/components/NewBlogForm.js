import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    handleAddBlog(event, {
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={author}
            onChange={handleAuthorChange}
          />
          <Form.Label>URL:</Form.Label>
          <Form.Control
            style={{ marginBottom: 5 }}
            type="text"
            name="url"
            value={url}
            onChange={handleUrlChange}
          />
          <Button
            style={{ marginBottom: 5 }}
            variant="success"
            id="create-button"
            type="submit"
          >
            Create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
