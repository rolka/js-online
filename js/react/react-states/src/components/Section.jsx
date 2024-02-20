import { useState } from "react";

const Section = () =>
{
    const [countOfClicks, setClicks] = useState(0);
    const handleClick = () =>
    {
        setClicks(countOfClicks + 1);
    }

    return (
        <section>
            <p>Count of clicks: {countOfClicks}</p>
            <button onClick={handleClick}>CLick</button>
        </section>
    )
}
export default Section;