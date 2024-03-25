import { useEffect, useState } from "react";
import { getPcById } from "./utils/pcService.js";
import { useParams } from "react-router-dom";
export const SinglePcPage = () =>
{
    const { id } = useParams();
    const [pc, setPc] = useState({});
    useEffect(() =>
    {
        getPcById(id, ( data ) =>
        {
            if ( data.success )
            {
                // console.log(data);
                console.log('setting PC data');
                console.log(data.pcFound);
                // setPc(data.pcFound);
                setPc(data.pcFound);
            }
            // console.log(pc);
        })
    }, [] );

    /*
    * todo: add owner name by owner_id from db
    * */
    return (
        <>
            { console.log( 'from return: ' + pc.cpu ) }
            { console.log( 'from return: ' + pc ) }
            { console.log( pc ) }
            {/*{ pc.length === 0  && 'PC not found'}*/}
            { Object.keys(pc).length === 0  && 'PC not found'}
            {
                // pc.length > 0 && (
                Object.keys(pc).length > 0 && (
                    <div className="container mx-auto">
                        <div
                            className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                            <img className="rounded-t-lg w-full"
                                 src='https://www.slashgear.com/img/gallery/how-to-safely-clean-the-inside-of-your-computer/l-intro-1648822276.jpg'
                                 alt=''/>
                            <div className="p-5">
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    Owner: <b>{'add owner name here!!!'}</b>
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    PC name: <b>{pc.pcName}</b>
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    PC type: <b>{pc.pcType}</b>
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    CPU: <b>{pc.cpu}</b>
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    GPU: <b>{pc.gpu}</b></p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-all">
                                    RAM type: <b>{pc.ramType}</b>
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    RAM speed: <b>{pc.ramSpeed}</b>
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    RAM amount: <b>{pc.ramAmount}GB</b>
                                </p>
                            </div>

                        </div>
                    </div>
                )
            }

        </>
    )
}