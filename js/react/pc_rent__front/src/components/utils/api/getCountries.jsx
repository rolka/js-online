export const getCountries = async ( callb = (a) => { a } ) => {
    try {
        // Fetch the countries from the API endpoint
        const response =
            await fetch('http://localhost:3000/api/country');
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            // Throw an error if the server response wasn't ok
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Convert the response payload to JSON
        const data = await response.json();

        // Process the data
        // console.log(data);

        callb(data);

        // Return the data for further processing if needed
        // return data;
    } catch (error) {
        // Log or handle errors here
        console.error("Failed to fetch countries:", error);
    }
};
