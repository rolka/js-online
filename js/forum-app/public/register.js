console.log('public works');

const usernameInput = document.getElementById('username');
const dateOfBirthInput = document.getElementById('dateOfBirth');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const profilePhotoInput = document.getElementById('profilePhoto');
const registerButton = document.getElementById('register');

registerButton.onclick = async (  ) =>
{
    // event.preventDefault();
    const data = new FormData();
    data.append('username', usernameInput.value);
    data.append('birthDate', dateOfBirthInput.value);
    data.append('password', passwordInput.value);
    data.append('email', emailInput.value);
    data.append('img', profilePhotoInput.files[0]);

    // console.log(profilePhotoInput.files[0]);
    // console.log(data);

    // const promise = await fetch('http://localhost:3003/api/user/register', {
    //     method: 'post',
    //     body: data
    // });
    // const response = await promise.json();
    // console.log(response);

    let responseData;

    try {
        const response = await fetch('http://localhost:3003/api/user/register', {
            method: 'post',
            body: data
        });

        if (!response.ok) {
            // Handle non-successful response, e.g., throw an error
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Use a different method to handle the response data, based on the expected format
        responseData = await handleResponse(response);
        // Process responseData as needed
        console.log(responseData);
    } catch (error) {
        // Handle errors, including logging response data if available
        console.error('Error:', error.message);
        if (responseData) {
            console.error('Response Data:', responseData);
        }
    }

    // Separate function to handle response data based on the expected format
    async function handleResponse(response) {
        // Use the appropriate method to extract and return the response data
        // For example, if the response is JSON:
        return await response.json();
        // Or if the response is text:
        // return await response.text();
    }




}










