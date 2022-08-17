import { Button, ListGroup, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { commentBlog, deleteBlog, voteBlog } from '../reducers/blogReducer'
import NewCommentForm from './NewCommentForm'

const BlogDetails = ({ blog, notify }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  if (!blog) {
    return <Navigate replace to="/" />
  }

  const url = `https://${blog.url}`
  const correctUser = user.username === blog.user.username

  const handleLike = async (event, blog) => {
    event.preventDefault()

    try {
      dispatch(voteBlog(blog))
      notify(`You liked ${blog.title} by ${blog.author}`)
    } catch (e) {
      notify('Something went wrong with liking the blog', 'alert')
    }
  }

  const handleDelete = async (event, blog) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        notify(`${blog.title} by ${blog.author} deleted`)
      } catch (e) {
        notify('Something went wrong with deleting the blog', 'alert')
      }
    }
  }

  const handleAddComment = async (event, comment, blog) => {
    event.preventDefault()

    console.log('COMMENT IN BlogDetails', comment)

    try {
      dispatch(commentBlog(blog, comment))
      notify(`You added a comment to ${blog.title}`)
    } catch (e) {
      notify('Something went wrong with commenting the blog', 'alert')
    }
  }

  return (
    <div>
      <h2>Details</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Link</th>
            <th>Likes</th>
            {correctUser && <th>Remove?</th>}
          </tr>
        </thead>
        <tbody>
          <tr key={user.id}>
            <th>{blog.title}</th>
            <th>{blog.author}</th>
            <th>
              <a href={url}> {blog.url}</a>
            </th>
            <th>
              <div>
                {blog.likes}{' '}
                <Button
                  id="like-button"
                  variant="primary"
                  onClick={(event) => handleLike(event, blog)}
                >
                  Like
                </Button>
              </div>
            </th>
            {correctUser && (
              <th>
                <Button
                  id="remove-button"
                  variant="danger"
                  onClick={(event) => handleDelete(event, blog)}
                >
                  Remove
                </Button>
              </th>
            )}
          </tr>
        </tbody>
      </Table>
      <h3>Comments</h3>
      <NewCommentForm handleAddComment={handleAddComment} blog={blog} />
      <ListGroup>
        {blog.comments.map((comment) => (
          <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default BlogDetails
