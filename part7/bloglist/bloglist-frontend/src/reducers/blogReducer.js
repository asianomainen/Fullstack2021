import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const _ = require('lodash')

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return _.chain(state)
        .map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
        .orderBy('likes', 'desc')
        .value()
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return _.chain(state)
        .filter((blog) => blog.id !== action.payload)
        .orderBy('likes', 'desc')
        .value()
    },
    setBlogs(state, action) {
      return _.orderBy(action.payload, ['likes'], ['desc'])
    },
  },
})

export const { updateBlog, appendBlog, removeBlog, setBlogs } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog, user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)

    newBlog.user = {
      name: user.name,
      username: user.username,
    }

    dispatch(appendBlog(newBlog))
  }
}

export const voteBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })

    updatedBlog.user = {
      name: blog.user.name,
      username: blog.user.username,
    }

    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.commentBlog({
      id: blog.id,
      comment: comment,
    })

    updatedBlog.user = {
      name: blog.user.name,
      username: blog.user.username,
    }

    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer
