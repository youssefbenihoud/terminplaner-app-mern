const express = require('express');
const Appointment = require('../models/Appointment');

// Termin erstellen
router.post('/', async (req, res) => {
    try {
      const newAppointment = new Appointment(req.body);
      
      if (await newAppointment.hasTimeConflict()) {
        newAppointment.status = 'declined';
      }
  
      const savedAppointment = await newAppointment.save();
      res.status(201).json(savedAppointment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;