import componentData from "./componentData.js";
const { title,
    description,
    imageUrl,
    attribute2,
    attribute7,
    attribute5,
} = componentData;
export const Task12 = () =>
{
    return (
        <>
            {/*{attribute5()}*/}
        <h1>{title}</h1>
            <p>{description}</p>
            <p>{attribute2}</p>
            <p>{attribute7.name}</p>

            <hr/>
        </>
    )
}