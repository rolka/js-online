import { useEffect, useState } from "react";
import { formatB } from "../utils/formatB.jsx";
import { formatA } from "../utils/formatA.jsx";
export const Timer = () => {
    const defaultTime = 20;
    const [time, setTime] = useState(defaultTime);
    const [isTimerOn, setTimerOn] = useState(false);
    const [inputTime, setInputTime] = useState('');

    useEffect(() => {
        // alert(passTimerTime);
        let intervalId;

        if (isTimerOn) {
            intervalId = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime - 1;

                    if (newTime === 0) {
                        setTimerOn(false); // Stop the timer when it reaches 0
                        clearInterval(intervalId); // Clear the interval
                    }

                    return newTime;
                });
            }, 1000);
        }

        return () => {
            clearInterval(intervalId); // Cleanup: clear the interval on component unmount
        };
    }, [isTimerOn]);

    const handlePauseToggle = () => {
        console.log( `input time is: ` + {inputTime} );
        console.log( {inputTime} );
        // setTime(inputTime);

        setTimerOn((prev) => !prev); // Toggle the timer state
    };

    const handleReset = () => {
        // setTime(defaultTime);
        setTime(inputTime);
        setTimerOn(false); // Set isTimerOn to false on reset
    };

    //
    const [value, setValue] = useState('000000');
    const [value2, setValue2] = useState('');
    const [showFormatB, setShowFormatB] = useState(false);
    const handleChange = (event) => {
        // console.log(value);
        if ( /\d/.test(value) )
        {
            setValue(`${value.slice(1)}${event.target.value}`);
        }
    };

    const onBlur = () => {
        setShowFormatB(true);
        console.log('NO focus');
    }
    const onFocus = () => {
        setShowFormatB(false);
        console.log('focus');
    }
    
    return (
        <>
            <div className='relative mb-5'>
                <div>
                    { showFormatB ? formatB(value) : formatA(value) }
                </div>
                <input type="text"
                       value={value2}
                       maxLength="6"
                       onBlur={onBlur}
                       onFocus={onFocus}
                       onChange={handleChange}
                       style={{ background: 'rgba(255, 255, 255, 0.5)' }}
                       className='absolute top-0 right-0 bottom-0 left-0 bg-transparent'
                />
            </div>

            <p>{time}</p>
            <div className='text-xs'>
                <button
                    className='bg-blue-400 text-white px-7 py-2 mr-2 uppercase hover:bg-blue-500 transition ease-in-out duration-300'
                    onClick={handlePauseToggle}
                >
                    {isTimerOn ? "Pause" : "Start"}
                </button>
                <button
                    className='bg-gray-500 text-white px-3 py-2 uppercase hover:bg-gray-600 transition ease-in-out duration-300'
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>
        </>
    );
};
