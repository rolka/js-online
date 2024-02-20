// export const Task3 = ( props ) =>
import { useEffect } from "react";

export const Task3 = ( {title, color, colorSetting} ) =>
{
    // Sukurti komponentą rodantį tekstą h1 tage- “Zebrai ir Bebrai”,
    // kuris gauna vieną props, kuris lygus 1 arba 2.
    // Jeigu props lygus 1 tekstas nudažomas mėlynai,
    // o jeigu 2 - raudonai, bet koks kitas skaičius nudažomas juodai.
    // adjustments to the original task have bee implemented
    const check = () => {
        if ( colorSetting === 1 )
        {
            return color = 'red';
        }
        else
        {
            return color = 'blue';
        }
    }
    useEffect(() =>
    {
        // check()
        // console.log('effect loaded. color: ' + colorSetting);
        if ( colorSetting === 1 )
        {
            color = 'red';
        }
        else
        {
            color = 'blue';
        }
        // console.log(`If finished. Color setting: ${colorSetting}. Color: ${color}`);
    }, []);
    return (
        <>
            {/*<h1>{props.title}</h1>*/}
            {/*<h1 style={{color: color}}>{title}</h1>*/}
            <h1 style={{color: check()}}>{title}</h1>
            <p>{colorSetting}</p>
            <hr/>
        </>
    )
}