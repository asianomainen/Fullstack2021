const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    const updateStyle = {
        color: "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
    }

    return (
        <div style={updateStyle}>
            {message}
        </div>
    )
}

export default Notification