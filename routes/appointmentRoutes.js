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

// Akzeptiere Termin
router.put('/:id/accept', async (req, res) => {
    try {
      const appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { status: 'accepted' },
        { new: true }
      ).populate('creator participant');
      
      res.json(appointment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Lehne Termin ab
  router.put('/:id/decline', async (req, res) => {
    try {
      const appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { status: 'declined', reason: req.body.reason },
        { new: true }
      ).populate('creator participant');
      
      res.json(appointment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;