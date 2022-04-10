import {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import AddPersonForm from "./components/AddPersonForm";
import Numbers from "./components/Numbers";
import numberService from "./services/numbers"
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [newSearch, setNewSearch] = useState("")
    const [notification, setNotification] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        numberService
            .getAll()
            .then(numbers => setPersons(numbers))
    }, [])

    const addPerson = (event) => {
        event.preventDefault()

        const personObj = {
            name: newName,
            number: newNumber
        }

        const names = persons.map(person => person.name)
        if (names.includes(personObj.name)) {
            if (window.confirm(`${personObj.name} already added to phonebook, replace the old number with a new one?`)) {
                const contact = persons.find(person => person.name === personObj.name)
                const changedContact = {...contact, number: personObj.number}
                numberService
                    .update(contact.id, changedContact)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id === contact.id ? returnedPerson : person))

                        setNotification(`Number for ${contact.name} was updated`)
                        setTimeout(() => {
                            setNotification(null)
                        }, 2000)
                    })
            }
        } else {
            numberService
                .create(personObj)
                .then(person => {
                    setPersons(persons.concat(person))
                })
        }

        setNewName("")
        setNewNumber("")
    }

    const deletePerson = (deletedPerson) => {
        if (window.confirm(`Delete ${deletedPerson.name}?`)) {
            numberService
                .deleteNumber(deletedPerson.id)
                .catch(() => {
                    setError(`Information of ${deletedPerson.name} has already been removed from the server`)
                    setTimeout(() => {
                        setError(null)
                    }, 2000)
                })

            setPersons(persons.filter(person => person.id !== deletedPerson.id))
        }
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

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification}/>
            <Error message={error}/>
            <Filter handler={handleSearch}/>

            <h2>Add new person</h2>
            <AddPersonForm addPerson={addPerson} handleAddName={handleAddName} handleAddNumber={handleAddNumber}
                           newName={newName} newNumber={newNumber}/>

            <h2>Numbers</h2>
            <Numbers persons={persons} search={newSearch} deletePerson={deletePerson}/>
        </div>
    )
}

export default App
