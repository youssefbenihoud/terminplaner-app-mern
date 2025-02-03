const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['new_appointment', 'accepted', 'declined', 'block'],
    required: true 
  },
  read: { type: Boolean, default: false },
  link: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);