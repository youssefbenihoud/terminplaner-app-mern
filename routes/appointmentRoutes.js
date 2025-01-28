const express = require('express');
const router = express.Router()
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/authMiddleware');

// 🔒 Authentifizierung für alle Termin-Routen
router.use(authMiddleware.protect);

// Termin erstellen
router.post('/', async (req, res) => {
    try {
      // Setze creator automatisch aus eingeloggtem User
      req.body.creator = req.user.id;
      
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