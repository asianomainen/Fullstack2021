const Filter = ({handler}) => {
    return <>
        Search for person by name: <input onChange={handler}/>
    </>
}

export default Filter