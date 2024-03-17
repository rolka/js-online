export const registerUser = async ( registrationData ) =>
{
    const promise = await fetch('pc_rent/api/user/register', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(registrationData)
    });
    const result = await promise.json();
    console.log(result);
    return result;
}
