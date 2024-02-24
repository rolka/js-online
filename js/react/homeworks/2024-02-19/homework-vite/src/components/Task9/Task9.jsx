// Sukurti komponentą su trim select pasirinkimais ir teksto įvedimo laukeliu.
// Įvedamas tekstas turi būti atvaizduojamas atskirai komponento apačioje.
// Select pasirinkimai sudaryti iš 5 skirtingų spalvų,
// 5 skirtingų fontų dydžių ir 5 skirtingų fontų (Arial, Times new Roman ar panašiai)
// Select pasirinkimų nustatymai turi keisti atvaizduojamo teksto išvaizdą.

import { CustomHeading } from "../CustomHeading/index.jsx";
import { useState } from "react";
import { ColorOptions } from "./ColorOptions.jsx";
import { FontOptions } from "./FontOptions.jsx";
import { FontSizeOptions } from "./FontSizeOptions.jsx";

export const Task9 = () =>
{
    const [ text, setText ] = useState('Enter your text');
    const [ color, setColor ] = useState('');
    const [ font, setFont ] = useState('');
    const [ fontSize, setFontSize ] = useState('');
    const styles = {
        color: color,
        fontFamily: font,
        fontSize: fontSize+'px',
    }
    return (
        <>
            <CustomHeading color='salmon'>
                Task 9
            </CustomHeading>

            <input type="text"
                   value={text}
                   onChange={ (event) => {
                       setText(event.target.value)
                   }}
            />

            <select onChange={ (event) => {
                setColor( event.target.value )
            }}>
                <ColorOptions/>
            </select>
            <select onChange={ ( e ) => {
                setFont(e.target.value);
            }}>
                <FontOptions/>
            </select>
            <select onChange={(e) => {
                setFontSize(e.target.value);
            }}>
                <FontSizeOptions/>
            </select>

            <p style={styles}>{text}</p>
            <hr/>
        </>
    )
}