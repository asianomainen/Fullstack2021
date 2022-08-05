import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    display: props.notification === '' ? 'none' : '',
    border: props.notification === '' ? null : 'solid',
    padding: props.notification === '' ? null : 10,
    borderWidth: props.notification === '' ? null : 1,
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { notification: state.notification }
}

const connectedNotifications = connect(mapStateToProps)(Notification)

export default connectedNotifications