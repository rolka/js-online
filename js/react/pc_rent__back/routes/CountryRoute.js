const express = require('express');
const CountryModel = require("../models/CountryModel");
const router = express.Router();

// router.get('/', (req, res) => {
//     res.json({ message: 'country router works just fine' })
// })

router.get('/',  async (req, res) => {
    try
    {
        // veikia
        const resultW = await CountryModel.findAll();
        // neveikia
        // const results = await CountryModel.findAll();
        // console.log(results);
        // const result = results.map((value) => {
        //     value.getInstance()
        // })
        // console.log(result);
        res.json(resultW);
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

router.get('/:id',  async (req, res) => {
    try
    {
        const result = await CountryModel.findById(req.params.id);
        console.log(result);
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

router.post('/',  async (req, res) => {
    try
    {
        const { country, countryShort } = req.body;
        const newCountry = new CountryModel({ country, countryShort });
        console.log(newCountry.getInstance());
        await newCountry.save();
        // console.log(country, countryShort);
        // const newCountry = new Country( { country, countryShort } )
        // await newCountry.save();
        res.send(newCountry.getInstance());
        // res.json({ message: 'country router works just fine' })
    }
    catch ( error )
    {
        /*
        * todo: make errors file to show custom errors for each error code
        * */
        res.status(400).json({
            error: error,
            errorId: error.errno,
            errorMessage: error.message,
            message: 'Custom message',
        })
    }
})

router.delete('/:id',  async (req, res) => {
    try
    {
        CountryModel.findById(req.params.id);
        // const { country, countryShort } = req.body;
        const newCountry = new CountryModel({ country, countryShort });
        console.log(newCountry.getInstance());
        await newCountry.save();
        // console.log(country, countryShort);
        // const newCountry = new Country( { country, countryShort } )
        // await newCountry.save();
        res.send(newCountry.getInstance());
        // res.json({ message: 'country router works just fine' })
    }
    catch ( error )
    {
        /*
         * todo: make errors file to show custom errors for each error code
         * */
        res.status(400).json({
            error: error,
            errorId: error.errno,
            errorMessage: error.message,
            message: 'Custom message',
        })
    }
})


module.exports = router;