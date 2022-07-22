import { useState } from 'react'

const NewBlogForm = ({ handleAddBlog, }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value)
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const addBlog = (e) => {
    e.preventDefault()

    handleAddBlog({
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

export default NewBlogForm