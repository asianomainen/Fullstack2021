import React, { useState } from 'react'

const Header = ({title}) => <h1>{title}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>
          {text}
        </td>
        <td>
          {value} %
        </td>
      </tr>
    )
  }
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad
  const average = (1 * good + -1 * bad) / (good + neutral + bad)
  const positive = (good / (good + neutral + bad)) * 100

  if (sum > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={sum} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Header title="give feedback" />
      <Button text="good" handleClick={handleGoodClick} />
      <Button text="neutral" handleClick={handleNeutralClick} />
      <Button text="bad" handleClick={handleBadClick} />
      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
