import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { loginService } from "./utils/loginService.js";
export const Login = () =>
{
    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState('');
    // 1
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    // 2
    const loginDetailsRef = useRef({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
    const login = async () => {
        const loginDetailsObj = {
            // username: usernameInputRef.current.value,
            username: loginDetailsRef.current.username,
            // password: passwordInputRef.current.value,
            password: loginDetailsRef.current.password
        }
        loginService( loginDetailsObj, ( data ) => {
            setErrorMessage(data)
            console.log(data);
            if ( data.success )
            {
                navigate('/');
            }
        });

        // console.log(loginDetailsObj);
    }
    return (
        <div className='container mx-auto'>
            <h1 className='text-center my-5 text-2xl'>Login</h1>
            <p className='mb-5'>
                <Link to='/register' className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Register</Link>
            </p>

            { errorMessage && (
                <p className='text-red-500 font-bold text-center mb-5'>{errorMessage.message}</p>
            )}
            <form className="border-2 border-gray-100 shadow-gray-300 p-5">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_username" id="floating_username"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           // ref={usernameInputRef}
                        // value={userDetails.username}
                           onChange={(event) =>
                           {
                               loginDetailsRef.current.username = event.target.value;
                               // onFieldChange(e, 'username')
                           }}/>
                    <label htmlFor="floating_username"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="floating_password" id="floating_password"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           autoComplete={"on"}
                           ref={passwordInputRef}
                        // value={userDetails.password}
                           onChange={(event) =>
                           {
                               loginDetailsRef.current.password = event.target.value
                               // onFieldChange(e, 'password')
                           }}
                    />
                    <label htmlFor="floating_password"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
                onClick={login}>Submit
                </button>
            </form>

        </div>
    )
}