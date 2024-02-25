import { useEffect, useState } from "react";

export const UsingState = () =>
{
    const [ number, setNumber ] = useState(0);
    const [ message, setMessage ] = useState('');
    const [ inputValue, setInputValue ] = useState('');

    useEffect(() => {
        console.log('useEffect ran');
    });
    console.log('simple log ran');

    useEffect(() =>
    {
        setMessage(`Number updated. It is ${number}`)
    }, [number]);

    useEffect(() =>
    {
        setNumber(number + 1);
    }, [inputValue]);

    const increaseTheNum = () =>
    {
        setNumber(number + 1)
    }

    return (
        <>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value)
                }}
            />
            <p>{message}</p>
            <button
                className='bg-amber-600'
                type="button"
                onClick={increaseTheNum}
            >
                Count is {number}</button>
        </>
    )
}