import PropTypes from 'prop-types'
import Notification from './Notification'
import Togglable from './Togglable'

import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const LoginForm = ({ handleLogin, notification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification notification={notification} />
      <Form
        onSubmit={(event) => {
          event.preventDefault()
          handleLogin(username, password)
        }}
      >
        <Form.Group>
          <div style={{ marginBottom: 5 }}>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

Togglable.displayName = 'Togglable'

export default LoginForm
