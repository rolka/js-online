export const SinglePc = () =>
{
    return (
        <div
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg w-full"
                     src=''
                     alt=''/>
            </a>
            <div className="p-5">
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Name:
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Gender: </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-all">
                    Email:
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Phone:
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Country:
                </p>
            </div>
        </div>
    )
}