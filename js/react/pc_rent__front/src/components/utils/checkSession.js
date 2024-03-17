export const checkSession = async ( cb ) => {
    // console.log('checkSession() works');
    const promise = await fetch('pc_rent/api/user/check-session');
    const result = await promise.json();
    // const result = await promise;
    cb(result);
    // return result;
}