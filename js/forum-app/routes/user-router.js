const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const upload = require('../config/multer').upload;
const security = require('../utils/security');

router.post( '/register', upload.single('img'), async ( req, res) =>
{
    const {username, password, birthDate, email} = req.body;
    // const fileName = req.file.originalname;
    // const fileName = req.file.name;
    const fileName = require('../config/multer').lastFileName;
    console.log(req.body);
    console.log(fileName);
    // res.json({message: req.body});

    // todo: uncomment and replace another if statement
    // const requiredFields = ['username', 'email', 'password', 'birthDate'];
    // const missingDetails = requiredFields.filter(field => !req.body[field]);
    // if (missingDetails.length > 0) {
    //     return res.status(400)
    //         .json({ message: `Missing details: ${missingDetails.join(', ')}` });
    // }

    // return;
    //
    // const {username, email} = req.body;
    //
    if ( ! username || ! email || ! password || ! birthDate )
    {
        return res.status(400).json({ message: 'Some details are missing' })
    }

    const salt = security.generateSalt();
    const hashedPass = security.hashPassword( password, salt );

    const newUser = new UserModel({
        username,
        email,
        password: hashedPass,
        salt,
        DOB: birthDate,
        profilePic: `http://localhost:3003/public/images/${fileName}`
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











