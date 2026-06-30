from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Personal Expense Tracker API",
    description="Backend API for managing personal expenses, budgets, and transactions.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Personal Expense Tracker API. Visit /docs for the API documentation."}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
