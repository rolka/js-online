import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const Status = ( {status} ) =>
{
    return (
        <div className='w-[20px] h-[20px] rounded-full mx-auto'
             style={{ background: status ? 'orangered' : 'limegreen' }}></div>
    )
}

const Scooter = ( {scooter} ) => {
    return (
        <div className='bg-white rounded p-4 flex flex-wrap justify-between gap-x-1 gap-y-8'>
            <div>
                <h3 className="font-bold">{scooter.title}</h3>
                <h3>Mileage: {scooter.ride} km</h3>
            </div>
            <div>
                <h3 className="font-bold">Reg. No</h3>
                <div>{scooter.registrationCode}</div>
            </div>
            <div>
                <h3 className="font-bold">Price Eur/h</h3>
                <div>{scooter.hourlyPrice}€</div>
            </div>
            <div>
                <h3 className="font-bold">Last used on</h3>
                <div>
                    { scooter.lastUseTime === 1
                    ? 'First use'
                    : new Date(scooter.lastUseTime).toLocaleDateString("lt")
                    }
                </div>
            </div>
            <div>
                <h3 className="font-bold text-center">Status</h3>
                <div>
                    <Status status={scooter.isBusy}/>{" "}
                    {scooter.isBusy ? 'Not Available' : 'Available'}
                </div>
            </div>
            <div className="flex gap-4 text-xl h-full items-center">
                <FaPencil className="text-blue-700 hover:text-blue-900 cursor-pointer"/>
                <FaTrashAlt className="text-red-700 hover:text-red-900 cursor-pointer"/>
            </div>
            <div></div>
        </div>
    )
}
const getScooters = () =>
{
    console.log( JSON.parse(localStorage.getItem( 'scooters'  )) ); // null
    const data = JSON.parse(localStorage.getItem( 'scooters'  )) || []; // if null-set to empty array
    if ( data.length === 0 )
    {
        localStorage.setItem( 'scooters', '[]');
    }
    return data;
}

export const Middle = ({ newScooter }) =>
{
    // const [scooters, setScooters] = useState([]);
    const [scooters, setScooters] = useState(getScooters);

    useEffect( () => {
        console.log('Component loaded or Scooter updated')
        if ( newScooter )
        {
            // console.log('New scooter added');
            // console.log(newScooter);
            // console.log(scooters);

            const highestId = scooters.reduce((highest, current) =>
            {
                return (highest === undefined || current.id > highest) ? current.id : highest;
            }, 0);
            console.log( `Highest  ${ typeof highestId}` );
            console.log( `Highest  ${highestId + 1}` );

            const newId = +localStorage.getItem('currentId');
            if ( ! newId )
            {
                localStorage.setItem('currentId', '1');
            }
            const newScooterAddition = {
                ...newScooter,
                id: newId || 1,
                lastUseTime: 1,
                isBusy: false
            };
            setScooters([  ...scooters, newScooterAddition  ]);
            // const nextId = newId + 1 === 1 ? 2 : newId + 1;
            // localStorage.setItem( 'currentId', nextId );
            localStorage.setItem( 'currentId', highestId + 2 );
            console.log(newScooterAddition);
        }
    }, [newScooter]);

    useEffect(() =>
    {
        localStorage.setItem( 'scooters', JSON.stringify(scooters) );
    }, [scooters]);

    useEffect(() =>
    {
        // fetch('/scooters.json')
        //     .then((resp) => resp.json())
        //     .then((data) =>
        //     {
        //         setScooters(data);
                // console.log(data);
            // })
    }, []);

    return (
        <div className="container mx-auto bg-slate-100 min-h-[400px] flex flex-col gap-4 p-4 text-black">
            {scooters.map((scooter) => (
                <Scooter key={scooter.id} scooter={scooter}/>
            ))}
        </div>
    )
}

Scooter.propTypes = {
    scooter: PropTypes.object
}
Status.propTypes = {
    status: PropTypes.bool
}
Middle.propTypes = {
    newScooter: PropTypes.object
}

