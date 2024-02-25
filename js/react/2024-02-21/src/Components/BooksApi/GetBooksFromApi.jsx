export const GetBooksFromApi = () =>
{
    const fetchData = async () => {
        try {
            const response = await fetch('https://in3.dev/knygos/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            return {
                response: 'error',
                message: error
            }
        }
    };

    return fetchData();

}