# Personal Expense Tracker 🚀

A modern, full-stack web application designed to help you strictly track your finances. Built with an incredibly premium **Glassmorphism UI** on the frontend and an enterprise-level **Model-View-Controller (MVC)** robust Python backend.

---

## 🔗 Live Links
- **Frontend (Netlify):** [https://your-netlify-app-url.netlify.app](https://your-netlify-app-url.netlify.app)
- **Backend API (Render):** [https://web-development-project-shzj.onrender.com](https://web-development-project-shzj.onrender.com)
- **API Documentation:** [https://web-development-project-shzj.onrender.com/docs](https://web-development-project-shzj.onrender.com/docs)

---

## 🎨 Features
- **Secure User Authentication**: Complete Register & Login flow with strongly encrypted local password hashing (`bcrypt`). Route protected UI.
- **Dynamic Glassmorphism UI**: Beautiful, layered gradients and blurred panes constructed natively with React & CSS. 
- **Full Expense CRUD functionality**: Easily Add, Edit, or Delete financial transactions cleanly tracked inside your own private namespace.
- **Data Dashboards & Charts**: Visualize your total balance, aggregated incomes, and spending summaries inside an elegant Recharts pie chart.
- **Auto-Generating SQLite Database**: No database environment configurations required; seamlessly builds an implicit local SQLite DB instance upon startup.

## 🛠️ Technology Stack
- **Frontend Layer:** React 18, Vite, Recharts, React Router
- **Backend Infrastructure:** Python 3.10+, FastAPI, SQLAlchemy, Gunicorn
- **Deployment:** Render (Backend), Netlify (Frontend)
- **Design Pattern:** Strict Backend MVC implementation

---

## 🚀 Deployment Config
The project is configured for automated deployment:
- **Backend:** Uses a `render.yaml` blueprint for one-click deployment on Render.
- **Frontend:** Connected to GitHub for automated builds on Netlify.
- **CORS:** Configured to allow secure cross-origin requests between the Render API and Netlify UI.

---

## 🚀 Getting Started (Local Development)

### Step 1: Start the Backend (API Server)
```bash
cd Backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Step 2: Start the Frontend (User Interface)
```bash
cd Frontend
npm install
npm run dev
```

---

## 📁 Repository Structure

```
├── Backend/                 # Python FastAPI Application
│   ├── controllers/         # Business Logic
│   ├── models/              # SQLAlchemy Database Schemes
│   ├── routes/              # Client-Facing Endpoint URLs
│   ├── schemas/             # Pydantic Typing Validation 
│   ├── database.py          # Session & Auto-SQL Logic
│   └── main.py              # Root Application & CORS
│
├── Frontend/                # Vite + React Interface
│   ├── src/                 
│   │   ├── components/      # Modular UI Parts
│   │   ├── pages/           # High Level Routes
│   │   ├── api.js           # Central Axios Backend Binding
│   │   └── index.css        # Premium Glassmorphism Design
│
├── render.yaml              # Render Deployment Blueprint
├── netlify.toml             # Netlify Deployment Config
└── Documentation/           # TDD, Requirements, ERD
```

---
Developed by **Nujat11** 💻
