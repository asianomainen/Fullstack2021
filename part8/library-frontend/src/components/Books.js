import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState([])

  const allBooks = useQuery(ALL_BOOKS)
  const [getBooksbyGenre, booksByGenre] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    allBooks.data && setBooks(allBooks.data.allBooks)
  }, [allBooks.data])

  useEffect(() => {
    booksByGenre.data && setBooks(booksByGenre.data.allBooks)
  }, [booksByGenre.data])

  if (!show) {
    return null
  }

  if (allBooks.loading) {
    return <div>loading...</div>
  }

  const genres = [
    ...new Set(allBooks.data.allBooks.flatMap((book) => book.genres)),
  ]

  const handleGenreSelect = (genre) => {
    setGenre(genre)
    getBooksbyGenre({ variables: { genre: genre } })
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        in genre <strong>{genre || 'all'}</strong>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => handleGenreSelect(genre)}>
          {genre}
        </button>
      ))}
      <br />
      <button onClick={() => handleGenreSelect('')}>all books</button>
    </div>
  )
}

export default Books
