import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

const Status = ( {status} ) =>
{
    return (
        <div className='w-[20px] h-[20px] rounded-full mx-auto'
             style={{ background: status ? "limegreen" : "orangered" }}></div>
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
                <div>{new Date(scooter.lastUseTime).toLocaleDateString("lt")}</div>
            </div>
            <div>
                <h3 className="font-bold text-center">Status</h3>
                <div>
                    <Status status={scooter.isBusy}/>{" "}
                    {scooter.isBusy ? "Available" : "Not Available"}
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
export const Middle = () =>
{
    const [scooters, setScooters] = useState([]);
    useEffect(() =>
    {
        fetch('/scooters.json')
            .then((resp) => resp.json())
            .then((data) =>
            {
                setScooters(data);
                console.log(data);
            })
    }, []);

    return (
        <div className="container mx-auto bg-slate-100 min-h-[400px] flex flex-col gap-4 p-4 text-black">
            {scooters.map((scooter) => (
                <Scooter key={scooter.id} scooter={scooter}/>
            ))}
        </div>
    )
}