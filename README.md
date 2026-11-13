# MOHOMAD XMD — Full-Stack Cyber Portfolio & Bot Platform

Premium Black, Gold, and Silver responsive web application built with **HTML5, CSS3, JavaScript, Node.js, and Express.js**, engineered for **GitHub** and **Railway** deployment (including Android phone setup).

## Included Project Structure

```text
MOHOMAD-XMD-Website/
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
├── README.md
├── .env.example
├── .gitignore
├── railway.json
├── Procfile
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── site.webmanifest
│   └── assets/images/
└── assets/
    ├── logo.svg
    └── images/
```

---

## Local Setup

```bash
npm install
cp .env.example .env
npm start
```

Open `http://localhost:3000` in your browser.

---

## GitHub Upload සහ Railway Deploy කිරීමේ පියවර (Sinhala Guide)

### 1. Android Phone එකෙන් GitHub වෙත Upload කරන ආකාරය
1. Download කළ `MOHOMAD-XMD-Website.zip` file එක **ZArchiver** හෝ Phone File Manager එකෙන් Extract කරන්න.
2. Phone Browser එකෙන් [github.com](https://github.com) වෙත ගොස් **New Repository** (`+` -> `New repository`) සාදන්න (උදා: `mohomad-xmd-web`).
3. **uploading an existing file** link එක click කර, Extract කළ folder එකේ ඇති `index.html`, `style.css`, `script.js`, `server.js`, `package.json`, `README.md`, `railway.json`, `Procfile`, `.env.example`, `public/`, සහ `assets/` සියල්ල Select කර **Commit changes** click කරන්න.
   - *(Termux භාවිතා කරන්නේ නම් `git init`, `git add .`, `git commit -m "Initial MOHOMAD XMD"`, `git push` මගින්ද Upload කළ හැක.)*

### 2. Railway එකේ Deploy කරන ආකාරය
1. [railway.app](https://railway.app) වෙත ගොස් GitHub account එකෙන් Login වන්න.
2. **New Project** -> **Deploy from GitHub repo** තෝරා ඔබේ `mohomad-xmd-web` repository එක Select කරන්න.
3. Railway විසින් `package.json` සහ `railway.json` ස්වයංක්‍රීයව හඳුනාගෙන `npm install` සහ `npm start` (`node server.js`) run කරයි.
4. **Variables** tab එකට ගොස් අවශ්‍ය Environment Variables එක් කරන්න:
   - `NODE_ENV=production`
   - `OWNER_WHATSAPP=94700000000` (ඔබේ WhatsApp අංකය)
   - `OWNER_TELEGRAM=mohomadxmd` (ඔබේ Telegram username)
   - `CONTACT_EMAIL=contact@mohomadxmd.dev`
5. **Settings -> Networking -> Generate Domain** click කළ විට ඔබේ Live Website URL එක ලැබේ!
