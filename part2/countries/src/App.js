import {useEffect, useState} from 'react'
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";


const App = () => {
    const [countries, setCountries] = useState([])
    const [newSearch, setNewSearch] = useState("")

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleSearch = (event) => {
        setNewSearch(event.target.value)
    }

    const countryNames = countries.map(country => country.name.common.toString())
        .filter(name => name.toLowerCase()
            .includes(newSearch.toLowerCase()))

    const oneResult = countries.filter(country => country.name.common.toString().toLowerCase()
        .includes(newSearch.toLowerCase()))[0]

    return (
        <div>
            <Search handler={handleSearch} />
            <Countries names={countryNames} one={oneResult} search={newSearch} setSearch={setNewSearch}/>
        </div>
    )
}

export default App
