import React, { useState } from 'react'

const Header = ({title}) => <h1>{title}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected, setSelected] = useState(Math.floor(Math.random() * 7))
  const [points, setPoints] = useState(new Array(7).fill(0))
  const top = points.indexOf(Math.max(...points))

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const handleNextAnecdoteClick = () => setSelected(Math.floor(Math.random() * 7))
  
  return (
    <div>
      <Header title="Anecdote of the day" />
      {anecdotes[selected]}<br />
      has {points[selected]} votes<br />
      <Button text="vote" handleClick={handleVoteClick} />
      <Button text="next anecdote" handleClick={handleNextAnecdoteClick} />
      <Header title="Anecdote with most votes" />
      {anecdotes[top]}<br />
      has {points[top]} votes
    </div>
  )
}

export default App
