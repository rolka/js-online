import { useState } from "react";
import { MdOutlineTaskAlt } from "react-icons/md";
// import { MdAdd } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
import { TodoRow } from "./TodoRow.jsx";
// <MdDelete />
export const TodoList = () =>
{
    const [ todos, setTodos ] = useState([]);
    const [ newTodo, setNewTodo ] = useState('');

    const createTask = () => {

    }
    // const deleteTodo = ( index ) =>
    // {
    //     const updatedTodos = [...todos];
    //     updatedTodos.splice( index, 1 );
    //     setTodos(updatedTodos);
    // }
    const deleteTodo = (todoToDelete) =>
    {
        setTodos(todos.filter((todo) => todo !== todoToDelete));
    };

    return (
        <div className='box w-full'>
            <h1 className='mb-5 text-5xl uppercase font-bold text-black'>Todos</h1>
            <div>
                <form>
                    <label htmlFor="search"
                           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Add todo</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <MdOutlineTaskAlt className='text-black'/>
                        </div>
                        <input type="search"
                               value={newTodo}
                               onChange={(e) =>
                               {
                                   setNewTodo(e.target.value)
                               }}
                               className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Add new task" required/>

                        <button type="button"
                                className="text-white absolute end-2.5 bottom-2.5 bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() =>
                                {
                                    if ( newTodo.trim() !== '' )
                                    {
                                        setTodos([...todos, newTodo]);
                                        setNewTodo('');
                                    }
                                }}
                        >
                            <svg className="w-5 h-5 dark:text-white inline-block text-white relative top-[-2px]"
                                 aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M10 3v4c0 .6-.4 1-1 1H5m4 6 2 2 4-4m4-8v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1Z"/>
                            </svg>
                            Add todo
                        </button>
                    </div>
                </form>
            </div>

            <ol className="text-left mt-5 bg-white p-5 max-w-md space-y-1 text-black list-decimal list-inside dark:text-gray-500 mx-auto">
                {todos.map((todo, index) =>
                {
                    return (
                        <div key={index}>
                            <TodoRow todo={todo}
                                     deleteTodo={() => deleteTodo(todo)}
                            />
                        </div>
                    )
                })}
            </ol>
        </div>
    )
}