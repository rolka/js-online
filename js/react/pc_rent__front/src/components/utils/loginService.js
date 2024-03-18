export const loginService = async ( loginDetails, callbackFunction ) =>
// export const loginService = async ( { username, password } ) =>
{
    // console.log(loginDetails)
    // console.log( [ username, password ] )
    // console.log(username)
    // console.log(password)

    const promise = await fetch('pc_rent/api/user/login', {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(loginDetails)

    });
    const result = await promise.json();
    console.log(result);
    callbackFunction(result)
    // return result;
    // cb(result);

}