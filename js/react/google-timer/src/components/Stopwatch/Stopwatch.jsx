import { useEffect, useState } from "react";

export const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTime(prevTime => prevTime + 10);
        }, 10);

        return () => clearInterval(interval);
    }, [isRunning]);

    const toggleRunning = () => setIsRunning(!isRunning);
    const reset = () => setTime(0) || setIsRunning(false);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60; // Reset seconds after 59
        const millisecondsPart = milliseconds % 1000;

        const formattedMinutes = minutes > 0 ? `${String(minutes).padStart(2, '0')}` : '';
        const formattedSeconds = totalSeconds < 10 ? `${seconds}` : String(seconds);
        const formattedMilliseconds = String(Math.floor(millisecondsPart / 10)).padStart(2, '0');

        return (
            <>
                {formattedMinutes && (
                    <>
                        <span className='text-6xl'>{formattedMinutes}</span>
                        <span className='text-4xl'>m </span>
                    </>
                )}
                <span className='text-6xl'>{formattedSeconds}</span>s{' '}
                <span className='text-3xl'>{formattedMilliseconds}</span>
            </>
        );
    };

    return (
        <div>
            <div className="flex items-center justify-start min-h-[200px]">
                <p className='pl-5 text-[#e8eaed] font-[400] cursor-pointer' onClick={toggleRunning}>
                    {formatTime(time)}
                </p>
            </div>
            <div className="flex items-start w-full pl-5 border-t border-gray-600 py-5 px-3">
                <button
                    type="button"
                    className="min-w-[70px] uppercase bg-[#8ab4f8] text-[11px] rounded-[2px] px-[15px] py-[6px] mr-2 hover:bg-[#1B66C9] hover:border-[#1B66C9] text-[#202124] ease-in-out duration-200"
                    onClick={toggleRunning}>
                    {isRunning ? 'Stop' : 'Start'}
                </button>
                <button
                    type="button"
                    className="min-w-[70px] p-2 bg-[#bdc1c6] text-[11px] rounded-[2px] px-[15px] py-[6px] text-[#202124] hover:bg-[#7c7e7f] duration-200"
                    onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
    );
};
