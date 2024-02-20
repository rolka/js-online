import { Task1 } from "./Task1.jsx";

const componentData = {
    title: 'Component 12 title',
    description: 'Component desc',
    imageUrl: 'https://example.com/sample-image.jpg',

    attribute1: 'txt',
    attribute2: 44,
    attribute3: true,
    attribute4: new Date(),
    attribute5: () => console.log('log from anonymous fun'),
    attribute6: [ 1, 2, 3 ],
    attribute7: { name: 'Ro', surname: 'Za' },
    attribute8:
        class Person{
            constructor (name, surname)
            {
                this.name = name;
                this.surname = surname;
            }
        },
    // attribute9: { Task1 }
};
export default componentData;