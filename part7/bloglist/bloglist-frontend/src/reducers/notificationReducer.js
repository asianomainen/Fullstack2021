import { createSlice } from '@reduxjs/toolkit'

let timer

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      const notification = action.payload
      return notification
    },
    clearNotification() {
      return ''
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, type) => {
  return (dispatch) => {
    dispatch(setNotification({ message, type }))

    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer
