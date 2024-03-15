import { Register } from "../Register.jsx";
import { Login } from "../Login.jsx";
import { Link } from "react-router-dom";
import { AuthButtons } from "./AuthButtons.jsx";
import { SinglePc } from "../SinglePc/SinglePc.jsx";

export const Main = () =>
{
    const loggedIn = true;
    // const loggedIn = false;
    return (
        <>
            <div className="container mx-auto">
                <p>Page layout</p>
                { ! loggedIn && <AuthButtons/> }
                { loggedIn && ( <Link to='add-new-pc'>Add new PC</Link> ) }

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
