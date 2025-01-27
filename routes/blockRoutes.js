const express = require('express');
const router = express.Router();
const Block = require('../models/Block');

// Zeitblock erstellen
router.post('/', async(req, res) => {
    try{
        const blocker = await Block.create(req.body);
        res.status(201).json(blocker);
    } catch ( error){
        res.status(400).json({
            message: error.message
        });
    }
})

module.exports = router;