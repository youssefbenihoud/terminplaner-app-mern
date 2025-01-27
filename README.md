# 🗓️ Terminplaner - Freundschaftliche Terminkoordination

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Eine Webanwendung zur einfachen Terminplanung zwischen Freunden und Followern mit automatischer Blockierungslogik ⚡

## ✨ Hauptfeatures
- 👥 Benutzerverwaltung mit Follow-System
- 📅 Terminerstellung mit Statusverfolgung (pending/accepted/declined)
- ⏰ Zeitblocker-Funktion für automatisches Ablehnen kollidierender Termine
- 🔄 Echtzeit-Updates bei Änderungen
- 🔒 Einfache API-Schnittstelle für zukünftige Erweiterungen

## 🚀 Schnellstart

### Voraussetzungen
- Node.js ≥ 16.x
- MongoDB ≥ 5.x
- npm ≥ 8.x

### 🛠️ Installation Backend

1. Repository klonen
```bash
git clone https://github.com/dein-benutzername/terminplaner-app.git
cd terminplaner-app
```

2. Abhängigkeiten installieren
```bash
npm install
```

3. Umgebungsvariablen setzen
```bash
cp .env.example .env
```

4. MongoDB starten (lokale Instanz)
```bash
sudo systemctl start mongod  # Für Linux
```

5. Server starten
```bash
node server.js
```

### 🌐 API-Endpunkte (Beispiele)

| Methode | Endpoint                      | Beschreibung               |
|---------|-------------------------------|---------------------------|
| POST    | `/api/users`                  | Neuen Benutzer erstellen   |
| POST    | `/api/users/:userId/follow/:targetId` | Benutzer folgen |
| POST    | `/api/appointments`           | Termin erstellen           |
| POST    | `/api/blocks`                 | Zeitblock erstellen        |

**Beispiel Request:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "username": "maxmustermann"
}' http://localhost:5000/api/users
```

## 📚 Tech Stack
- **M**ongoDB 🍃 - Dokumentenbasierte Datenbank
- **E**xpress.js 🚆 - Web-Framework
- **R**eact.js ⚛️ - Frontend (Coming Soon)
- **N**ode.js 🟩 - Serverumgebung

## 🤝 Mitwirken
Contributions sind willkommen! Bitte:
1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Commite deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Pushe den Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📝 Roadmap
- [x] Backend-Grundgerüst
- [x] Basis-API-Endpunkte
- [ ] Authentifizierung mit JWT 🔑
- [ ] Frontend-Integration (React)
- [ ] Echtzeit-Benachrichtigungen 🔔

## 📄 Lizenz
Distributed under the MIT License. See `LICENSE` für mehr Informationen.

---

**Hinweis:** Das Frontend wird aktuell entwickelt und folgt in Kürze! 👨💻