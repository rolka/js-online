import React, { useEffect, useState } from 'react';

export const GettingData = () =>
{
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response =
                await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            const data = await response.json();
            setData(data);
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            {/* Render your data here */}
            <pre>{JSON.stringify(data, null,  2)}</pre>
        </div>
    );
}


