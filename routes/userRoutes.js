const express = require('express')
const router = express.Router()
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Benutzer erstellen
router.post('/', async(req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// 🔒 Alle folgenden Routen benötigen Authentifizierung
router.use(authMiddleware.protect);

// Benutzer folgen
router.post('/:userId/follow/:targetId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const target = await User.findById(req.params.targetId);

        user.following.push(target._id);
        target.followers.push(user._id);

        await user.save();
        await target.save();

        res.json({message: 'Successfully followed'});
    } catch (error){
        res.status(500).json({message: error.message});
    }

});

// Such-Endpoint für Benutzer
router.get('/search', async (req, res) => {
    try {
      const { query } = req.query;
      const users = await User.find({
        username: { $regex: query, $options: 'i' }
      }).limit(5);
      
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;