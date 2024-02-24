export const FontSizeOptions = () =>
{
    const items = [
        '10',
        '12',
        '14',
        '16',
        '18',
        '20',
        '22'
    ]
    return (
        <>
            {items.map((item, index) => (
                <option key={index} value={item}>{item}px</option>
            ))}
        </>
    )
}