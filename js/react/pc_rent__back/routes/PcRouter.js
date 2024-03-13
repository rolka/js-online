const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'pc router works just fine' })
})

module.exports = router;