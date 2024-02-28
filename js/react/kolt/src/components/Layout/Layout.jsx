import { Top } from "../Top/Top.jsx";
import { Middle } from "../Middle/Middle.jsx";
import { Bottom } from "../Bottom/Bottom.jsx";
import { useState } from "react";

export const Layout = () =>
{
    const [ newScooter, setNewScooter ] =
        useState(null);

    return (
        // <div className="container mx-auto bg-indigo-500 min-h-[400px]">
        <div>
            <Top notifyScooterAddition={( scooter ) => {
                setNewScooter(scooter)
            }}/>
            <Middle newScooter={newScooter}/>
            <Bottom/>
        </div>
    )
}
