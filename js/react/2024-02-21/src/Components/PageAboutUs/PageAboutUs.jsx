import { Link } from "react-router-dom";

export const PageAboutUs = () =>
{
    return (
        <>
            <p>About us page</p>
            <Link to='/' className='bg-indigo-500 text-white px-4 py-3 inline-block'>Back Home</Link>
        </>
    )
}