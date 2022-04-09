import {useState} from 'react'
import Filter from "./components/Filter";
import AddPersonForm from "./components/AddPersonForm";
import Numbers from "./components/Numbers";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [newSearch, setNewSearch] = useState("")

    const addPerson = (event) => {
        event.preventDefault()

        const personObj = {
            name: newName,
            number: newNumber
        }

        const names = persons.map(person => person.name)
        if (names.includes(personObj.name)) {
            window.alert(`${personObj.name} already added to phonebook`)
        } else {
            setPersons(persons.concat(personObj))
        }

        setNewName("")
        setNewNumber("")
    }

    const handleAddName = (event) => {
        setNewName(event.target.value)
    }

    const handleAddNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearch = (event) => {
        setNewSearch(event.target.value)
    }

    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handler={handleSearch}/>

            <h2>Add new person</h2>
            <AddPersonForm addPerson={addPerson} handleAddName={handleAddName} handleAddNumber={handleAddNumber}
                           newName={newName} newNumber={newNumber}/>

            <h2>Numbers</h2>
            <Numbers personsToShow={personsToShow}/>
        </div>
    )
}

export default App
