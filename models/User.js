const mongoose = require('mongoose')
// Ändere das Schema:
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Neu
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
  });
  
  // Passwort-Hashing vor dem Speichern
  userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });
  
  // Passwort-Vergleichsmethode
  userSchema.methods.correctPassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };