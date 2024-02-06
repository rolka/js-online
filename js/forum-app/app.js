console.clear();

const express = require('express');
const app = express();
// const multer = require('multer');

// DB config
require('./config/db-connect').config();
require('./config/express-middleware').config(app);
// require('./config/multer');


app.listen( 3003, () =>
{
  console.log('Server running on http://localhost:3003');
})