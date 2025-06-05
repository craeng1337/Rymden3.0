
# Ersus – Web-app

Ersus är en enkel Node.js-applikation byggd med Express och EJS. Den låter dig skapa, visa, redigera och ta bort användare via ett webbgränssnitt.

# Funktioner

- Lista alla användare
- Visa detaljer om en användare
- Skapa ny användare
- Uppdatera befintlig användare
- Radera användare
- Integrationstester med Jest och Supertest, e2e-tester med PlayWright

# Kom igång

# 1. Öppna mappen i tex VScode

# 2. Installera node moduler

```bash
npm install
```

# 3. Starta applikationen

```bash
node server.js
```

Applikationen körs nu på:  
[http://localhost:3000](http://localhost:3000)

---

# Användning

- Öppna localhost:3000 för att se alla användare.
- Använd länken “Create user” för att lägga till en ny.
- Klicka på “View users” för att se detaljer om en användare.
- Klicka på “Edit user” för att uppdatera information.
- Klicka på “Delete user” för att ta bort användaren.

---

# Testning

Applikationen är testad med **Jest**, **Supertest** och **Playwright**

# 1. Kör alla tester:

```bash
npm run test  (integrationstester med Jest)
npm run test:e2e   (end to end tester med Playwright)
```

Testerna hittar du i mappen `__tests__/` och täcker:

- GET /
- GET /user?id=...
- POST /create
- POST /edit
- POST /delete

---


Have fun
