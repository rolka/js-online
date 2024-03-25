const express = require('express');
const PcModel = require("../models/PcModel");
const router = express.Router();
const upload = require('../utils/multerConfig');

router.get('/', async (req, res) =>
{
    const allPcs = await PcModel.findAll();
    res.json({
        success: true,
        // allPcs: allPcs.map((pc) => {
        //     return pc.getInstance()
        // }),
        all: allPcs.map( pc => pc.getInstance() )
    })
})

router.post('/', upload.single('files', 2), async ( req, res) =>
{
    // console.log(req.body);
    try
    {
        const { pcName, cpu, gpu, pcType, ramSpeed, ramType, ramAmount } = req.body;
        const newPc = new PcModel({
            owner_id: req.session.user.id,
            pcName,
            cpu,
            gpu,
            ramType,
            ramSpeed,
            ramAmount,
            pcType
        })
        await newPc.createPc();
        res.json( {
            success: true,
            message: 'PC created',
            newPc: newPc.getInstance(),
        });
    }
    catch ( error )
    {
        console.error(error);
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})
/*
* todo: api routes are not protected
* */
router.get('/my-pcs',  async (req, res) =>
{
    try
    {
        // return res.json(req.session.user.id);
        // console.log(req.session.user.id);
        const userId = req.session.user.id;
        const pcs = await PcModel.findByOwner(userId);
        res.json({
            success: true,
            rows: pcs.map( pc => pc.getInstance() )
        })
    }
    catch ( error )
    {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

router.get('/:id', async (req, res) =>
{
    try
    {
        const pcIdParam = req.params.id;
        const pc = await PcModel.findById(pcIdParam);
        if ( ! pc )
        {
            return res.status(404).json({
                success: false,
                message: 'PC not found'
            })
        }
        return res.json({
            success: true,
            pcFound: pc.getInstance(),
            message: 'PC found'
        })
    }
    catch ( error )
    {
        console.error(error);
        return res.status(400).json({
            success: false,
            pcFound: [],
            error: error.message
        })
    }
})



module.exports = router;