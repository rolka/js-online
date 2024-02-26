import { KoltButton } from "../elements/KolButton.jsx";
import { useState } from "react";
export const AddScooter = () =>
{
    const [ scooter, setScooter ] = useState({
        title: '',
        ride: '',
        registrationCode: '',
        hourlyPrice: ''
    });

    const [ errors, setErrors ] = useState([]);
    console.log(errors);
    const [ mileageError, setMileageError ] = useState('');

    const validateMileage = (e) => {
        // console.log(e.target.classList.add('bg-red-500'));
        if (isNaN(e.target.value) || e.target.value < 0) {
            setErrors([{
                errorField: 'mileage',
                message: 'Mileage input error'
            }]);
            e.target.classList.add('bg-red-500');
            setMileageError('Mileage input error');
            console.log('Mileage error set');
        }
        else {
            setErrors([]);
            setMileageError('');
            e.target.classList.remove('bg-red-500');
            setScooter( { ...scooter, ride: e.target.value } );
            console.log(errors);
        }
    }
    const handleScooterNameChange = (e) => {
        setScooter( { ...scooter, title: e.target.value } );
    }
    const handleScooterRegNoChange = (e) => {
        const newReg = e.target.value;
        /*
        * todo: problem- can't enter 5 chars
        * */
        if ( newReg.length > 5  )
        {
            e.target.classList.remove('bg-red-500');
            // alert('Must be 5 characters long');
        }
        else {
            e.target.classList.add('bg-red-500');
            setScooter( { ...scooter, registrationCode: e.target.value } );
        }
    }
    const handleScooterPriceChange = (e) => {
        if (isNaN(e.target.value) || e.target.value < 0) {
            setErrors([{
                errorField: 'price',
                message: 'Price input error'
            }]);
            e.target.classList.add('bg-red-500');
            setMileageError('Price input error');
            console.log('Price error set');
        }
        else {
            setErrors([]);
            setMileageError('');
            e.target.classList.remove('bg-red-500');
            setScooter( { ...scooter, hourlyPrice: e.target.value } )
            console.log(errors);
        }
    }
    const createScooter = () =>
    {
        if (/^[A-Za-z]{3}\d{2}$/.test(scooter.registrationCode)) {
            console.log('Create scooter');
        } else {
            alert('Errors occurred');
            console.log('Do not create scooter');
        }
    }

    return (
        <>
            <div className='flex flex-col items-center'>
                <div
                    className='flex flex-col gap-4 w-4/5 justify-center sm:flex-row sm:gap-4 sm:w-4/5 md:w-4/5 lg:w-4/5'>
                    <input type="text"
                           placeholder='Scooter model'
                           className='rounded px-2 py-1 outline-2 outline-sky-400 w-full sm:w-1/3'
                           value={scooter.title}
                           onChange={handleScooterNameChange}
                    />
                    <input type="number"
                           placeholder='Scooter mileage'
                           className='rounded px-2 py-1 outline-2 outline-sky-400 w-full sm:w-1/3'
                           // value={scooter.ride.toString()}
                           value={scooter.ride}
                           onChange={validateMileage}
                    />
                    {/*{mileageError && <span>{mileageError}</span>}*/}
                    <input type="text"
                           placeholder='Reg. No'
                           className='rounded px-2 py-1 outline-2 outline-sky-400 w-full sm:w-1/3'
                           value={scooter.registrationCode}
                           onChange={handleScooterRegNoChange}
                    />
                    <input type="number"
                           min={0}
                           placeholder='Price Eur/h'
                           className='rounded px-2 py-1 outline-2 outline-sky-400 w-full sm:w-1/3'
                           value={scooter.hourlyPrice}
                           onChange={handleScooterPriceChange}
                    />
                </div>
            </div>
            <div className='flex flex-col items-center mt-4'>
                <KoltButton buttonText='Add new scooter' onClick={() => {
                    createScooter();
                }}/>
                {/*<KoltButton onClick={455}/>*/}
            </div>
        </>
    )
}