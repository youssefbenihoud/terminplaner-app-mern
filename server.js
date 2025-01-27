// Importieren die notwendigen Module
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

// Routen einbinden
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const blockRoutes = require('./routes/blockRoutes');


// die Express-App initialisieren
const app = express()

// Middleware: damit das Frontend später kommunzieren kann
app.use(cors())
//Sicherstellen, dass Express JSON-Daten verarbeiten kann
app.use(express.json())

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
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
})

