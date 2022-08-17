import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === '') {
    return null
  }

  if (notification.type === 'alert') {
    return (
      <div className="alert alert-danger" role="alert">
        {notification.message}
      </div>
    )
  }

  return (
    <div className="alert alert-success" role="alert">
      {notification.message}
    </div>
  )
}

export default Notification
