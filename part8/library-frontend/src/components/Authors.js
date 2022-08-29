import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR_BORN } from '../queries'

const Authors = ({ show }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authors = useQuery(ALL_AUTHORS)

  const [changeBorn] = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const submit = (event) => {
    event.preventDefault()

    const publishDate = Number(born)

    changeBorn({ variables: { name, born: publishDate } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((author) => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>set birth year</h2>

        <form onSubmit={submit}>
          <select onChange={({ target }) => setName(target.value)}>
            {authors.data.allAuthors.map((author, i) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
