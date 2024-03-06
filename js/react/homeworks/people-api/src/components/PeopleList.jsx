import { Person } from "./Person.jsx";

export const PeopleList = ({ people }) =>
{
    console.log(people);

    return (
        <>
            { people.results.map((person, index) => {
                return <Person
                    // key={person.id.value || '5' + person.id.name || '7'}
                    key={index}
                    person={person}/>
            }) }
        </>
    )
}