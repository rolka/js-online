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
    try
    {
        const { user_name, password, email, dob, phone, country, county, municipality, zipcode, city, street, houseNumber, apartmentNumber} = req.body;
        const newAddress =
            new Address ({
            country, county, municipality, zipcode, city, street, houseNumber, apartmentNumber
        });
        await newAddress.createClass();

        const salt = security.generateSalt();
        const hashedPassword = security.hashPassword(password, salt);
        // console.log(hashedPassword)

        const newUser = new UserModel({
            user_name, password: hashedPassword, email, dateOfBirth: dob, phone, addressId: newAddress.id, salt
        })
        await newUser.createClass();
        // const userCreated = await newUser.createClass();

        // console.log(userCreated)

        req.session.user = {
            username: newUser.user_name,
            email: newUser.email,
            id: newUser.id,
            myCrazyData: 'yo'
        }
        req.session.isLoggedIn = true;

        res.status(201).json({
            addressCreated: newAddress.getInstance(),
            userCreated: newUser.getInstance()
        })
    }
    catch ( error )
    {
        res.status(400).json({
            error: error
        })
    }
})



module.exports = router;