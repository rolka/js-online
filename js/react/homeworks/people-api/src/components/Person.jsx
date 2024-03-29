export const Person = ( { person } ) =>
{
    const addFields = ( ...params ) => {
      return params.join(' ');
    }

    return (
        <>
            <div
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg w-full"
                         src={person.picture.large}
                         alt={addFields(person.name.title, person.name.first, person.name.last)}/>
                </a>
                <div className="p-5">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Name: {addFields(person.name.title, person.name.first, person.name.last)}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Gender: {person.gender}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-all">
                        Email: {person.email}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Phone: {person.phone}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Country: {person.location.country}
                    </p>
                </div>
            </div>
        </>
    )
}