const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    startTime: {type: Date, required: true},
    endTime: {type:Date, required: true},
    status: {type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending'}
}, {timestamps: true})

module.exports = mongoose.model('Appointment', appointmentSchema);