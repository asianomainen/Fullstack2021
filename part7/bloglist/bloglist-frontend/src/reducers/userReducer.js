import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout() {
      return null
    },
  },
})

export const { login, logout } = userSlice.actions

export const loginUser = (username, password, notify) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(login(user))
      notify(`Welcome ${username}`)
    } catch (e) {
      window.localStorage.removeItem('loggedUser')
      notify('Wrong credentials', 'alert')
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
  }
}

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(login(user))
    }
  }
}

export default userSlice.reducer
