const validate = ( user ) =>
{
    /*
    * would be nice to sync requirements from user model
    * */
    const minLength = 5;
    const maxLength = 20;
    if ( user.username.length < minLength )
    {
        return {
            success: false,
            message: `Username must be more than ${minLength} characters long!`
        };
    }
    else if ( user.username.length > maxLength )
    {
        return {
            success: false,
            message: `Username must be more than ${maxLength} characters long!`
        };
    }
    return {
        success: true,
        message: `Username validated`
    };
}
module.exports = validate;
