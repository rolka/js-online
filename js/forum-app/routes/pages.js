const express = require('express');

const router = express.Router();

router.get( '/', ( req, res) =>
{
    res.render('index', {
        pageTitle: 'Forum Login',
        username: 'RoZa',
        list: ['pro1', 'pro2', 'pro999']
    })
})

router.get( '/register', ( req, res) =>
{
    res.render('register', {
        pageTitle: 'Forum Register'
    })
})

module.exports = router;











