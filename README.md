# Rymden3.0
# Ersus – Fullstack CRUD-applikation

Detta är ett skolprojekt i kursen **Testverktyg**, där vi bygger en webbapplikation med fokus på databashantering, formulärflöden och testbar serverlogik.

## 🧱 Teknikstack

- **Node.js + Express** – server
- **EJS** – templatemotor för views
- **MySQL** – databas (via mysql2)
- **HTML + CSS** – formulär och frontend
- **Git** – versionshantering

## 🔁 Funktioner

- ✅ Skapa användare
- ✅ Lista alla användare
- ✅ Visa profilsida
- ✅ Redigera användare
- ✅ Ta bort användare
- ✅ Validering av ålder i formulär

## 🧪 Testbar kodstruktur

All datalogik är separerad i:
- `database.js` – hanterar SQL-frågor
- `logic.js` – innehåller funktioner som kan testas separat

## 🚀 Så här kör du projektet

1. Klona repot:
   ```bash
   git clone https://github.com/craeng1337/Rymden3.0.git
   cd Rymden3.0

2. ```bash
   npm install

3. ```sql
   CREATE DATABASE ersus_db;

USE ersus_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(250),
  nickname VARCHAR(250),
  age INT,
  bio TEXT
);

4. ```bash
   node server.js


Gå till:
http://localhost:3000


Projektmedlemmar:

Susanna Wiland
Erik Molander


