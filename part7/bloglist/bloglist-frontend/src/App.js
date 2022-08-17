import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { showNotification } from './reducers/notificationReducer'
import { initializeUser } from './reducers/userReducer'

import Menu from './components/Menu'
import userService from './services/users'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const signedUser = useSelector((state) => state.user)
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())

    const getAllUsers = async () => {
      const users = await userService.getAll()
      setAllUsers(users)
    }
    getAllUsers()
  }, [])

  const notify = (message, type = 'info') => {
    dispatch(showNotification(message, type))
  }

  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? allUsers.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <div className="container">
      <Menu
        signedUser={signedUser}
        blogs={blogs}
        notification={notification}
        notify={notify}
        allUsers={allUsers}
        user={user}
        blog={blog}
      />
    </div>
  )
}

export default App
