import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <>
      <div className="blog">
        <span>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </span>
      </div>
    </>
  )
}

export default Blog
