import { useState } from 'react'

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
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={handleTitleChange}
            id='title-input'
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={handleAuthorChange}
            id='author-input'
          />
        </div>
        <div>
          URL:
          <input
            type='text'
            value={url}
            name='Url'
            onChange={handleUrlChange}
            id='url-input'
          />
        </div>
        <button id='create-button' type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm