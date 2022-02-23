import {useState} from 'react'

const Header = ({title}) => <h1>{title}</h1>

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    const average = (good - bad) / all
    const positive = good / (good + neutral + bad) * 100

    if (all === 0) {
        return (
            <>
                No feedback given
            </>
        )
    }

    return (
        <table>
            <tbody>
                <StatisticLine text="good" value={good}/>
                <StatisticLine text="neutral" value={neutral}/>
                <StatisticLine text="bad" value={bad}/>
                <StatisticLine text="all" value={all}/>
                <StatisticLine text="average" value={average}/>
                <StatisticLine text="positive" value={positive}/>
            </tbody>
        </table>
    )
}

const StatisticLine = ({text, value}) => {
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

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const addGood = () => {
        setGood(good + 1)
    }

    const addNeutral = () => {
        setNeutral(neutral + 1)
    }

    const addBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <Header title="give feedback" />
            <Button handleClick={() => addGood()} text={"good"}/>
            <Button handleClick={() => addNeutral()} text={"neutral"}/>
            <Button handleClick={() => addBad()} text={"bad"}/>
            <Header title="statistics" />
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App