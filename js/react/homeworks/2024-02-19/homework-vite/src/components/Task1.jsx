// export const Task1 = (props) =>
export const Task1 = ( { attribute22 = 'defo' } ) =>
{
    console.clear();
    const logShit = () => {
        // console.log(props);
        // console.log(props.children);
    }
    return (
        <>
            {/*{console.log(props)}*/}
            {/*{alert('asd')}*/}
            <h1 style={{color: 'salmon'}}>Task 1</h1>
            {/*<p>Some data: {props.property1}</p>*/}
            <p>Some data: {attribute22}</p>
            {/*<p>Some data: {props.attribute9}</p>*/}
            {/*<p>{logShit()}</p>*/}
        </>

    )
}