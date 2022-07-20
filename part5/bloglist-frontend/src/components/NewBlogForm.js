const NewBlogForm = ({
  handleAddBlog,
  setTitle,
  setAuthor,
  setUrl,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={handleAddBlog}>
        <div>
          Title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type='author'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm