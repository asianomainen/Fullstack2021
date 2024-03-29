import { createSlice } from '@reduxjs/toolkit'

let timer

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      const notification = action.payload
      return state = notification
    },
    clearNotification(state, action) {
      return state = ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, time) => {
  return dispatch => {
    dispatch(setNotification(message))

    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer