import { useRef, useState } from "react";

export const Timer = () => {
    const [inputTime, setInputTime] = useState("00:05:00");
    const [remainingTime, setRemainingTime] = useState(300);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    const calculateTotalSeconds = (timeString) => {
        const [hours, minutes, seconds] = timeString.split(":").map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const startTimer = () => {
        if (!isRunning) {
            setRemainingTime(calculateTotalSeconds(inputTime));
            setIsRunning(true);
            timerRef.current = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime === 0) {
                        stopTimer();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            stopTimer();
            setInputTime(formatTime(remainingTime));
        }
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
    };

    const resetTimer = () => {
        stopTimer();
        setInputTime("00:05:00");
        setRemainingTime(300);
    };

    return (
        <>
            <div className="flex items-center justify-around flex-col min-h-[200px]">
                <div>
                    {! isRunning ? (
                        <input
                            className="bg-transparent border-none outline-none focus:ring-0 text-[#5f6368] text-6xl font-[400] text-center"
                            value={inputTime}
                            type="time"
                            step={1}
                            onChange={(e) =>
                            {
                                setInputTime(e.target.value);
                            }}
                        />
                    ) : (
                        <p className="text-[#e8eaed] text-6xl font-[400]">{formatTime(remainingTime)}</p>
                    )}
                </div>
            </div>
            <div className="flex items-start w-full pl-5 border-t border-gray-600 py-5 px-3">
                <button
                    className="min-w-[70px] uppercase bg-[#8ab4f8] text-[11px] rounded-[2px] px-[15px] py-[6px] mr-2 hover:bg-[#1B66C9] hover:border-[#1B66C9] text-[#202124] ease-in-out duration-200"
                    onClick={startTimer}>
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button
                    className="min-w-[70px] p-2 bg-[#bdc1c6] text-[11px] rounded-[2px] px-[15px] py-[6px] text-[#202124] hover:bg-[#7c7e7f] duration-200"
                    onClick={resetTimer}>
                    Reset
                </button>
            </div>
        </>
    );

};
