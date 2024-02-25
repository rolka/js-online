import { useEffect, useState } from "react";

export const FormWithUseState = () =>
{
    // const [ user, setUser ] = useState({
    //     name: '',
    //     surname: '',
    //     email: '',
    //     password: '',
    // })

    const userObject = {
        name: '',
        surname: '',
        email: '',
        password: '',
    }

    const [ user, setUser ] = useState(() => {
        const users = JSON.parse(localStorage.getItem('exampleUser'));
        return users || userObject;
    });

    useEffect(() =>
    {
        // console.log(user);
        localStorage.setItem( 'exampleUser', JSON.stringify(user) )
    }, [user]);

    return (
        <>
            <form action="">
                <input type="text"
                       placeholder='Name'
                       value={user.name}
                       onChange={(event) => {
                           setUser( {...user, name: event.target.value} )
                       }}
                />

                <input type="text"
                       placeholder='Surname'
                       value={user.surname}
                       onChange={(event) => {
                           setUser( {...user, surname: event.target.value} )
                       }}
                />
                <input type="text"
                       placeholder='Email'
                       value={user.email}
                       onChange={(event) => {
                           setUser( {...user, email: event.target.value} )
                       }}
                />
                <input type="text"
                       placeholder='Password'
                       value={user.password}
                       onChange={(event) => {
                           setUser( {...user, password: event.target.value} )
                       }}
                />

            </form>
            
        </>
    )
}