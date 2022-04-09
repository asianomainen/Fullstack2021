import Person from "./Person";

const Numbers = ({personsToShow}) => {
    return (
        <ul>
            {personsToShow.map((person, i) =>
                <Person key={i} person={person}/>
            )}
        </ul>
    )
}

export default Numbers