import { useState } from "react";
import { Timer } from "../Timer/Timer.jsx";
import { GiSandsOfTime } from "react-icons/gi";
import { PiTimerLight } from "react-icons/pi";

export const TimerWrap = () =>
{
    const classes = [ 'flex items-center justify-center h-screen' ];

    const [ displayTimer, setDisplayTimer ] = useState({
        activeTab: 'timer'
    });

    return (
        <div className={classes}>
            <div className='w-5/6 uppercase border border-gray-600 bg-stone-800 text-white'>
                <div className='tabs flex text-xs'>
                    <div
                        className={`${
                            displayTimer.activeTab === 'timer' ? 'active text-blue-400 border-b border-blue-400' : ''
                        } basis-[50%] text-center py-3 border-b border-gray-600`}
                        onClick={(e) =>
                        {
                            setDisplayTimer({ activeTab: 'timer' });
                        }}>
                        <div className='flex items-center justify-center' style={{ cursor: 'pointer' }}>
                            <GiSandsOfTime className='text-lg pr-1' />
                            <h1>Timer</h1>
                        </div>
                    </div>
                    <div
                        className={`${displayTimer.activeTab === 'stopWatch' ? 'active text-blue-400 border-b border-blue-400' : ''} basis-[50%] text-center py-3 border-b border-gray-600`}
                        onClick={() =>
                        {
                            setDisplayTimer({ activeTab: 'stopWatch' });
                        }}>
                        <div className='flex items-center justify-center' style={{ cursor: 'pointer' }}>
                            <PiTimerLight className='text-lg pr-1'/>
                            <h1>Stopwatch</h1>
                        </div>
                    </div>
                </div>
                <div className='body-wrap'>
                    <div className={`body`}>
                        <div
                            className={displayTimer.activeTab === 'timer' ? 'active' : 'hidden'}>
                            <div className='flex flex-col items-center justify-center h-full min-h-[200px]'>
                                <Timer/>
                            </div>
                        </div>
                        <div
                            className={displayTimer.activeTab === 'stopWatch' ? 'active' : 'hidden'}
                        >
                            <div className='flex flex-col items-center justify-center h-full min-h-[200px]'>
                                <p>Stopwatch body</p>
                            </div>
                        </div>
                    </div>
                    <div className='footer border-t border-gray-600 py-5 px-3'>
                        <p>Footer</p>
                    </div>
                </div>
            </div>
        </div>
    )
}