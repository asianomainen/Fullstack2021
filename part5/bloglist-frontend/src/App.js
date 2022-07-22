import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll()
      allBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(allBlogs)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('Wrong credentials', 'alert')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title, author, url
      })

      const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))

      newBlog.user = {
        username: loggedUser.username,
        name: loggedUser.name
      }

      setBlogs(blogs.concat(newBlog))
      notify(`a new blog ${title} by ${author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      notify('Something went wrong with adding the blog', 'alert')
    }
  }

  const handleDeleteBlog = async (event, blog) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        notify(`${blog.title} by ${blog.author} deleted`)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (e) {
        notify('Something went wrong with deleting the blog', 'alert')
      }
    }
  }

  const handleLike = async (event, blog) => {
    event.preventDefault()

    try {
      const updatedBlog = await blogService.update(blog.id, {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      })

      updatedBlog.user = {
        username: blog.user.username,
        name: blog.user.name
      }

      const updatedBlogs = blogs
        .map(b => b.id !== blog.id ? b : updatedBlog)
        .sort((a, b) => b.likes - a.likes)

      setBlogs(updatedBlogs)
    } catch (e) {
      notify('Something went wrong with liking the blog', 'alert')
    }
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
          notification={notification}
          username={username}
          password={password}
        />
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification notification={notification} />
        <div>
          {user.name} is logged in
          <button onClick={handleLogout}>Logout</button>
        </div>
        <br />
        <Togglable buttonLabel='New blog'>
          <BlogForm
            handleAddBlog={handleAddBlog}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            title={title}
            author={author}
            url={url}
          />
        </Togglable>
        <br />
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDeleteBlog} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App
