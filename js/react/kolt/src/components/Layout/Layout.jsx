import { Top } from "../Top/Top.jsx";
import { Middle } from "../Middle/Middle.jsx";
import { Bottom } from "../Bottom/Bottom.jsx";
import React from "react";

export const Layout = () =>
{
    return (
        // <div className="container mx-auto bg-indigo-500 min-h-[400px]">
        <div>
            <Top/>
            <Middle/>
            <Bottom/>
        </div>
    )
}