import { Link } from "react-router-dom";
export const AuthButtons = () =>
{
    return (
        <>
            <Link to="/" className='block'>Main</Link>
            <Link to="/login" className='block'>Login</Link>
            <Link to='register' className='block'>Register</Link>
        </>
    )
}