// Sukurti komponentą su mygtuku ir įvedimo laukeliu.
// Įvedus į laukelį skaičių ir paspaudus mygtuką,
// atsiranda laukelyje nurodytas raudonų kvadratėlių skaičius.
// Įvedus kitą skaičių ir paspaudus mygtuką,
// prie jau egzistuojančių kvadratėlių papildomai prisideda naujas
// laukelyje nurodytas kvadratėlių kiekis.
// Kiekvieno kvadratėlio viduryje turi būti
// pavaizduotas rand skaičius 100 - 200.
import { CustomHeading } from "../CustomHeading/";
import { useEffect, useState } from "react";
// import { RandomNumberComponent } from "../../utils/RandomNumber.jsx";
import { getRandomNumber } from "../../utils/RandomNumber.jsx";
import classNames from "classnames";

const Square = ({id}) =>
{
    const cla = {
        width: '50px',
        height: '50px',
        background: 'salmon',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // flex: '0 0 calc(33.33% - 10px)',
        flex: '0 0 calc(10% - 10px)',
        margin: '5px',
        outline: '1px solid black',
        boxSizing: 'border-box'
    }
    return (
        // <div style={cla}>{id}</div>
        <div keys={id}>{id}</div>
    )
};
export const Task6 = () => {

    const [ data, setData ] = useState();
    const [ rand, setRand ] = useState();
    const [ random, setRandom ] = useState();
    // setRandom(getRandomNumber(1, 50));
    const callApi = async () =>
    {
        const promise = await fetch('data.json');
        const dataObj = await promise.json();
        setData(dataObj);
    }

    useEffect(() =>
    {
        setRandom( getRandomNumber(1, 50) );
        // callApi();
        // const randomNumber = RandomNumberComponent({ min: 1, max: 10 });
        // setRand(RandomNumberComponent({ min: 1, max: 20 }));
    }, []);
    // setRandom(getRandomNumber(1, 5));
    console.log( getRandomNumber(1, 5) );
    // console.log( random );
    const [ boxesArray, setBoxesArray ] = useState([
        // <Square id={getRandomNumber(1, 50)}/>
    ])
    const [ numberOfBoxes, setNumberOfBoxes ] = useState(0);
    const displayBox = ( box, index ) =>
    {
        const cla = {
            width: '50px',
            height: '50px',
            background: 'salmon',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // flex: '0 0 calc(33.33% - 10px)',
            flex: '0 0 calc(10% - 10px)',
            margin: '5px',
            outline: '1px solid black',
            boxSizing: 'border-box'
        }
        return (
            <div style={cla} key={index}>{box}</div>
        )
    }
    return (
        <>
            <div style={{ background: "beige", display: "flex", flexWrap: 'wrap' }}>
                { boxesArray.map( ( box, index ) => {
                    // return box
                    return displayBox(box, index);
                })}
            </div>
            <hr/>
            <CustomHeading color='salmon'>Task 6</CustomHeading>
            <input type="number"
                   value={numberOfBoxes}
                   onChange={ (e) => {
                       setNumberOfBoxes(e.target.value)
                   }}
                   min={0}
                   max={40}/>
            <button type="button" onClick={ () => {
                const newBoxes = [];
                for ( let i = 0; i < numberOfBoxes; i++ )
                {
                    newBoxes.push( <Square keys={i} id={getRandomNumber(1, 50)} /> );
                    setBoxesArray( [ ...boxesArray, ...newBoxes ] )
                    // console.log(newBoxes);
                }
                setNumberOfBoxes(0);
            } }>Do it</button>
            <hr/>
        </>
    )
}
