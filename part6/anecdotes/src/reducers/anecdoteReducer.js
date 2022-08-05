import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const _ = require('lodash');

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const updatedAnecdote = action.payload
      state = state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
      return state = _.orderBy(state, ['votes'], ['desc'])
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return state = _.orderBy(action.payload, ['votes'], ['desc'])
    }
  }
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(addVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer