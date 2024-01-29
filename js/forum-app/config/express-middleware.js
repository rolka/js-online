const express = require('express');
const pageRouter = require('../routes/pages');
const userRouter = require('../routes/user-router');
const config = (app) =>
{
    app.set( 'view engine', 'ejs' );
    const publicRouter = express.Router();
    publicRouter.use(express.static('public'));
    app.use(express.json());
    app.use('/public', publicRouter);

    // app.use( '/public', pageRouter);
    app.use( '/pages', pageRouter);
    // app.use(pageRouter);
    app.use( '/api/user', userRouter);
    // app.use(userRouter);
}

module.exports = { config };