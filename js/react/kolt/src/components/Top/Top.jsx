import { KoltButton } from "../elements/KolButton.jsx";
import { AddScooter } from "../AddScooter/AddScooter.jsx";
export const Top = ({ notifyScooterAddition }) =>
{
    return (
        <>
            <div className="container mx-auto bg-indigo-400 min-h-[200px] py-5">
                <h1 className='text-2xl font-bold text-center mb-5'>Add new scooter</h1>
                <AddScooter notifyScooterAddition={notifyScooterAddition}/>

            </div>
        </>
    )
}