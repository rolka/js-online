import { Person } from "./Person.jsx";

export const PeopleList = ({ people }) =>
{
    // console.log(people);
    const uniqueKeys = new Set();
    const generateKey = (person, index) => {
        const name = person.id.name || '';
        const value = person.id.value || '';
        const key = `${name}${value}`;
        return key || index.toString();
    };
    return (
        <>
            { people.map((person, index) => {
                const key = generateKey(person, index);
                // console.log(key);
                if ( uniqueKeys.has(key) ) {
                    console.warn(`Duplicate key found: ${key}`);
                }
                uniqueKeys.add(key);
                return <Person
                    // key={person.id.name+person.id.value}
                    // key={index}
                    key={key}
                    person={person}/>
            }) }
        </>
    )
}