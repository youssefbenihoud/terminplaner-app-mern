const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    // List von User-IDs
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    // List von User-IDs
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema)