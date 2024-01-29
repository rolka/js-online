console.clear();

const express = require('express');
const app = express();

// DB config
require('./config/db-connect').config();

require('./config/express-middleware').config(app);


app.listen( 3003, () =>
{
    console.log('Server running on http://localhost:3003');
})



















