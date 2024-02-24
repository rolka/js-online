import { useEffect, useState } from "react";

/*
* useEffect can be used to:
* 1. get data from API
* 2. add event listeners to the document
* */
export const UsingEffect = () =>
{
    useEffect(() => {
        console.log('from useEffect');
        document.addEventListener('scroll', () => {
            console.log('scrolled');
        })
    })
    console.log('just a long');
    const [ count, setCount ] = useState(0);
    return (
        <div>
            <button
                type="button"
                onClick={() => setCount(count+1)}>
                Value is {count}</button>
        </div>
    )
}