import PropTypes from 'prop-types';
export const TodoRow = ( { todo, deleteTodo } ) => (
    <>
        <li className='border-gray-300 border-b-2'>{todo}
            <button type="button"
                    className="ml-3 text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={deleteTodo}
            >Remove task
            </button>
        </li>
    </>
)
TodoRow.propTypes = {
    todo: PropTypes.string,
    deleteTodo: PropTypes.func
}