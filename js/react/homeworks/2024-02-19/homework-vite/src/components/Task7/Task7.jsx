// Sukurti komponentą su dviem įvedimo laukeliais,
// katinuko vardui ir svoriui įvesti.
// Rodyti visų įvestų katinukų sąrašą. Puslapiui persikrovus,
// katinukų sąrašas turi išlikti nepakitęs.
// Katinukus sąraše rūšiuoti nuo storiausio iki ploniausio.
// Skaičiuoti ir atvaizduoti bendrą katinukų svorį.

import { CustomHeading } from "../CustomHeading/index.jsx";
import { useEffect, useState } from "react";

const getCatsFromLocalStorage = () =>
{
    const cats = localStorage.getItem('reactiveCats') || '[]';
    return JSON.parse(cats);
}

const getTheCats = () => {
    return 'asdasd';
}

// export const Task7 = ({ catNameArray, setCatNameArray }) =>
export const Task7 = () =>
{
    useEffect(() =>
    {
        // console.log(getTheCats());
    }, []);

    const [ catsLocalStorage, setCatsLocalStorage ] = useState(getCatsFromLocalStorage);
    const [ catName, setCatName ] = useState('');
    const [ catWeight, setCatWeight ] = useState('');
    const [ catNameArray, setCatNameArray ] = useState([]);
    const [ catsArray, setCatsArray ] = useState([
        { catName: 'Ro Cat', catWeight: 20 },
        { catName: 'Mo Doggo', catWeight: 50 },
    ])
    console.log(catsLocalStorage);

    useEffect(() => {
        // console.log(catsArray);
    }, [catNameArray]);
    // console.log(catNameArray);
    return (
        <>
            <CustomHeading color='salmon'>Task 7</CustomHeading>
            <hr className='my-5'/>
            <input type="text"
                   className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                   value={catName}
                   placeholder='Name'
                   onChange={(e) =>
                   {
                       setCatName(e.target.value);
                   }}
            />
            <input type="text"
                   value={catWeight}
                   className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                   min={0}
                   max={30}
                   placeholder='Weight(kg)'
                   onChange={(e) => ( setCatWeight(e.target.value) )}
            />
            <button type="button"
                    className='bg-indigo-500'
                    onClick={(e) =>
            {
                setCatNameArray([...catNameArray, catName]);
                const newCatsArray = [
                    ...catsArray,
                    {
                        catName: catName,
                        catWeight: catWeight
                    }
                ]
                setCatsArray( newCatsArray );
                // setCatsArray([...catsArray, { catName: catName, catWeight: catWeight }]);
                // setCatsArray( [catsArray, { catsArray.catName: catName } ] );

                // this does not work, as state has to reload the component
                // localStorage.setItem( 'reactiveCats', JSON.stringify(catsArray) );
                localStorage.setItem( 'reactiveCats', JSON.stringify(newCatsArray) );
                setCatName('');
                setCatWeight('');
            }}>Save
            </button>

            <h1 className='text-4xl my-10'>Cats list</h1>
            <ul style={{ listStyle: "none" }}>
                {catsArray.map((cat) => (
                        <li>
                            <p>Cat: <em>{cat.catName}</em>, weight- <em>{cat.catWeight}kg</em></p>
                        </li>
                    )
                )}
            </ul>

            <h1 className='text-4xl my-10'>LocalStorage cats list</h1>
            <div className="grid grid-cols-4 gap-4">
                { catsLocalStorage.map( ( cat ) => {
                    return (
                        <div>
                            <p>Cat: <em>{cat.catName}</em>, weight- <em>{cat.catWeight}kg</em></p>
                        </div>
                    )
                })}
            </div>

            {/*<ul>*/}
            {/*{catNameArray.map(( cat, index ) => (*/}
            {/*        <li key={index}>*/}
            {/*            {cat}*/}
            {/*        </li>*/}
            {/*    )) }*/}
            {/*</ul>*/}

        </>
    )
}