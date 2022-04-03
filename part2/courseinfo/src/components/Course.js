import React from 'react'

const Header = ({name}) => {
    return <h2>{name}</h2>
}

const Content = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises}/>)
            }
            <strong>total of {total} exercises</strong>
        </>
    )
}

const Part = ({name, exercises}) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
        </div>
    )
}

export default Course