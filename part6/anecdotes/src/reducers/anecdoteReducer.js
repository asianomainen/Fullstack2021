import { createSlice } from '@reduxjs/toolkit';

const _ = require('lodash');

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      state = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
      return state = _.orderBy(state, ['votes'], ['desc'])
    },
    addAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, addAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer