import { useEffect, useState } from "react";
import { getPcsByOwner } from "../utils/pcService.js";
import { SinglePc } from "../SinglePc/SinglePc.jsx";

export const MyComputers = () =>
{
    const [userPcs, setUserPcs] = useState();
    useEffect(() =>
    {
        /*
        * todo: getPcsByOwner -> Promise returned from getPcsByOwner is ignored
        * */
        getPcsByOwner(( response ) => {
            console.log(response);
            if ( response.success )
            {
                setUserPcs(response.rows);
            }
        })
    }, []);

    return (
        <>
            <div className="container mx-auto">
                <div className='grid grid-cols-3 gap-4'>
                    {
                        userPcs.map((pc) => (
                            <SinglePc pc={pc} key={pc.id}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}