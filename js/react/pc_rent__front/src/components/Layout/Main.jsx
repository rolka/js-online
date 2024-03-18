// import { Register } from "../Register.jsx";
// import { Login } from "../Login.jsx";
import { Link, useNavigate } from "react-router-dom";
import { AuthButtons } from "./AuthButtons.jsx";
import { SinglePc } from "../SinglePc/SinglePc.jsx";
import { useEffect, useState } from "react";
import { userLogout, sessionManager } from "../utils/sessionManager.js";

export const Main = () =>
{
    // const loggedIn = true;
    const loggedIn = false;
    const navigate = useNavigate();
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    useEffect(() =>
    {
        sessionManager((data) => {
            // setIsLoggedIn(data.isLoggedIn)
            console.log( `Uer is logged in: ${data.isLoggedIn}` )
            if ( data.isLoggedIn )
            {
                navigate('/')
            }
            else
            {
                console.log( `Uer is logged in(false): ${data.isLoggedIn}` )
            }
        })
    }, [navigate]);

    const logoutHandler = () => {
        userLogout((data) => {
            if ( data.success )
            {
                setIsLoggedIn(false);
            }
            console.log(data);
            alert('Logged out!')
        })
    }

    return (
        <>
            <div className="container mx-auto">
                <p>Page layout</p>
                { ! loggedIn && <AuthButtons/>}
                {/*{loggedIn && (*/}
                { (
                    <div className='flex items-center justify-between my-5'>
                        <Link to='add-new-pc' className='inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Add new PC</Link>
                        <Link className='inline-block text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                              onClick={logoutHandler}
                        >Logout</Link>
                    </div>

                )}
                {/*{ loggedIn ? <Register/> : <Login/> }*/}

                <div className='grid grid-cols-3 gap-4'>
                    <SinglePc/>
                    <SinglePc/>
                    <SinglePc/>
                    <SinglePc/>
                </div>


            </div>
        </>
    )
}
