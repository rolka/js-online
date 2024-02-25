import { useEffect, useState } from "react";
import { GetBooksFromApi } from "./GetBooksFromApi.jsx";
import { Link } from "react-router-dom";
import { FormWithUseState } from "../FormWithUseState/FormWithUseState.jsx";

export const Books = () => {

  const onScroll = () =>
  {
    console.log('scrolled')
  }

  useEffect(() =>
  {
    addEventListener('scroll', onScroll);
    /*
    * when component is removed, event should be also removed
    * */
    return () => {
      document.removeEventListener('scroll', onScroll);
    }

  }, []);

  const [data, setData] = useState(null);

  useEffect(() => {
    GetBooksFromApi().then( (data) => {
      console.log(data);
      setData(data);
    });
  }, []); // Empty dependency array ensures this effect runs once on mount

  if (!data) {
    // return <div>Loading...</div>;
    return (
        <div className="flex items-center justify-center h-screen w-screen">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
        </div>
    );
  }

  return (
      <>
        <FormWithUseState/>
        <Link to='about-us'
              className='
              bg-indigo-500
              text-white
              px-4 py-3
              inline-block
              hover:text-amber-100
              hover:bg-indigo-600
              rounded
              '>To About us</Link>
        <div className="grid grid-cols-3 gap-4">
          {data.map((book) =>
          {
            return (
                <div className='border-2 border-white' key={book.id}>
                  <img src={book.img} className='w-full' alt=""/>
                  <h1 className='text-3xl p-4'>{book.title}</h1>
                  <h2 className='text-2xl px-4'>{book.author}</h2>
                  <h2 className='text-2xl px-4'>Price: {book.price}Eur</h2>
                  <h2 className='text-2xl px-4'>Released: {new Date(book.time * 1000).toLocaleDateString('lt')}</h2>

                </div>
            )
          })}
          {/*<pre>{JSON.stringify(data, null,  2)}</pre>*/}
        </div>
      </>

  );
};
