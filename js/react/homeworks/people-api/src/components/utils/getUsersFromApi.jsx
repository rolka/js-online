export const getUsersFromApi = ( setIsLoadingFun, setPeopleFun, onFinally) =>
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
            // todo: work here

            setPeopleFun(result)
            // console.log(result);
        })
        .catch((error) => {
            console.error('Error fetching data', error)
        })
        .finally(() => {
            setIsLoadingFun(false);
            onFinally();
        })
}