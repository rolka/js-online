const mongoose = require('mongoose');
require('dotenv').config();
const config = () =>
{
    const generatedConnection = process.env.MONGO_CONNECTION
        .replace('__DB_USER', process.env.DB_USER )
        .replace('__DB_PASS', process.env.DB_PASSWORD )
        .replace('__DB_HOST', process.env.DB_HOST )
        .replace('__DB_NAME', process.env.DB_NAME );
    // console.log(generatedConnection);
    mongoose.connect(generatedConnection);
    const db = mongoose.connection;
    db.on( 'error', () =>
    {
        console.log('Server error!!!');
    })
    db.once( 'open', () =>
    {
        console.log('Connected to DB!!!');
    })
}

module.exports = { config };