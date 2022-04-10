import Person from "./Person";

const Numbers = ({persons, search, deletePerson}) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    return (
        <ul>
            {personsToShow.map((person, i) =>
                <Person key={i} person={person} deletePerson={deletePerson}/>
            )}
        </ul>
    )
}

export default Numbers