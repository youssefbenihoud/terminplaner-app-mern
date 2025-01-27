const express = require('express');
const Appointment = require('../models/Appointment');

// Termin erstellen
router.post('/', async(req, res) => {
    try{
        const appointment = await Appointment.create(req.body);
        res.status(201).json(appointment);
    } catch(error){
        res.status(400).json({ message: error.message});
    }
});

module.exports = router;