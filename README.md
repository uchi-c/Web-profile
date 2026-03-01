# Uchi Chinyama — Portfolio
**Shadow Root Security Technologies**

A production-ready multi-page portfolio with Node.js/Express backend.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run the server
```bash
npm start
```

Open **http://localhost:3000** in your browser.

> For development with auto-reload:
> ```bash
> npm install -g nodemon
> npm run dev
> ```

---

## 📁 Project Structure

```
uchi-portfolio/
├── server.js              # Express backend
├── package.json
└── public/
    ├── index.html         # Main portfolio page
    ├── projects.html      # Projects page (GitHub-linked)
    ├── style.css          # Shared styles
    ├── shared.js          # Shared JS (cursor, reveal, nav)
    └── images/
        └── uchi.jpeg      # Profile photo
```

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET`  | `/`   | Main portfolio page |
| `GET`  | `/projects` | Projects page |
| `POST` | `/api/contact` | Contact form submission |
| `GET`  | `/api/github-projects` | Proxied GitHub repos for uchi-c |

---

## ☁️ Deploy to Render / Railway / Fly.io

1. Push this folder to a GitHub repo
2. Connect to [Render.com](https://render.com) (free tier)
3. Set **Start Command**: `node server.js`
4. Set **Port**: `3000`

Done — live in under 2 minutes.

---

## 📧 Contact Form

The `/api/contact` route currently logs submissions to the console.
To forward emails, add your SMTP credentials and uncomment the `nodemailer` block in `server.js`.

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=uchichinyama@gmail.com
SMTP_PASS=your_app_password
```
