// Importieren die notwendigen Module
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config()

// Routen einbinden
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const blockRoutes = require('./routes/blockRoutes');
const authRoutes = require('./routes/authRoutes');
const errorController = require('./controllers/errorController');


// die Express-App initialisieren
const app = express()

// Middleware: damit das Frontend später kommunzieren kann
app.use(cors())
//Sicherstellen, dass Express JSON-Daten verarbeiten kann
app.use(express.json())
// Auth-Routen
app.use('/api/auth', authRoutes);
// Error-Handling-Middleware (am Ende aller Middlewares)
app.use(errorController);

//MongoDB-Verbindung
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Mit MongoDB verbunden'))
.catch(err => console.error('Fehler bei MongoDB-Verbindung:', err))

// Routes verwenden
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/blocks', blockRoutes);

// Grundlegende Route zum Testen
app.get('/', (req, res) => {
    res.send('Terminplaner Backend funktioniert!')
})



const PORT = process.env.PORT || 5001;
//app.listen(PORT, () => {
//    console.log(`Server läuft auf Port ${PORT}`);
//})
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000" // Frontend-URL
  }
});

httpServer.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

// Socket.io-Logik
io.on('connection', (socket) => {
  console.log('Client verbunden:', socket.id);
  
  socket.on('subscribe', (userId) => {
    socket.join(userId); // Raum für Benutzer-ID erstellen
  });
});

// Mach io in Routen verfügbar
app.set('io', io);

