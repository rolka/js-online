export const FontOptions = () =>
{
    const items = [
        'Arial',
        'Calibri',
        'Cambria',
        'Consolas',
        'Georgia'
    ]
    return (
        <>
            {items.map((item, index) => (
                <option key={index} value={item.toLowerCase()}>{item}</option>
            ))}
        </>
    )
}