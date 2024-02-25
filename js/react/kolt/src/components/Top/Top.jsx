import { KoltButton } from "../elements/KolButton.jsx";

export const Top = () =>
{
    return (
        <>
            <div className="container mx-auto bg-indigo-400 min-h-[200px] py-5">
                <h1 className='text-2xl font-bold text-center mb-5'>Add new scooter</h1>
                <div className='flex justify-center items-center'>
                    <div className='flex gap-4 w-4/5 justify-center'>
                        <input type="text" placeholder='Scooter model'
                               className='rounded px-2 py-1 outline-2 outline-sky-400 w-1/3'/>
                        <input type="text" placeholder='Scooter mileage'
                               className='rounded px-2 py-1 outline-2 outline-sky-400 w-1/3'/>
                        <KoltButton/>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-4 mt-10'>
                    <KoltButton buttonText='Show available' bgColorClass='bg-green-500'/>
                    <KoltButton buttonText='Show occupied' bgColorClass='bg-red-500'/>
                </div>
            </div>
        </>
    )
}