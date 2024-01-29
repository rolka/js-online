const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
router.post( '/register',  async ( req, res) =>
{
    const {username, email} = req.body;

    if ( ! username || ! email )
    {
        return res.status(400).json({ message: 'Some details are missing' })
    }

    const newUser = new UserModel({
        username,
        email
    })
    await newUser.save();
    res.json({ message: newUser });
})

router.get( '/users',  async (req, res) =>
{
    const users = await UserModel.find();
    // const users = await UserModel.find({ '_id': '65b2e0685f770d74016b78d4' });
    return  res.json({ user: users });
})

module.exports = router;











