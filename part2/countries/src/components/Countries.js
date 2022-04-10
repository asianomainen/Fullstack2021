import OneCountry from "./OneCountry";
import CountryList from "./CountryList";

const Countries = ({names, one, search, setSearch}) => {
    if (search.length === 0) {
        return (
            <>
                <p>Search for countries</p>
            </>
        )
    }
    if (names.length > 10) {
        return (
            <>
                <p>Too many matches, specify another filter</p>
            </>
        )
    } else if (names.length > 1 && names.length <= 10) {
        return (
            <CountryList names={names} setSearch={setSearch}/>
        )
    } else if (names.length === 1) {
        return (
            <OneCountry country={one}/>
        )
    } else {
        return (
            <>
                <p>No matches</p>
            </>
        )
    }
}

export default Countries