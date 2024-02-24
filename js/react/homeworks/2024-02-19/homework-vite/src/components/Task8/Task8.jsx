// Sukurti komponentą su dviem įvedimo laukeliais.
// Pradžioje viename laukelyje rodyti skaičių 100 kitame 50.
// Santykis tarp pirmo ir antro laukelio yra 2.
// Pakeitus skaičius viename kažkuriame laukelyje turi pasikeisti
// ir skaičius kitame laukelyje taip, kad santykis išliktų nepakitęs.

import { CustomHeading } from "../CustomHeading/index.jsx";
import { useState } from "react";

export const Task8 = () =>
{
    const [ numberOne, setNumberOne ] = useState(100);
    const [ numberTwo, setNumberTwo ] = useState(101);

    return (
        <div>
            <CustomHeading color='tomato'>
                <p>Task 8</p>
            </CustomHeading>

            <div className='my-10'>
                <div>
                    <span>Number one: </span>
                    <input type="number"
                           value={numberOne}
                           onChange={(e) =>
                           {
                               setNumberOne(e.target.value);
                               setNumberTwo(e.target.value * 2)
                           }}
                    />
                </div>
                <div>
                    <span>Number two: </span>
                    <input type="number"
                           value={numberTwo}
                           onChange={(e) =>
                           {
                               setNumberTwo(e.target.value)
                               setNumberOne(e.target.value / 2)
                           }}
                    />
                </div>
                <div>
                    <span>Number three, number 1 + number 2: </span>
                    <input type="number"
                           value={ +numberOne + +numberTwo}
                           onChange={(e) =>
                           { }}
                    />
                </div>
            </div>


        </div>
    )
}