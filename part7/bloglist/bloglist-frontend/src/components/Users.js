import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </th>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
