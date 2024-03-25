import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { sessionManager } from "../utils/sessionManager.js";

export const LoggedIn = ({ children }) =>
{
    const navigate = useNavigate();
    useEffect(() =>
    {
        sessionManager((response) => {
            if ( ! response.isLoggedIn )
            {
                console.log(response)
                navigate('/login');
            }
        })
    }, [navigate]);

    return (
        <>
            {children}
        </>
    )
}