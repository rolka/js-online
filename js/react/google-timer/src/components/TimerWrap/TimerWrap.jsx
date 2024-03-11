import { useState } from "react";
import { GiSandsOfTime } from "react-icons/gi";
import { PiTimerLight } from "react-icons/pi";
import { Timer } from "../Timer/Timer.jsx";
import { Stopwatch } from "../Stopwatch/Stopwatch.jsx";

export const TimerWrap = () =>
{
    const [ displayTimer, setDisplayTimer ] = useState({
        activeTab: 'timer'
    });

    return (
        <div className={'flex items-center justify-center h-screen container mx-auto max-w-[60%]'}>
            <div className='w-5/6 uppercase border border-gray-600 bg-stone-800 text-white'>
                <div className='tabs flex text-xs font-[400]'>
                    <div
                        className={`${
                            displayTimer.activeTab === 'timer' 
                                ? 'active text-[#8ab4f8] border-b border-[#8ab4f8]' 
                                : 'border-b border-gray-600 text-[#80868b] hover:text-[#fff]'
                        } basis-[50%] text-center py-3`}
                        onClick={() => {
                            setDisplayTimer({ activeTab: 'timer' });
                        }}>
                        <div className='flex items-center justify-center cursor-pointer'>
                            <GiSandsOfTime className='text-lg pr-1' />
                            <h1>Timer</h1>
                        </div>
                    </div>
                    <div className={`${displayTimer.activeTab === 'stopWatch' 
                            ? 'active text-[#8ab4f8] border-b border-[#8ab4f8]' 
                            : 'border-b border-gray-600 text-[#80868b] hover:text-[#fff]'
                        } basis-[50%] text-center py-3 `}
                        onClick={() => {
                            setDisplayTimer({ activeTab: 'stopWatch' });
                        }}>
                        <div className='flex items-center justify-center cursor-pointer'>
                            <PiTimerLight className='text-lg pr-1'/>
                            <h1>Stopwatch</h1>
                        </div>
                    </div>
                </div>
                <div className='body-wrap'>
                    <div className={`body`}>
                        <div className={displayTimer.activeTab === 'timer' ? 'active' : 'hidden'}>
                            <div className='flex flex-col items-center justify-center h-full min-h-[200px]'>
                                <Timer/>
                            </div>
                        </div>
                        <div className={displayTimer.activeTab === 'stopWatch' ? 'active' : 'hidden'}>
                            <div className='h-full min-h-[200px]'>
                                <Stopwatch/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}