import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

import { Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogList = ({ user, blogs, notify }) => {
  const dispatch = useDispatch()

  const handleAddBlog = (event, blog) => {
    event.preventDefault()

    try {
      dispatch(createBlog(blog, user))
      notify(`a new blog ${blog.title} by ${blog.author} added`)
    } catch (e) {
      notify('Something went wrong with adding the blog', 'alert')
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="Create new blog">
        <NewBlogForm handleAddBlog={handleAddBlog} />
      </Togglable>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Blog key={blog.id} blog={blog} />
              </td>
              <td>{blog.author}</td>
              <td>{blog.likes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
