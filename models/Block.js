const mongoose = require('mongoose')

const blockSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    startTime: {type: Date, required: true},
    endTime: {type:Date, required: true},
    reason: String
}, {timestamps: true});

module.exports = mongoose.model('Block', blockSchema);