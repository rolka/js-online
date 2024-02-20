import { useState } from "react";

const PasswordCheck = () =>
{
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const checkData = ( event ) =>
    {
        const pass = event.target.value;
        setPassword( pass );
        checkPassword(pass);
    }
    const checkPassword = ( password ) =>
    {
        if ( password.length < 8  )
        {
            setError(`Password is too short. Password is ${password.length} long!`);
        }
        else
        {
            setError('');
        }
    }
    
    return (
        <div>
            <h1>Password check</h1>
            <p>{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
            <p>Password is: {password}</p>

            <input type="password"
                   {...( error && { className: 'error-active' } )}
                   className={error && 'error-active'}
                   placeholder="Password here"
                   onChange={checkData}
            />
            {error && <span className="error-box">{error}</span>}
        </div>
    )
}

export default PasswordCheck;