const express = require('express');
const UserModel = require("../models/UserModel");
const CountryModel = require("../models/CountryModel");
const Address = require("../models/AddressModel");
const security = require("../utils/security");
// const { Router } = require("express");
const router = express.Router();
// import { useLocation } from 'react-router-dom';

router.get('/check-session', (req, res) => {
    // const isLoggedIn = req.session.isLoggedIn;
    // return res.json({ isLoggedIn: isLoggedIn })

    // if (req.session.isLoggedIn)
    //     return res.status(200).json({ isLoggedIn: req.session.isLoggedIn });
    // return res.status(200).json({ isLoggedIn: false });
    const isLoggedIn = req.session.isLoggedIn || false;
    return res.status(200).json({ isLoggedIn });

});

router.post('/login', async (req, res) =>
{
    try
    {
        const { username, password } = req.body;
        if ( ! username || ! password )
        {
            return res.status(400).json({
                success: false,
                message: 'Login details are missing'
            })
        }
        // return res.send('hola mola');
        const existingUser =
            await UserModel.findByUsername(username);
        // return res.send(existingUser);
        if ( ! existingUser )
        {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        if ( ! security.isValidPassword( password, existingUser.salt, existingUser.password  ) )
        {
            return res.status(400).json({
                success: false,
                message: 'Wrong login details'
            })
        }
        req.session.user = {
            username: existingUser.user_name,
            email: existingUser.email,
            id: existingUser.id
        }
        req.session.isLoggedIn = true;

        return res.json({
            success: true,
            message: 'Logged in successfully'
        });
        // return res.json({ user: existingUser });
    }
    catch ( error )
    {
        console.log(error);
        return res.json({
            success: false,
            error: error
        })
    }
})

router.get('/logout', async (req, res) => {
    const sessionID = req.sessionID;
    // console.log(sessionID)
    if ( req.session.isLoggedIn )
    {

        req.session.destroy((err) => {
            if (err) {
                // Handle error
                return res.status(500).json({
                    success: false,
                    message: 'User NOT logged out',
                    sessionId: sessionID
                });
            }
            // Clear the session cookie
            res.clearCookie(sessionID);
            // Send response indicating successful session destruction
            return res.status(200).json({
                success: true,
                message: 'User logged out',
                sessionId: sessionID
            });
        });

        /*
        * todo: req.session.destroy() destroys session, but session in browser stays
        * */
        // req.session.destroy();
        // return res.json({
        //     success: true,
        //     message: 'User logged out'
        // })
    }
    else
    {
        return res.json({
            success: false,
            message: 'User is logged out, login first.',
            sessionId: sessionID
        })
    }
})

// get all
router.get('/',  async (req, res) => {
    try
    {
        const results = await UserModel.findAllClass2();
        console.log(results)
        return res.json(results.map((userModelObj) => {
            console.log(userModelObj);
            return userModelObj.getInstance();
        }));
        // const result = await UserModel.findAll();
        // res.json(result);
    }
    catch ( error )
    {
        res.status(400).json({
            error: error,
            errorId: error.errno,
            errorMessage: error.message,
            message: 'Custom message',
        })
    }
})

// get by id
router.get('/:id',  async (req, res) => {
    try
    {
        // const result = await UserModel.findById(req.params.id);
        const result = await UserModel.findByIdClass(req.params.id);
        res.json(result);
    }
    catch ( error )
    {
        res.status(400).json({
            error: error,
            errorId: error.errno,
            errorMessage: error.message,
            message: 'Custom message',
        })
    }
})

// create
router.post('/',  async (req, res) => {
    try
    {
        const { username, password, email, dob, phone } = req.body;
        const result = await UserModel.createClass({ username, password, email, dob, phone });
        res.json(result);
    }
    catch ( error )
    {
        res.status(400).json({
            error: error,
            errorId: error.errno,
            errorMessage: error.message,
            message: 'Custom message',
        })
    }
})
// delete, id
router.delete('/:id',  async (req, res) => {
    try
    {
        // const result = await UserModel.delete(req.params.id);
        const result = await UserModel.deleteClass(req.params.id);
        res.json(result);
    }
    catch ( error )
    {
        res.status(400).json({
            error: error,
            errorId: error.errno,
            errorMessage: error.message,
            message: 'Custom message',
        })
    }
})
// update, id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // const result = await UserModel.update(id, req.body);
        const result = await UserModel.updateClass(id, req.body);
        res.json(result);
    }
    catch (error)
    {
        res.status(400).json({
            error: error,
            errorId: error.errno,
            errorMessage: error.message,
            message: 'Custom message',
        });
    }
});

router.post('/register', async (req, res) =>
{
    let createdAddressId;
    console.log('======== register started 100 ========');
    try
    {
        // await Address.deleteClass(97);
        // await Address.delete(97);
        console.log('======== register TRY started 200 ========');
        const { user_name, password, email, dob, phone, country, county, municipality, zipcode, city, street, houseNumber, apartmentNumber} = req.body;
        const newAddress =
            new Address ({
            country, county, municipality, zipcode, city, street, houseNumber, apartmentNumber
        });
        await newAddress.createClass();
        createdAddressId = newAddress.id;
        console.log('======== new address created 300 ========');
        console.log('======== new address created id 300 ========', createdAddressId);

        const salt = security.generateSalt();
        const hashedPassword = security.hashPassword(password, salt);
        // console.log(hashedPassword)

        const newUser = new UserModel({
            user_name, password: hashedPassword, email, dateOfBirth: dob, phone, addressId: newAddress.id, salt
        })
        await newUser.createClass();
        console.log('======== new user created 400 ========');
        // const userCreated = await newUser.createClass();
        // console.log(userCreated)

        req.session.user = {
            username: newUser.user_name,
            email: newUser.email,
            id: newUser.id,
            myCrazyData: 'yo'
        }
        req.session.isLoggedIn = true;

        createdAddressId = null;

        res.status(201).json({
            addressCreated: newAddress.getInstance(),
            userCreated: newUser.getInstance(),
            success: true
        })
    }
    catch ( error )
    {
        console.log('======== register CATCH started 500 ========');
        // Rollback address creation if an error occurred
        // if (newAddress && newAddress.id) {
        //     Address.deleteClass(newAddress.id);
        // }
        if ( createdAddressId )
        {
            await Address.delete(createdAddressId);
            createdAddressId = null;
        }
        // Address.deleteClass(createdAddressId);
        res.status(400).json({
            error: error,
            message: 'Registration message occurred',
            success: false
        })
    }
})




module.exports = router;