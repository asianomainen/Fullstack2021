import PropTypes from 'prop-types'
import Notification from './Notification'
import Togglable from './Togglable'

const LoginForm = ({
  setUsername,
  setPassword,
  handleLogin,
  notification,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default LoginForm