import { useState } from 'react'

const Blog = ({ handleLike, handleDelete, blog }) => {
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false)
  const hideWhenVisible = { display: viewDetailsVisible ? 'none' : '' }
  const showWhenVisible = { display: viewDetailsVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setViewDetailsVisible(!viewDetailsVisible)
  }

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
  const correctUser = (loggedUser.username === blog.user.username)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        <span>{blog.title} {blog.author}</span>
        <button id='view-button' style={hideWhenVisible} onClick={toggleVisibility}>View</button>
        <button id='hide-button' style={showWhenVisible} onClick={toggleVisibility}>Hide</button>
        <div style={showWhenVisible} >
          {blog.url} <br />
          likes {blog.likes} <button id='like-button' onClick={(event) => handleLike(event, blog)}>Like</button> <br />
          {blog.user.name} <br />
          {correctUser && <button id='remove-button' onClick={(event) => handleDelete(event, blog)}>Remove</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog