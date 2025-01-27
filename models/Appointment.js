const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    startTime: {type: Date, required: true},
    endTime: {type:Date, required: true},
    status: {type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending'}
}, {timestamps: true});

appointmentSchema.methods.hasTimeConflict = async function() {
    const creatorBlocks = await Block.find({ 
      user: this.creator,
      $or: [
        { startTime: { $lt: this.endTime }, endTime: { $gt: this.startTime } }
      ]
    });
  
    const participantBlocks = await Block.find({ 
      user: this.participant,
      $or: [
        { startTime: { $lt: this.endTime }, endTime: { $gt: this.startTime } }
      ]
    });
  
    return creatorBlocks.length > 0 || participantBlocks.length > 0;
  };

module.exports = mongoose.model('Appointment', appointmentSchema);