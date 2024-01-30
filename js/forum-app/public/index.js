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

    const promise = await fetch('http://localhost:3003/api/user/register', {
        method: 'post',
        body: data
    });
    const response = await promise.json();
    console.log(response);

}










