# Personal Expense Tracker 🚀

A modern, full-stack web application designed to help you strictly track your finances. Built with an incredibly premium **Glassmorphism UI** on the frontend and an enterprise-level **Model-View-Controller (MVC)** robust Python backend.

---

## 🎨 Features
- **Secure User Authentication**: Complete Register & Login flow with strongly encrypted local password hashing (`bcrypt`). Route protected UI.
- **Dynamic Glassmorphism UI**: Beautiful, layered gradients and blurred panes constructed natively with React & CSS. 
- **Full Expense CRUD functionality**: Easily Add, Edit, or Delete financial transactions cleanly tracked inside your own private namespace.
- **Data Dashboards & Charts**: Visualize your total balance, aggregated incomes, and spending summaries inside an elegant Recharts pie chart.
- **Auto-Generating SQLite Database**: No database environment configurations required; seamlessly builds an implicit local SQLite DB instance upon startup.

## 🛠️ Technology Stack
- **Frontend Layer:** React 18, Vite, Recharts, React Router
- **Backend Infrastructure:** Python 3.12+, FastAPI, SQLAlchemy, Uvicorn, bcrypt
- **Design Pattern:** Strict Backend MVC implementation

---

## 🚀 Getting Started (How to Run)

To run this project locally, you will need to open **two terminal windows**.

### Step 1: Start the Backend (API Server)
The backend acts as the brain handling routing and our SQLite Database. Open a terminal and run:

```bash
# 1. Navigate into the Backend folder
cd Backend

# 2. Install Python dependencies 
pip install -r requirements.txt

# 3. Start the FastAPI server locally on port 8000
uvicorn main:app --reload --port 8000
```
*Your backend is now actively running! You can view the live API Documentation (Swagger UI) at `http://localhost:8000/docs`.*

### Step 2: Start the Frontend (User Interface)
The frontend powers what you see in the browser. Open a **second separate terminal** and run:

```bash
# 1. Navigate into the Frontend folder
cd Frontend

# 2. Install all NodeJS packages dependencies
npm install

# 3. Spin up the development server
npm run dev
```

### Step 3: Use the app!
Go into your web browser and navigate directly to:
👉 **[http://localhost:5173/](http://localhost:5173/)**

1. Hit "Sign Up" to create a fresh secure account.
2. Sign in!
3. Add some financial transactions in the dashboard! Everything is dynamically recorded!

---

## 📁 Repository Structure

```
├── Backend/                 # Python FastAPI Application
│   ├── controllers/         # Business Logic (Hashing, DB manipulations)
│   ├── models/              # SQLAlchemy Database Schemes
│   ├── routes/              # Client-Facing Endpoint URLs
│   ├── schemas/             # Pydantic Typing Validation 
│   ├── database.py          # Session & Auto-SQL Logic
│   └── main.py              # Root Application & CORS
│
├── Frontend/                # Vite + React Interface
│   ├── src/                 
│   │   ├── components/      # Modular UI Parts (Modals, Charts, Navbar)
│   │   ├── pages/           # High Level Routes (Dashboard, Login, Register)
│   │   ├── App.jsx          # Route Mapping Config
│   │   ├── api.js           # Central Axios Backend Binding
│   │   └── index.css        # Premium Glassmorphism Design
│   └── package.json         # Node configs
│
└── Documentation/           # TDD, Requirements, ERD
```
