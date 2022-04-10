const OneCountry = ({country}) => {
    return (
        <>
            <h2>{country.name.common}</h2>
            capital {country.capital[0]}<br/>
            area {country.area}<br/>
            <p><strong>languages:</strong></p>
            <ul>
                {Object.values(country.languages).map((language, i) =>
                    <li key={i}>{language}</li>
                )}
            </ul>
            <img src={`${country.flags.png}`} alt={"Country flag"}/>
        </>
    )
}

export default OneCountry