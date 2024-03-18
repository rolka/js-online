export const sessionManager = async ( cb ) => {
    // console.log('sessionManager() works');
    const promise = await fetch('pc_rent/api/user/check-session');
    const result = await promise.json();
    // const result = await promise;
    cb(result);
    // return result;
}

export const userLogout = async ( cb ) =>
{
    const promise = await fetch('pc_rent/api/user/logout');
    const result = await promise.json();
    cb(result);
}