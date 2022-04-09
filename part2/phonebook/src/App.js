import {useState} from 'react'
import Person from "./components/Person";
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
    const [newSearch, setNewSearch] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        const personObj = {
            name: newName,
            number: newNumber
        }

        const names = persons.map(person => person.name)
        if (names.includes(personObj.name)) {
            window.alert(`${personObj.name} already added to phonebook`)
            setNewName("")
            setNewNumber("")
            return
        }

        setPersons(persons.concat(personObj))
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
            <Filter handler={handleSearch} />

            <h2>Add new person</h2>
            <AddPersonForm addPerson={addPerson} handleAddName={handleAddName} handleAddNumber={handleAddNumber} newName={newName} newNumber={newNumber}/>

            <h2>Numbers</h2>
            <Numbers personsToShow={personsToShow}/>
        </div>
    )
}

export default App

/*
import Note from './components/Note'
import {useState} from "react";

const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState("Type your note here!")
    const [showAll, setShowAll] = useState(true)

    const addNote = (event) => {
        event.preventDefault()
        const noteObj = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1
        }

        setNotes(notes.concat(noteObj))
        setNewNote("")
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all' }
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type={"submit"}>Save</button>
            </form>
        </div>
    )
}

export default App*/
