export const ColorOptions = () =>
{
    const items = [
        'Black',
        'Salmon',
        'Tomato',
        'Pink',
        'White'
    ]
    return (
        <>
            {items.map((item, index) => (
                <option key={index} value={item.toLowerCase()}>{item}</option>
            ))}
        </>
    )
}