const express = require('express');
const router = express.Router()
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/authMiddleware');

// 🔒 Authentifizierung für alle Termin-Routen
router.use(authMiddleware.protect);

// Termin erstellen
router.post('/', async (req, res) => {
    try {

      // 1. Validierung der Zeiten
    const start = new Date(req.body.startTime);
    const end = new Date(req.body.endTime);
    
    if (start >= end) {
      return res.status(400).json({ 
        message: "Endzeit muss nach Startzeit liegen" 
      });
    }

    if (start < Date.now()) {
      return res.status(400).json({ 
        message: "Termine können nicht in der Vergangenheit liegen" 
      });
    }

    // 2. Maximaldauer (8 Stunden)
    const duration = end - start;
    if (duration > 8 * 60 * 60 * 1000) {
      return res.status(400).json({
        message: "Maximale Termindauer: 8 Stunden"
      });
    }



      // Setze creator automatisch aus eingeloggtem User
      req.body.creator = req.user.id;
      
      const newAppointment = new Appointment(req.body);
      
      if (await newAppointment.hasTimeConflict()) {
        newAppointment.status = 'declined';
      }
  
      const savedAppointment = await newAppointment.save();
      // Nach dem Speichern des Termins:
      const io = req.app.get('io');
      io.to(appointment.participant._id.toString()).emit('notification', {
        type: 'new_appointment',
        message: `Neue Terminanfrage von ${req.user.username}`,
        link: `/appointments/${appointment._id}`
      });
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