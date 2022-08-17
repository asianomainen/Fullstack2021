import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import { loginUser, logoutUser } from '../reducers/userReducer'
import BlogDetails from './BlogDetails'
import BlogList from './BlogList'
import LoginForm from './LoginForm'
import Notification from './Notification'
import User from './User'
import Users from './Users'

const Menu = ({
  signedUser,
  blogs,
  notification,
  notify,
  allUsers,
  user,
  blog,
}) => {
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  const handleLogin = (username, password) => {
    dispatch(loginUser(username, password, notify))
  }

  if (!signedUser) {
    return <LoginForm handleLogin={handleLogin} notification={notification} />
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Blog app</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as="span">
                <Link to="/">Blogs</Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Link to="/users">Users</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <div style={{ padding: 10 }}>{signedUser.name} is logged in</div>
            <Button variant="warning" id="logout-button" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Notification notification={notification} />

      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              user={signedUser}
              blogs={blogs}
              notification={notification}
              notify={notify}
            />
          }
        />
        <Route path="/users" element={<Users users={allUsers} />} />
        <Route path="/users/:id" element={<User user={user} blogs={blogs} />} />
        <Route
          path="/blogs/:id"
          element={<BlogDetails blog={blog} notify={notify} />}
        />
        <Route
          path="/login"
          element={
            <LoginForm
              handleLogin={handleLogin}
              notify={notify}
              notification={notification}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default Menu
