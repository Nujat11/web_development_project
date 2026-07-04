from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import user_routes, expense_routes

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Personal Expense Tracker API",
    description="Backend API for managing personal expenses, budgets, and transactions.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_routes.router)
app.include_router(expense_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Personal Expense Tracker API. Visit /docs for the API documentation."}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
