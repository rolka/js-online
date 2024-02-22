// const getRandomNumber = (min, max) =>
export const getRandomNumber = (min, max) =>
{
    if (typeof min !== 'number' || typeof max !== 'number' || min >= max) {
        console.error('Invalid input. Please provide valid min and max numbers.');
        return null;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// export const RandomNumberComponent = ({ min, max }) =>
const RandomNumberComponent = ({ min, max }) =>
{
    return  getRandomNumber(min, max);
};
