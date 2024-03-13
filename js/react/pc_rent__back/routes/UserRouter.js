const express = require('express');
const UserModel = require("../models/UserModel");
const CountryModel = require("../models/CountryModel");
const router = express.Router();

// get all
router.get('/',  async (req, res) => {
    try
    {
        const results = await UserModel.findAllClass2();
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
        const [ username, password, email, dob, phone, country, county,
            municipality, zipcode, city, street, houseNumber, apartmentNumber ] = req.body;
        // const newAddress =
    }
    
    catch ( e )
    {
        
    }


    const postData = req.body;
    res.json({
        data: postData
    })
})

module.exports = router;