const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Benachrichtigungen abrufen
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort('-createdAt')
      .limit(50);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Als gelesen markieren
router.patch('/:id/mark-read', async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});