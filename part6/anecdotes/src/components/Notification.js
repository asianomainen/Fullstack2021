import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    display: notification === '' ? 'none' : '',
    border: notification === '' ? null : 'solid',
    padding: 10,
    borderWidth: notification === '' ? null : 1,
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification