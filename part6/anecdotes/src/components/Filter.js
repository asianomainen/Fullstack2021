import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {

  const handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    props.setFilter(filter)
  }

  const style = {
    marginBottom: 10,
    marginTop: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = { setFilter }

const connectedFilter = connect(null, mapDispatchToProps)(Filter)

export default connectedFilter