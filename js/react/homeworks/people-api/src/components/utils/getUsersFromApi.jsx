export const getUsersFromApi = (callback) =>
{
    fetch('https://randomuser.me/api/?results=10')
        .then((response) => {
            if ( ! response.ok )
            {
                throw new Error('Network problem')
            }
            return response.json();
        })
        .then(( result ) => {
            // setPeople(result);
            console.log(result);
        })
        .catch((error) => {
            console.error('Error fetching data', error)
        })
        .finally(() => {
            // setIsLoading(false);
            // setIsLoading(true);
            // console.log(people)
        })


}