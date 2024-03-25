import { Link } from "react-router-dom";

export const SinglePc = ({ pc }) =>
{
    /*
    * todo: show PC data
    * */
    return (
        <div
            className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`pc/${pc.id}`}>
                <img className="rounded-t-lg w-full"
                     src='https://www.slashgear.com/img/gallery/how-to-safely-clean-the-inside-of-your-computer/l-intro-1648822276.jpg'
                     alt=''/>
                <div className="p-5">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        PC name: <b>{pc.pcName}</b>
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        PC type: <b>{pc.pcType}</b>
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        CPU: <b>{pc.cpu}</b>
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        GPU: <b>{pc.gpu}</b></p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-all">
                        RAM type: <b>{pc.ramType}</b>
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        RAM speed: <b>{pc.ramSpeed}</b>
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        RAM amount: <b>{pc.ramAmount}GB</b>
                    </p>
                </div>
            </Link>
        </div>
    )
}