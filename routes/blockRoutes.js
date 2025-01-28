const express = require('express');
const router = express.Router();
const Block = require('../models/Block');
const authMiddleware = require('../middleware/authMiddleware');

// 🔒 Authentifizierung für alle Block-Routen
router.use(authMiddleware.protect);

// Zeitblock erstellen
router.post('/', async(req, res) => {
    try {
        // Setze user automatisch aus eingeloggtem User
        req.body.user = req.user.id;

        const blocker = await Block.create(req.body);
        
        // Finde und aktualisiere kollidierende Termine
        await Appointment.updateMany(
          {
            $or: [
              { creator: blocker.user },
              { participant: blocker.user }
            ],
            startTime: { $lt: blocker.endTime },
            endTime: { $gt: blocker.startTime }
          },
          { $set: { status: 'declined' } }
        );
    
        res.status(201).json(blocker);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });

module.exports = router;