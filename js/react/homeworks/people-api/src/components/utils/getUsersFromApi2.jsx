export const getUsersFromApi2 = async () =>
{
    const response =
        await fetch('https://randomuser.me/api/?results=100');
    if ( ! response.ok )
    {
        throw new Error('Network error');
    }
    return response.json();

}