import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  if (!show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  const genre = user.data.me.favouriteGenre[0]

  const filteredBooks = books.data.allBooks.filter((book) =>
    genre ? book.genres.includes(genre) : book
  )

  return (
    <div>
      <h2>recommendations</h2>

      <div>
        books in your favourite genre <strong>{genre}</strong>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
