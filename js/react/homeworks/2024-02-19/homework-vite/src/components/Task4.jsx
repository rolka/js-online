// Sukurti komponentą, kuris gauna du props.
// Vienas props bet koks tekstas,
// kuris komponente atvaizduojamas h1 tage,
// o antras bet koks tekstas kuris atvaizduojamas h2 tage.

import { HeadingText } from "./Heading.jsx";

export const Task4 = ( { children } ) =>
{
    const styles = {
        backgroundColor: 'tomato',
        padding: '1rem 1rem',
        fontSize: '2rem'
    }
    return (
        <>
            <HeadingText headingText={children}/>
            <div className="child" style={styles}>
                <p style={{ margin: 0 }}>{children}</p>
            </div>
            <hr/>
        </>
    )
}