const express = require('express');
const router = express.Router();
const userRouter = require('./routes/UserRouter')
const pcRouter = require('./routes/PcRouter')
const countryRouter = require('./routes/CountryRoute')

router.use('/user', userRouter); // -
router.use('/pc', pcRouter); // -
router.use('/country', countryRouter);



module.exports = router;