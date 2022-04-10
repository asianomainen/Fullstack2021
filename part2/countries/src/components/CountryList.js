const CountryList = ({names, setSearch}) => {
    return (
        <>
            {names.map(country =>
                <p key={country}>
                    {country}
                    <button onClick={() => setSearch(country)}>show</button>
                </p>)}
        </>
    )
}

export default CountryList